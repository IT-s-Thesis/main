from odoo import models, fields, tools, api, _
from odoo.exceptions import ValidationError

class AdjustProduct(models.TransientModel):
    _name = 'adjust.product'

    product_id = fields.Many2one('sgu.product', 'Product')
    type = fields.Selection([('receipt', 'Receipt'), ('scrap', 'Scrap'), ('mistake', 'Mistake')], 'Type', default="receipt")
    adjust_qty = fields.Integer('Quantity')
    description = fields.Text('Description')
    forecast_qty = fields.Char('Forecast Qty', readonly=True)


    @api.onchange('product_id', 'adjust_qty', 'type')
    def onchange_product_qty(self):
        for item in self:
            if item.product_id.exists() and item.adjust_qty > 0:
                if item.type != 'receipt':
                    if item.adjust_qty > item.product_id.on_hand:
                        item.forecast_qty = 'Error'
                    else: 
                        item.forecast_qty = str(item.product_id.on_hand - item.adjust_qty) + ' product'
                else:
                    item.forecast_qty = str(item.product_id.on_hand + item.adjust_qty) + ' product'


    @api.constrains('product_id', 'adjust_qty', 'type')
    def _check_amount(self):
        self.ensure_one()
        if self.product_id.exists() and self.adjust_qty > 0:
                if self.type != 'receipt':
                    if self.adjust_qty > self.product_id.on_hand:
                        raise ValidationError('Error! Incompatible') 


    def adjust_product(self):
        self.ensure_one()
        body = ''
        body += '<p><b>On hand</b>: %s</p>' % (str(self.product_id.on_hand))
        body += '<p><b>Adjust Qty</b>: %s</p>' % (str(self.adjust_qty))
        body += '<p><b>Description</b>: %s</p>' % (self.description or '')
        qty = self.product_id.qty
        if self.type == 'receipt':
            self.product_id.write({
                'qty': qty + self.adjust_qty
            })
            self.env['mail.message'].create({
                'subject': 'Receipt Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.product',
                'res_id': self.product_id.id,
                'body': body,
            })
        elif self.type == 'scrap':
            self.product_id.write({
                'qty': qty - self.adjust_qty
            })
            self.env['mail.message'].create({
                'subject': 'Scrap Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.product',
                'res_id': self.product_id.id,
                'body': body,
            })
        elif self.type == 'mistake':
            self.product_id.write({
                'qty': qty - self.adjust_qty
            })
            self.env['mail.message'].create({
                'subject': 'Mistake Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.product',
                'res_id': self.product_id.id,
                'body': body,
            })