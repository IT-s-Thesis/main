# -*- coding: utf-8 -*-

from odoo import models, fields, api, tools, _
from odoo.exceptions import ValidationError
from odoo.modules.module import get_module_resource
import base64, random
from datetime import datetime, date

class Product(models.Model):
    _name = 'sgu.product'
    _description = "Product"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'name'

    @api.model
    def _default_image(self):
        image_path = get_module_resource('sgu_base', 'static/src/img', 'default_image.png')
        return tools.image_resize_image_big(base64.b64encode(open(image_path, 'rb').read()))

    name = fields.Char('Name')
    price = fields.Integer('Price')
    image = fields.Binary("Image", attachment=True, default=_default_image)
    image_medium = fields.Binary("Medium-sized photo", attachment=True)
    image_small = fields.Binary("Small-sized photo", attachment=True)
    qty = fields.Integer('Qty')
    on_hand = fields.Integer('On Hand', compute="_compute_qty_order", store=True)
    order_line_ids = fields.One2many('sgu.order.line', 'product_id', 'Order line')
    qty_order = fields.Integer('Qty Order', compute="_compute_qty_order")
    delivery_line_ids = fields.One2many('sgu.delivery.order', 'product_id', 'Delivery order')
    qty_delivery = fields.Integer('Qty Delivery', compute="_compute_qty_delivery")
    type = fields.Selection([('service', 'Service'), ('store', 'Store')], 'Type Product')
    color = fields.Char('Color')
    ram = fields.Char('Ram')
    memory = fields.Char('Memory')
    origin = fields.Char('Origin')
    vendor = fields.Char('Vendor')

    def open_reciept_product(self):
        self.ensure_one()
        return {

        }

    @api.model
    def create(self, vals):
        tools.image_resize_images(vals, big_name='hinhanh', medium_name='image_medium', small_name='image_small')
        return super(Product, self).create(vals)

    @api.multi
    def write(self, vals):
        tools.image_resize_images(vals, big_name='hinhanh')
        return super(Product, self).write(vals)


    @api.depends('order_line_ids')
    @api.multi
    def _compute_qty_order(self):
        for rec in self:
            if rec.order_line_ids.exists():
                order_line = rec.order_line_ids.filtered(lambda o: o.state != 'cancel')
                rec.qty_order = len(order_line)
                rec.onhand = rec.qty - len(order_line)

    @api.depends('delivery_line_ids')
    @api.multi
    def _compute_qty_delivery(self):
        for rec in self:
            if rec.delivery_line_ids.exists():
                rec.qty_delivery = len(rec.delivery_line_ids.filtered(lambda o: o.state != 'cancel'))


