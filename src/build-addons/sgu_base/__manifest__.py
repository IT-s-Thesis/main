# -*- coding: utf-8 -*-
{
    'name': "sgu_base",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "SGU",
    'website': "http://sgu.com.vn",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'sgu',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'sale', 'stock', 'contacts', 'purchase', 'employee'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/employee.xml',
        'views/stock.xml',
        'views/sale.xml',
        'views/contacts.xml',
        'views/purchase.xml',
    ],
}