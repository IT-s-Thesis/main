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
            if rec.order_line_ids.exists():
                order_line = rec.order_line_ids.filtered(lambda o: o.state == 'done')
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

    delivery_ids = fields.One2many('sgu.delivery', 'order_id', 'Delivery')
    count_delivery = fields.Integer('Count Delivery', compute="_compute_count_delivery")

    lock = fields.Boolean('Lock', default=False)
    state = fields.Selection([
        ('order', 'Order'), 
        ('delivery', 'Delivery'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="order")

    def get_domain(self):
        group_shipper = self.env.ref('sgu_base.group_customer')
        return [('id', 'in', group_shipper.users.ids)]


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


    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.order') or _('New')
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
                res.total = sum(res.line_ids.mapped('sub_total'))
            

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
            rec.line_ids.change_reorder()

    @api.multi
    def change_cancel(self):
        for rec in self:
            rec.line_ids.change_cancel()

    @api.multi
    def change_lock(self):
        for item in self:
            if item.process != 100:
                raise ValidationError("Can't Done!")
                
            self.write({
                'lock': True,
                'state': 'done'
            })

    @api.multi
    def change_unlock(self):
        self.write({
            'lock': False,
            'state': 'delivery'
        })

class OrderLine(models.Model):
    _name = 'sgu.order.line'
    _description = "Order"
    _rec_name = 'name'

    name = fields.Char('Name')
    order_id = fields.Many2one('sgu.order')
    description = fields.Char('Description')
    product_id = fields.Many2one('sgu.product', 'Product')
    price = fields.Integer('Price', related="product_id.price", reonly=True, store=True)
    qty = fields.Integer('Quantity')
    sub_total = fields.Integer('Sub Total', compute="_compute_subtotal")
    state = fields.Selection([
        ('order', 'Order'), 
        ('delivery', 'Delivery'), 
        ('done', 'Done'),
        ('cancel', 'Cancel')
        ], 'State', default="order")
    note = fields.Text('Note')
    

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
            delivery = self.env['sgu.delivery.order'].search([
                ('order_line_id.id', '=', item.id)
            ])
            item.write({'state': 'order'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.multi
    def change_cancel(self):
        if self.order_id.lock:
            raise ValidationError(_('Order is lock!'))
        self.write({'state': 'cancel'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }

    @api.multi
    def change_done(self):
        if self.order_id.lock:
            raise ValidationError(_('Order is lock!'))
        self.write({'state': 'done'})
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }


    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('sgu_base.order_line') or _('New')
        return super(OrderLine, self).create(vals)



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
                res.process = (count_done / len(res.line_ids))/100

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