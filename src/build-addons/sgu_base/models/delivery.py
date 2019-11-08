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

    @api.depends('line_ids')
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
    order_line_id = fields.Many2one('sgu.order.line', 'Order line')
    state = fields.Selection([
        ('delivery', 'Delivery'), 
        ('come_back', 'Come Back'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="delivery")
    complete_date = fields.Datetime(string='Complete Date')


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
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
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
        self.write({'state': 'delivery'})
        self.order_line_id.write({'state': 'delivery'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }

    @api.multi
    def change_cancel(self):
        self.write({'state': 'order'})
        self.order_line_id.write({'state': 'cancel'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.multi
    def unlink(self):
        for rec in self:
            rec.order_line_id.write({'state': 'order'})
        return super(DeliveryOrder, self).unlink()