from odoo import models, fields, tools, api, _
from odoo.exceptions import ValidationError
from datetime import datetime

class ComebackProduct(models.TransientModel):
    _name = 'comeback.product.wizard'

    delivery_item = fields.Many2one('sgu.delivery.order', 'Delivery item')
    comeback_date = fields.Datetime(string='Comeback date')

    @api.constrains('comeback_date')
    def check_comeback_date(self):
        if self.comeback_date:
            if self.comeback_date <= datetime.now():
                raise ValidationError('Comeback Date not less than Date Now!')
        
    def update_comeback(self):
        self.ensure_one()
        self.delivery_item.write({
            'comeback_date': self.comeback_date,
        })
        body = "<h3>Comeback Product</h3><ul>"
        body += "<li><b>Product</b>: %s</li>" % (self.delivery_item.product_id.name)
        body += "<li><b>Date</b>: %s</li>" % (self.comeback_date.strftime('%d/%m/%Y, %H:%M:%S'))
        body += "</ul>"

        self.env['mail.message'].create({
                'subject': 'Comeback Product',
                'author_id': self.env.user.partner_id.id,
                'model': 'sgu.delivery',
                'res_id': self.delivery_item.delivery_id.id,
                'body': body,
            })
        self.delivery_item.change_comeback()

    