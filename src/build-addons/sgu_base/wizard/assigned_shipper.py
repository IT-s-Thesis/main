from odoo import models, fields, tools, api, _
from odoo.exceptions import ValidationError

class AssignedShipper(models.TransientModel):
    _name = 'assigned.shipper'

    shipper_id = fields.Many2one('res.users', 'Shipper', domain=lambda self: self.get_domain())
    order_id = fields.Many2one('sgu.order', 'Order')
    order_line_ids = fields.Many2many('sgu.order.line', 'Order line')
    order_line_ids = fields.Many2many('sgu.order.line', 'Order line')
    
    def get_domain(self):
        group_shipper = self.env.ref('sgu_base.group_shipper')
        return [('id', 'in', group_shipper.users.ids)]

    