# -*- coding: utf-8 -*-

from odoo import models, fields, api, tools, _
from odoo.exceptions import ValidationError
from odoo.modules.module import get_module_resource
import base64, random
from datetime import datetime, date

class Order(models.Model):
    _name = 'sgu.order'
    _description = "Order"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'name'


    name = fields.Char('Name')
    token = fields.Char('Token')
    customer = fields.Many2one('res.users', 'Customer', domain=lambda self: self.get_domain())
    address = fields.Char('Customer Address')
    phone = fields.Char('Customer Phone')
    total = fields.Integer('Total', compute="_compute_total")
    line_ids = fields.One2many('sgu.order.line', 'order_id', 'Order line')
    process = fields.Integer('Process', compute='_compute_process')

    delivery_ids = fields.One2many('sgu.delivery', 'order_id', 'Delivery')
    count_delivery = fields.Integer('Count Delivery', compute="_compute_count_delivery")

    saleperson = fields.Many2one('res.users', 'SalePerson', domain=lambda self: self.get_domain_saleperson())
    payment_method = fields.Selection([('cod', 'Cash of Delivery'), ('transfer', 'Transfer')], 
        default='cod', string='Payment Method')

    lock = fields.Boolean('Lock', default=False)
    state = fields.Selection([
        ('order', 'Order'), 
        ('delivery', 'Delivery'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="order")

    def get_domain(self):
        group_customer = self.env.ref('sgu_base.group_customer')
        return [('id', 'in', group_customer.users.ids)]

    def get_domain_saleperson(self):
        group_employee = self.env.ref('sgu_base.group_employee')
        return [('id', 'in', group_employee.users.ids)]

    def view_delivery(self):
        self.ensure_one()
        return {
            'name': 'See delivery',
            'view_type': 'form',
            'view_mode': 'tree,form',
            'res_model': 'sgu.delivery',
            'view_id': False,
            'domain': [('order_id', '=', self.id)],
            'type': 'ir.actions.act_window',
        }

    @api.multi
    def check_validation(self):
        for rec in self:
            for line in rec.line_ids:
                if line.product_id.exists() and line.qty > 0:
                    if line.product_id.on_hand < line.qty:
                        raise ValidationError(_('Product `%s` not enough!' % line.product_id.name))
                    else:
                        rec.write({'state': 'delivery'})
                else:
                    raise ValidationError(_('Product and Quantity not null!'))


    def open_create_delivery(self):
        self.ensure_one()
        return {
            'target': 'new',
            'type': 'ir.actions.act_window',
            'res_model': 'sgu.delivery',
            'name': _('Create  Delivery'),
            'view_type': 'form',
            'view_mode': 'form',
            'views': [[False,'form']],
            'context': {
                'hidden_order_id': True,
                'hidden_button_footer': False,
                "default_order_id": self.id,

            },
        }

    def _default_token(self):
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        return ''.join(random.SystemRandom().choice(chars) for _ in range(6))
        
    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.order') or _('New')
        vals['token'] = self._default_token()
        return super(Order, self).create(vals)

    @api.multi
    def unlink(self):
        for rec in self:
            rec.line_ids.unlink()
            rec.delivery_ids.unlink()
        return super(Order, self).unlink()

    @api.depends('line_ids')
    def _compute_process(self):
        for res in self:
            if res.line_ids.exists():
                count_done = len(res.line_ids.filtered(lambda o: o.state == 'done'))
                res.process = (count_done / len(res.line_ids))*100


    @api.depends('line_ids')
    def _compute_total(self):
        for res in self:
            if res.line_ids.exists():
                res.total = sum(res.line_ids.filtered(lambda o: o.state != 'cancel').mapped('sub_total'))
            

    @api.depends('delivery_ids')
    @api.multi
    def _compute_count_delivery(self):
        for rec in self:
            if rec.delivery_ids.exists():
                rec.count_delivery = len(rec.delivery_ids)


    @api.constrains('line_ids')
    @api.multi
    def _check_product_qty(self):
        for rec in self:
            for line in rec.line_ids:
                if line.product_id.exists() and line.qty > 0:
                    if line.product_id.on_hand < line.qty:
                        raise ValidationError(_('Quantity not enough!'))
                else:
                    raise ValidationError(_('Product and Quantity not null!'))
    
    @api.multi
    def change_reorder(self):
        for rec in self:
            rec.delivery_ids.unlink()
            rec.line_ids.filtered(lambda o: o.state != 'order').write({'state': 'order'})
            rec.write({'state': 'order'})

    @api.multi
    def change_cancel(self):
        for rec in self:
            rec.line_ids.change_cancel()
            rec.write({'state': 'cancel', 'lock': True})

    @api.multi
    def change_done(self):
        for item in self:
            if item.process != 100:
                raise ValidationError("Can't Done!")
            self.write({'lock': True,'state': 'done'})

    @api.multi
    def change_lock(self):
        self.write({'lock': True})

    @api.multi
    def change_unlock(self):
        self.write({'lock': False})



class OrderLine(models.Model):
    _name = 'sgu.order.line'
    _description = "Order"
    _rec_name = 'name'


    

    name = fields.Char('Name')
    order_id = fields.Many2one('sgu.order')
    description = fields.Char('Description')
    product_id = fields.Many2one('sgu.product', 'Product', required=True)
    price = fields.Integer('Price', default=lambda self: self.product_id.price)
    qty = fields.Integer('Quantity')
    sub_total = fields.Integer('Sub Total', compute="_compute_subtotal")
    state = fields.Selection([
        ('order', 'Order'), 
        ('delivery', 'Delivery'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="order")
    note = fields.Text('Note')
    

    @api.onchange('product_id')
    def default_price(self):
        if self.product_id:
            self.price = self.product_id.price

    @api.depends('price', 'qty')
    @api.multi
    def _compute_subtotal(self):
        for rec in self:
            rec.sub_total = rec.price * rec.qty

    @api.multi
    def change_reorder(self):
        if self.order_id.lock:
            raise ValidationError(_('Order is lock!'))
        for item in self:
            order = item.order_id
            delivery_order = order.delivery_ids.mapped('line_ids').filtered(lambda o: o.order_line_id.id == item.id)
            if delivery_order.exists():
                delivery_order.unlink()
            else:
                item.write({'state': 'order'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.multi
    def change_cancel(self):
        if self.order_id.lock:
            raise ValidationError(_('Order is lock!'))
        for item in self:
            order = item.order_id
            delivery_order = order.delivery_ids.mapped('line_ids').filtered(lambda o: o.order_line_id.id == item.id)
            if delivery_order.exists():
                delivery_order.change_cancel()
            else:
                item.write({'state': 'cancel'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.order_line') or _('New')
        return super(OrderLine, self).create(vals)
