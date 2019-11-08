# -*- coding: utf-8 -*-
from odoo import http

class SguBase(http.Controller):
    @http.route('/sgu_base/sgu_base/', auth='public')
    def index(self, **kw):
        return "Hello, world"

    @http.route('/sgu_base/sgu_base/objects/', auth='public')
    def list(self, **kw):
        return http.request.render('sgu_base.listing', {
            'root': '/sgu_base/sgu_base',
            'objects': http.request.env['sgu_base.sgu_base'].search([]),
        })

    @http.route('/call/<model("sgu_base.sgu_base"):obj>/', auth='public')
    def object(self, obj, **kw):
        return http.request.render('sgu_base.object', {
            'object': obj
        })