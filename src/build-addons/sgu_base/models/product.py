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
    image_url = fields.Char('Image Url', compute="_compute_url_image")
    qty = fields.Integer('Qty')
    on_hand = fields.Integer('On Hand', compute="_compute_qty_order")
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
    public_website = fields.Boolean('Public website', default=False)

    @api.multi
    def _compute_url_image(self):
        for item in self:
            item.image_url = '/web/image/sgu.product/' + str(item.id) + '/image'

    def open_adjust_product(self):
        self.ensure_one()
        return {
            'name': _('Adjustment'),
            'type': 'ir.actions.act_window',
            'res_model': 'adjust.product',
            'views': [[self.env.ref('sgu_base.adjust_product_view_form').id, "form"]],
            'target': 'new',
            'context': {
                'default_product_id': self.id,
            }
        }

    @api.model
    def create(self, vals):
        tools.image_resize_images(vals, big_name='hinhanh', medium_name='image_medium', small_name='image_small')
        return super(Product, self).create(vals)

    @api.multi
    def write(self, vals):
        tools.image_resize_images(vals, big_name='hinhanh')
        return super(Product, self).write(vals)


    @api.depends('order_line_ids', 'qty')
    @api.multi
    def _compute_qty_order(self):
        for rec in self:
            if rec.sudo().order_line_ids.exists():
                order_line = rec.sudo().order_line_ids.filtered(lambda o: o.order_id.state in ['delivery', 'done'])
                rec.qty_order = len(order_line.mapped('order_id'))
                rec.on_hand = rec.qty - sum(order_line.mapped('qty'))
            else:
                rec.qty_order = 0
                rec.on_hand = rec.qty

    @api.depends('delivery_line_ids')
    @api.multi
    def _compute_qty_delivery(self):
        for rec in self:
            if rec.delivery_line_ids.exists():
                delivery_line = rec.delivery_line_ids.filtered(lambda o: o.state == 'done')
                rec.qty_delivery = len(delivery_line.mapped('delivery_id'))


    def view_onhand(self):
        return

    def view_order(self):
        self.ensure_one()
        order_ids = self.order_line_ids.mapped('order_id').ids
        return {
            'name': 'See order',
            'view_type': 'form',
            'view_mode': 'tree,form',
            'res_model': 'sgu.order',
            'view_id': False,
            'domain': [('id', 'in', order_ids)],
            'type': 'ir.actions.act_window',
        }

    def view_delivery(self):
        self.ensure_one()
        delivery_ids = self.delivery_line_ids.mapped('delivery_id').ids
        return {
            'name': 'See delivery',
            'view_type': 'form',
            'view_mode': 'tree,form',
            'res_model': 'sgu.delivery',
            'view_id': False,
            'domain': [('id', 'in', delivery_ids)],
            'type': 'ir.actions.act_window',
        }