class Order(models.Model):
    _name = 'sgu.order'
    _description = "Order"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'name'


    name = fields.Char('Name')
    customer = fields.Many2one('res.users', 'Customer', domain=lambda self: self.get_domain())
    address = fields.Char('Customer Address')
    phone = fields.Char('Customer Phone')
    total = fields.Integer('Total', compute="_compute_total")
    line_ids = fields.One2many('sgu.order.line', 'order_id', 'Order line')
    process = fields.Integer('Process', compute='_compute_process')
    validation = fields.Boolean('Validation', default=False)

    delivery_line_ids = fields.One2many('sgu.delivery', 'order_id', 'Delivery')
    count_delivery = fields.Integer('Count Delivery', compute="_compute_count_delivery")


    def get_domain(self):
        group_shipper = self.env.ref('sgu_base.group_customer')
        return [('id', 'in', group_shipper.users.ids)]


    def view_delivery(self):
        self.ensure_one()
        return {
            'name': 'See delivery',
            'view_type': 'form',
            'view_mode': 'tree',
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
                        rec.validation = True
                else:
                    raise ValidationError(_('Product and Quantity not null!'))


    def open_create_delivery(self):
        self.ensure_one()
        return {
            'name': 'Create  Delivery',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'sgu.delivery',
            'view_id': False,
            'context': {'default_order_id': self.id},
            'type': 'ir.actions.act_window',
        }

    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.order') or _('New')
        return super(Order, self).create(vals)

    @api.depends('line_ids')
    def _compute_process(self):
        for res in self:
            if res.line_ids.exists():
                count_done = len(res.line_ids.filtered(lambda o: o.state == 'done'))
                res.process = (count_done / len(res.line_ids))/100


    @api.depends('line_ids')
    def _compute_total(self):
        for res in self:
            if res.line_ids.exists():
                res.total = sum(res.line_ids.mapped('sub_total'))
            

    @api.depends('delivery_line_ids')
    @api.multi
    def _compute_count_delivery(self):
        for rec in self:
            if rec.delivery_line_ids.exists():
                rec.qty_delivery = len(rec.delivery_line_ids)


class OrderLine(models.Model):
    _name = 'sgu.order.line'

    order_id = fields.Many2one('sgu.order')
    description = fields.Char('Description')
    product_id = fields.Many2one('sgu.product', 'Product')
    price = fields.Integer('Price', related="product_id.price", reonly=True)
    qty = fields.Integer('Quantity')
    sub_total = fields.Integer('Sub Total', compute="_compute_subtotal")
    state = fields.Selection([
        ('cancel', 'Cancel'), 
        ('order', 'Order'), 
        ('delivery', 'Delivery'), 
        ('done', 'Done')
        ], 'State')
    note = fields.Text('Note')

    @api.depends('price', 'qty')
    @api.multi
    def _compute_subtotal(self):
        for rec in self:
            rec.sub_total = rec.price * rec.qty

    @api.constrains('product_id', 'qty')
    @api.multi
    def _check_product_qty(self):
        for rec in self:
            print(rec.product_id.exists())
            print(rec.qty)
            if rec.product_id.exists() and rec.qty > 0:
                if rec.product_id.on_hand < rec.qty:
                    raise ValidationError(_('Quantity not enough!'))
            else:
                raise ValidationError(_('Product and Quantity not null!'))



class Delivery(models.Model):
    _name = 'sgu.delivery'
    _description = "Delivery"
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'name'


    name = fields.Char('Name')
    shipper_id = fields.Many2one('res.users', 'Shipper', domain=lambda self: self.get_domain())
    process = fields.Integer('Process', compute='_compute_process')
    order_id = fields.Many2one('sgu.order', 'Order')
    line_ids = fields.One2many('sgu.delivery.order', 'delivery_id', 'Delivery line')

    plan_complete = fields.Datetime('Plan Complete')
    date_complate = fields.Datetime('Date Complete')

    def get_domain(self):
        group_shipper = self.env.ref('sgu_base.group_shipper')
        return [('id', 'in', group_shipper.users.ids)]


    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.delivery') or _('New')
        return super(Delivery, self).create(vals)

    def create_delivery(self):
        self.ensure_one()
        for line in self.line_ids:
            order_line.write({'state', 'delivery'})

    @api.depends('line_ids')
    def _compute_process(self):
        for res in self:
            if res.line_ids.exists():
                count_done = len(res.line_ids.filtered(lambda o: o.state == 'done'))
                res.process = (count_done / len(res.line_ids))/100

    
class DeliveryOrder(models.Model):
    _name = 'sgu.delivery.order'

    delivery_id  = fields.Many2one('sgu.delivery', 'Delivery')
    product_id = fields.Many2one('sgu.product', related='order_line.product_id', readonly=True)
    order_line = fields.Many2one('sgu.order.line', 'Order line')
    state = fields.Selection([
        ('cancel', 'Cancel'), 
        ('delivery', 'Delivery'), 
        ('come_back', 'Come Back'), 
        ('done', 'Done')
        ], 'State')
    complete_date = fields.Datetime(string='Complete Date')

    @api.multi
    def write(self, vals):
        res = super(DeliveryOrder, self).write(vals)
        if vals.get('state'):
            for item in self:
                if vals.get('state') == 'done':
                    item.complete_date = datetime.now() 
                    item.order_line.write({
                        'state' : 'done'
                    })
                if vals.get('state') == 'cancel':
                    item.order_line.write({
                        'state' : 'cancel',
                        'note': 'Delivery cancel:  %s' % (datetime.now().strftime('%d/%m/%Y '))
                    })