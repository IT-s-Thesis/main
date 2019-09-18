# -*- coding: utf-8 -*-
{
    'name': "sgu_base",

    'summary': """
        Module SGU Project""",

    'description': """
        Module SGU Project
    """,

    'author': "My Friends",
    'website': "http://fit.sgu.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'sgu',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': [
        'base',
        'muk_web_theme',
        'contact',
        'hr',
        'sale_management',
        'stock',
        'format_number',
        'restful',
        ],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
}