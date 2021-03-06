# -*- coding: utf-8 -*-
{
    'name': "Project Microservice",

    'summary': """
        Xay dung he thong ban dien thoai
        theo mo hinh Microservice""",

    'description': """
        Version : 0.1
        Xay dung he thong ban dien thoai theo mo hinh Microservice
    """,

    'author': "SGU",
    'website': "http://sgu.com.vn",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'sgu',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'mail', 'muk_web_theme', 'tgl_format_number'],
    
    # always loaded
    'data': [
        'security/group.xml',
        'security/ir.model.access.csv',
        'security/record_rule.xml',
        'data/ir_sequence_data.xml',
        'data/template_email.xml',

        'reports/templates/sale_order.xml',
        'reports/reports.xml',

        'wizard/adjust_product_view.xml',
        'wizard/comback_view.xml',
        'views/users.xml',
        'views/product.xml',
        'views/order.xml',
        'views/delivery.xml',
        'views/views.xml',
    ],
    'installable': True,
    'auto_install': True,
}
