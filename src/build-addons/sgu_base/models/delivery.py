# -*- coding: utf-8 -*-

from odoo import models, fields, api, tools, _
from odoo.exceptions import ValidationError
from odoo.modules.module import get_module_resource
import base64, random
from datetime import datetime, date



class Delivery(models.Model):
    _name = 'sgu.delivery'
    _description = "Delivery"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'name'


    name = fields.Char('Name')
    shipper_id = fields.Many2one('res.users', 'Shipper', domain=lambda self: self.get_domain())
    process = fields.Integer('Process', compute='_compute_process')
    order_id = fields.Many2one('sgu.order', 'Order', unique=True)
    line_ids = fields.One2many('sgu.delivery.order', 'delivery_id', 'Delivery line')

    plan_complete = fields.Datetime('Plan Complete')
    date_complate = fields.Datetime('Date Complete')

    lock = fields.Boolean('Lock', default=False)
    validation = fields.Boolean('Validation', default=False)
    collection = fields.Boolean('Collection', compute="_compute_collection")
    paid = fields.Boolean('Paid', compute='_compute_paid')

    @api.depends('order_id')
    @api.multi
    def _compute_collection(self):
        for rec in self:
            if rec.order_id.exists():
                if rec.order_id.payment_method == 'cod':
                    rec.collection = True
                else:
                    rec.collection = False

    @api.multi
    def change_lock(self):
        for item in self:
            if item.process == 100:
                item.write({'lock': True})
            else:
                raise ValidationError(_("Can't Done!"))

    @api.multi
    def change_unlock(self):
        for item in self:
            if item.lock: 
                item.write({'lock': False})
            else:
                raise ValidationError(_("Can't Unlock!"))

    def get_domain(self):
        group_shipper = self.env.ref('sgu_base.group_shipper')
        return [('id', 'in', group_shipper.users.ids)]


    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.delivery') or _('New')
        return super(Delivery, self).create(vals)

    @api.multi
    def unlink(self):
        for rec in self:
            rec.line_ids.unlink()
        return super(Delivery, self).unlink()

    def create_delivery(self):
        self.ensure_one()
        for line in self.line_ids:
            order_line.write({'state', 'delivery'})

    @api.depends('process')
    @api.multi
    def _compute_paid(self):
        for rec in self:
            if rec.process == 100:
                rec.paid = True
            else:
                rec.paid = False


    @api.depends('line_ids')
    @api.multi
    def _compute_process(self):
        for res in self:
            if res.line_ids.exists():
                count_done = len(res.line_ids.filtered(lambda o: o.state == 'done'))
                res.process = (count_done / len(res.line_ids))*100

    def apply_delivery(self):
        self.ensure_one()
        for rec in self:
            rec.line_ids.mapped('order_line_id').write({'state': 'delivery'})
        return
    
class DeliveryOrder(models.Model):
    _name = 'sgu.delivery.order'

    delivery_id  = fields.Many2one('sgu.delivery', 'Delivery')
    product_id = fields.Many2one('sgu.product', related='order_line_id.product_id', readonly=True)
    qty = fields.Integer('Quantity', related='order_line_id.qty', readonly=True)
    order_line_id = fields.Many2one('sgu.order.line', 'Order line')
    state = fields.Selection([
        ('delivery', 'Delivery'), 
        ('come_back', 'Come Back'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="delivery")
    complete_date = fields.Datetime(string='Complete Date')
    comeback_date = fields.Datetime(string='Comeback Date')

    _sql_constraints = [
        ('unique_order_line_id', 'unique (order_line_id)', 'Order line is unique!')
    ]

    @api.multi
    def write(self, vals):
        res = super(DeliveryOrder, self).write(vals)
        if vals.get('state'):
            for item in self:
                if vals.get('state') == 'done':
                    item.complete_date = datetime.now() 
                    item.order_line_id.write({
                        'state' : 'done'
                    })
                if vals.get('state') == 'cancel':
                    item.order_line_id.write({
                        'state' : 'cancel',
                        'note': 'Delivery cancel:  %s' % (datetime.now().strftime('%d/%m/%Y '))
                    })
    
    @api.multi
    def change_done(self):
        self.write({'state': 'done'})
        self.order_line_id.write({'state': 'done'})
        body = "<h3>Done Product</h3><ul>"
        body += "<li><b>Product</b>: %s</li>" % (self.product_id.name)
        body += "<li><b>Date</b>: %s</li>" % (datetime.now().strftime('%d/%m/%Y, %H:%M:%S'))
        body += "</ul>"

        self.env['mail.message'].create({
                'subject': 'Done Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.delivery',
                'res_id': self.delivery_id.id,
                'body': body,
            })
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }
        
    def open_comeback_wizard(self):
        self.ensure_one()
        return {
            'name': _('Comeback'),
            'type': 'ir.actions.act_window',
            'res_model': 'comeback.product.wizard',
            'views': [[self.env.ref('sgu_base.comeback_product_wizard').id, "form"]],
            'target': 'new',
            'context': {
                'default_delivery_item': self.id,
            }
        }


    @api.multi
    def change_comeback(self):
        self.write({'state': 'come_back'})
        self.order_line_id.write({'state': 'delivery'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }

    @api.multi
    def change_redelivery(self):
        self.write({
            'state': 'delivery',
            'complete_date': False,
        })
        self.order_line_id.write({'state': 'delivery'})
        body = "<h3>Redelivery Product</h3><ul>"
        body += "<li><b>Product</b>: %s</li>" % (self.product_id.name)
        body += "<li><b>Date</b>: %s</li>" % (datetime.now().strftime('%d/%m/%Y, %H:%M:%S'))
        body += "</ul>"

        self.env['mail.message'].create({
                'subject': 'Redelivery Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.delivery',
                'res_id': self.delivery_id.id,
                'body': body,
            })
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }

    @api.multi
    def change_cancel(self):
        self.write({'state': 'cancel'})
        self.order_line_id.write({
            'state': 'cancel',
            'complete_date': False,
        })
        body = "<h3>Cancel Product</h3><ul>"
        body += "<li><b>Product</b>: %s</li>" % (self.product_id.name)
        body += "<li><b>Date</b>: %s</li>" % (datetime.now().strftime('%d/%m/%Y, %H:%M:%S'))
        body += "</ul>"

        self.env['mail.message'].create({
                'subject': 'Cancel Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.delivery',
                'res_id': self.delivery_id.id,
                'body': body,
            })
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.multi
    def unlink(self):
        for rec in self:
            rec.order_line_id.write({'state': 'order'})
        return super(DeliveryOrder, self).unlink()