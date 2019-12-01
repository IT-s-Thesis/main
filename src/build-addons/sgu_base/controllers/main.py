# -*- coding: utf-8 -*-
import json
import math
import logging
import requests
import datetime
from datetime import date
from odoo import SUPERUSER_ID

from odoo import http
from odoo.http import request
from odoo.exceptions import ValidationError, UserError

from odoo.http import JsonRequest

_logger = logging.getLogger(__name__)
from odoo.http import content_disposition, dispatch_rpc, request, \
    serialize_exception as _serialize_exception, Response
from odoo.tools import crop_image, topological_sort, html_escape, pycompat
from odoo.tools.safe_eval import safe_eval

try:
    import dictfier
except ImportError as err:
    _logger.debug(err)


def flat_obj(obj, parent_obj, field_name):
    if isinstance(obj, datetime.datetime):
        return obj.strftime("%Y-%m-%d-%H-%M")
    if isinstance(obj, datetime.date):
        return obj.strftime("%Y-%m-%d")
    if isinstance(obj, datetime.time):
        return obj.strftime("%H-%M-%S")

    if hasattr(parent_obj, "fields_get"):
        field = parent_obj.fields_get(field_name)[field_name]
        field_type = field["type"]
        if field_type == "many2one":
            return obj.id
        if field_type in ["one2many", "many2many"]:
            return [rec.id for rec in obj]
        if field_type == "binary" and obj:
            return obj.decode("utf-8")
  
    return obj

def nested_flat_obj(obj, parent_obj):
    return obj

def nested_iter_obj(obj, parent_obj):
    return obj

class SguBase(http.Controller):


    @http.route('/auth/', 
        type='json', auth='public',
        methods=["POST"], csrf=False, sitemap=False)
    def authenticate(self, *args, **post):
        login = post["login"]
        password = post["password"]
        try:
            db = request.env.cr.db
        except Exception:
            if "db" in post:
                db = post["db"]
            else:
                msg = (
                    "Looks like db is not properly configured, "
                    "you can pass its name to `db` parameter to "
                    "avoid this error!."
                )
                return {"Error": msg}

        url_root = request.httprequest.url_root
        AUTH_URL = url_root + "web/session/authenticate/"
        
        headers = {'Content-type': 'application/json'}
            
        data = {
            "jsonrpc": "2.0",
            "params": {
                "login": login,
                "password": password,
                "db": db
            }
        }
        
        res = requests.post(
            AUTH_URL, 
            data=json.dumps(data), 
            headers=headers
        )
        
        try:
            session_id = res.cookies["session_id"]
            user = json.loads(res.text)
            user["result"]["session_id"]= session_id
        except Exception:
            return "Invalid credentials."
        return user["result"]

    @http.route('/object/<string:model>/<string:function>', 
        type='json', auth='public',
        methods=["POST"], csrf=False, cors="*", sitemap=False)
    def call_model_function(self, model, function, **post):
        args = []
        kwargs = {}
        if "args" in post:
            args = post["args"]
        if "kwargs" in post:
            kwargs = post["kwargs"]
        model = request.env[model]
        result = getattr(model, function)(*args, **kwargs)
        return result

    @http.route('/object/<string:model>/<int:rec_id>/<string:function>', 
        type='json', auth='public', cors="*",
        methods=["POST"], csrf=False, sitemap=False)
    def call_obj_function(self, model, rec_id, function, **post):
        args = []
        kwargs = {}
        if "args" in post:
            args = post["args"]
        if "kwargs" in post:
            kwargs = post["kwargs"]
        obj = request.env[model].browse(rec_id).ensure_one()
        result = getattr(obj, function)(*args, **kwargs)
        return result


    @http.route(
        '/api/notauth/<string:model>', 
        auth='public', cors="*", methods=['GET'], csrf=False)
    def get_model_data_not_auth(self, model, **params):
        records = request.env[model].search([])
        rule_query = records.fields_get_keys()
        if model == 'sgu.product':
            rule_query = ["id", "name", "price", 
                "image_url", "type", "on_hand", "color", 
                "ram", "memory", "origin","vendor", "screen", 
                "osystem", "camera", "cpu", "pin", "category_id"]
        
        if "query" in params:
            query = json.loads(params["query"])
            set_query = set(query)
            query = [list(set_query.intersection(set(rule_query)))]
        else:
            query = [rule_query]

        if "exclude" in params:
            exclude = json.loads(params["exclude"])
            for field in exclude:
                if field in query[0]:
                    field_to_exclude= query[0].index(field)
                    query[0].pop(field_to_exclude)
        
        if "filter" in params:
            json_str = params["filter"].replace('"*"', '"&"')
            filters = json.loads(json_str)
            records = request.env[model].search(filters)

        prev_page = None
        next_page = None
        total_page_number = 1
        current_page = 1

        if "page_size" in params:
            page_size = int(params["page_size"])
            count = len(records)
            total_page_number = math.ceil(count/page_size)

            if "page" in params:
                current_page = int(params["page"])
            else:
                current_page = 1  # Default page Number
            start = page_size*(current_page-1)
            stop = current_page*page_size
            records = records[start:stop]
            next_page = current_page+1 \
                        if 0 < current_page + 1 <= total_page_number \
                        else None
            prev_page = current_page-1 \
                        if 0 < current_page - 1 <= total_page_number \
                        else None

        if "limit" in params:
            limit = int(params["limit"])
            records = records[0:limit]

        data = dictfier.dictfy(
            records,
            query,
            flat_obj=flat_obj,
            nested_flat_obj=nested_flat_obj,
            nested_iter_obj=nested_iter_obj
        )

        res = {
            "count": len(records),
            "prev": prev_page,
            "current": current_page,
            "next": next_page,
            "total_pages": total_page_number,
            "result": data
        }
        return http.Response(
            json.dumps(res),
            status=200,
            mimetype='application/json'
        )



    @http.route(
        '/api/<string:model>', 
        auth='user', methods=['GET'], cors="*", csrf=False)
    def get_model_data(self, model, **params):
        records = request.env[model].search([])
        if "query" in params:
            query = json.loads(params["query"])
        else:
            query = [records.fields_get_keys()]

        if "exclude" in params:
            exclude = json.loads(params["exclude"])
            for field in exclude:
                if field in query[0]:
                    field_to_exclude= query[0].index(field)
                    query[0].pop(field_to_exclude)
        
        if "filter" in params:
            json_str = params["filter"].replace('"*"', '"&"')
            filters = json.loads(json_str)
            records = request.env[model].search(filters)

        prev_page = None
        next_page = None
        total_page_number = 1
        current_page = 1

        if "page_size" in params:
            page_size = int(params["page_size"])
            count = len(records)
            total_page_number = math.ceil(count/page_size)

            if "page" in params:
                current_page = int(params["page"])
            else:
                current_page = 1  # Default page Number
            start = page_size*(current_page-1)
            stop = current_page*page_size
            records = records[start:stop]
            next_page = current_page+1 \
                        if 0 < current_page + 1 <= total_page_number \
                        else None
            prev_page = current_page-1 \
                        if 0 < current_page - 1 <= total_page_number \
                        else None

        if "limit" in params:
            limit = int(params["limit"])
            records = records[0:limit]

        data = dictfier.dictfy(
            records,
            query,
            flat_obj=flat_obj,
            nested_flat_obj=nested_flat_obj,
            nested_iter_obj=nested_iter_obj
        )

        res = {
            "count": len(records),
            "prev": prev_page,
            "current": current_page,
            "next": next_page,
            "total_pages": total_page_number,
            "result": data
        }
        return http.Response(
            json.dumps(res),
            status=200,
            mimetype='application/json'
        )

    @http.route(
        '/api/<string:model>/<int:rec_id>',
        auth='user', methods=['GET'], cors="*", csrf=False)
    def get_model_rec(self, model, rec_id, **params):
        records = request.env[model].search([])
        if "query" in params:
            query = json.loads(params["query"])
        else:
            query = records.fields_get_keys()
        
        if "exclude" in params:
            exclude = json.loads(params["exclude"])
            for field in exclude:
                if field in query:
                    field_to_exclude = query.index(field)
                    query.pop(field_to_exclude)

        record = records.browse(rec_id).ensure_one()
        data = dictfier.dictfy(
            record,
            query,
            flat_obj=flat_obj,
            nested_flat_obj=nested_flat_obj,
            nested_iter_obj=nested_iter_obj
        )
        return http.Response(
            json.dumps(data),
            status=200,
            mimetype='application/json'
        )

    @http.route(
        '/api/<string:model>/', 
        type='json', auth="user", 
        methods=['POST'], cors="*", website=True, csrf=False)
    def post_model_data(self, model, **post):
        try:
            data = post['data']
        except KeyError:
            _logger.exception(
                "'data' parameter is not found on POST request"
            )

        if "context" in post:
            context = post["context"]
            record = request.env[model].with_context(**context)\
                     .create(data)
        else:
            record = request.env[model].create(data)
        if model == 'sgu.order':
            data = dictfier.dictfy(
                record,
                ['name', 'id', 'total', 'state', 'process'],
                flat_obj=flat_obj,
                nested_flat_obj=nested_flat_obj,
                nested_iter_obj=nested_iter_obj
            )
            return data
        return record.id
        
    @http.route(
        '/api/<string:model>/<int:rec_id>/',
        type='json', auth="user", 
        methods=['PUT'], website=True, csrf=False)
    def put_model_record(self, model, rec_id, **post):
        try:
            data = post['data']
        except KeyError:
            _logger.exception(
                "'data' parameter is not found on PUT request"
            )

        if "context" in post:
            rec = request.env[model].with_context(**post["context"])\
                  .browse(rec_id).ensure_one()
        else:
            rec = request.env[model].browse(rec_id).ensure_one()

        for field in data:
            if isinstance(data[field], dict):
                operations = []
                for operation in data[field]:
                    if operation == "push":
                        operations.extend(
                            (4, rec_id, _) 
                            for rec_id 
                            in data[field].get("push")
                        )
                    elif operation == "pop":
                        operations.extend(
                            (3, rec_id, _) 
                            for rec_id 
                            in data[field].get("pop")
                        )
                    elif operation == "delete":
                        operations.extend(
                            (2, rec_id, _) 
                            for rec_id 
                            in data[field].get("delete")
                        )
                    else:
                        data[field].pop(operation)  # Invalid operation

                data[field] = operations
            elif isinstance(data[field], list):
                data[field] = [(6, _, data[field])]  # Replace operation
            else:
                pass

        if rec.exists():
            return rec.write(data)
        else:
            return False

    @http.route(
        '/api/<string:model>/', 
        type='json', auth="user", 
        methods=['PUT'], website=True, csrf=False)
    def put_model_records(self, model, **post):
        try:
            data = post['data']
        except KeyError:
            _logger.exception(
                "'data' parameter is not found on PUT request"
            )

        filters = post["filter"]
        rec = request.env[model].search(filters)

        if "context" in post:
            rec = request.env[model].with_context(**post["context"])\
                  .search(filters)
        else:
            rec = request.env[model].search(filters)

        for field in data:
            if isinstance(data[field], dict):
                operations = []
                for operation in data[field]:
                    if operation == "push":
                        operations.extend(
                            (4, rec_id, _) 
                            for rec_id 
                            in data[field].get("push")
                        )
                    elif operation == "pop":
                        operations.extend(
                            (3, rec_id, _) 
                            for rec_id 
                            in data[field].get("pop")
                        )
                    elif operation == "delete":
                        operations.extend(
                            (2, rec_id, _) 
                            for rec_id in 
                            data[field].get("delete")
                        )
                    else:
                        pass  # Invalid operation

                data[field] = operations
            elif isinstance(data[field], list):
                data[field] = [(6, _, data[field])]  # Replace operation
            else:
                pass

        if rec.exists():
            return rec.write(data)
        else:
            return False

    @http.route(
        '/api/<string:model>/<int:rec_id>/', 
        type='http', auth="user", 
        methods=['DELETE'], website=True, csrf=False)
    def delete_model_record(self, model,  rec_id, **post):
        rec = request.env[model].browse(rec_id).ensure_one()
        if rec.exists():
            is_deleted = rec.unlink()
        else:
            is_deleted = False
        res = {
            "result": json.dumps(is_deleted)
        }
        return http.Response(
            json.dumps(res),
            status=200,
            mimetype='application/json'
        )

    @http.route(
        '/api/<string:model>/', 
        type='http', auth="user", 
        methods=['DELETE'], website=True, csrf=False)
    def delete_model_records(self, model, **post):
        filters = json.loads(post["filter"])
        rec = request.env[model].search(filters)
        if rec.exists():
            is_deleted = rec.unlink()
        else:
            is_deleted = False
        res = {
            "result": json.dumps(is_deleted)
        }
        return http.Response(
            json.dumps(res),
            status=200,
            mimetype='application/json'
        )


    @http.route(
        '/api/<string:model>/<int:rec_id>/<string:field>', 
        type='http', auth="user", 
        methods=['GET'], website=True, cors="*", csrf=False)
    def get_binary_record(self, model,  rec_id, field, **post):
        rec = request.env[model].browse(rec_id).ensure_one()
        if rec.exists():
            src = getattr(rec, field).decode("utf-8")
        else:
            src = False
        return http.Response(
            src
        )

    @http.route(
        '/api/order/checkout/', 
        auth='public', methods=['POST', 'OPTIONS'], cors="*", website=True, type='json', csrf=False)
    def order(self, **params):
        try:
            user = request.env['res.users'].sudo().search([

                ('email', '=', request.jsonrequest.get('email'))
            ])
            if len(user) == 0:
                data_user = {
                    'email': request.jsonrequest.get('email'),
                    'login': request.jsonrequest.get('email'),
                    'name': request.jsonrequest.get('name'),
                    'customer': True,
                    'phone': request.jsonrequest.get('phone', False),
                    'contact_address': request.jsonrequest.get('contact_address', False),
                    'gender': request.jsonrequest.get('gender', 'male')
                }
                record = request.env['res.users'].sudo().create(data_user)
                group_customer = request.env.ref('sgu_base.group_customer')
                record.sudo().write({'groups_id': [(6, 0,[group_customer.id])]})
                user = record
            data_order = {
                'customer': user.id,
                'address': request.jsonrequest.get('contact_address'),
                'phone': request.jsonrequest.get('phone'),
                'payment_method': request.jsonrequest.get('payment_method'),
            }
            order = request.env['sgu.order'].sudo().create(data_order)
            data_order_line = request.jsonrequest.get('order_lines')
            for item in data_order_line:
                item.update({
                    'order_id': order.id
                })
                request.env['sgu.order.line'].sudo().create(item)
            self._send_email_template_order(request, order)
            return {
                "status": 'success', 
                'code': order.name
            }
        except Exception as ex:
            if ex:
                http.Response.status = '400'
            return {
                    "status": 'error',
                    "message": ex
                }

    @http.route(
        '/api/tracking/<code_order>/<token>', 
        auth='public', methods=['GET'], cors="*", type='http', csrf=False)
    def order_tracking(self, code_order, token, **params):
        try:
            order = request.env['sgu.order'].sudo().search([
                ('name', '=', code_order),
                ('token', '=', token)
            ])
            if len(order) == 1:
                data_order = {
                    'name': order.name,
                    'customer_name': order.customer.name,
                    'address': order.address,
                    'phone': order.phone,
                    'total': order.total,
                    'state': order.state,
                    'order_lines': []
                }
                for item in order.line_ids:
                    data_order['order_lines'].append({
                        'product': item.product_id.name,
                        'price': item.price,
                        'qty': item.qty,
                        'sub_total': item.sub_total,
                        'state': item.state,
                        'description': item.description,
                    })
                return http.Response(
                    json.dumps({"status": 'success', 'data': data_order}),
                    status=200,
                    mimetype='application/json'
                )
        except Exception as ex:
            return http.Response(
                json.dumps({
                    "status": 'error',
                    "message": ex
                }),
                status=400,
                mimetype='application/json'
            )
    

    @http.route(
        '/api/download-report/<code_order>/<token>', 
        auth='public', methods=['POST', 'OPTIONS'], cors="*", type='http', csrf=False)
    def api_download_report(self, data, code_order, token):
        try:
            order = request.env['sgu.order'].sudo().search([
                ('name', '=', code_order),
                ('token', '=', token)
            ])
            if len(order) == 1:
                requestcontent = json.loads(data)
                url, type = requestcontent[0], requestcontent[1]
                try:
                    if type in ['qweb-pdf', 'qweb-text']:
                        converter = 'pdf' if type == 'qweb-pdf' else 'text'
                        extension = 'pdf' if type == 'qweb-pdf' else 'txt'

                        pattern = '/report/pdf/' if type == 'qweb-pdf' else '/report/text/'
                        reportname = url.split(pattern)[1].split('?')[0]

                        docids = None
                        if '/' in reportname:
                            reportname, docids = reportname.split('/')

                        if docids:
                            # Generic report:
                            response = self.report_routes(reportname, docids=docids, converter=converter)
                        else:
                            # Particular report:
                            data = url_decode(url.split('?')[1]).items()  # decoding the args represented in JSON
                            response = self.report_routes(reportname, converter=converter, **dict(data))

                        report = request.env['ir.actions.report'].sudo()._get_report_from_name(reportname)
                        filename = "%s.%s" % (report.name, extension)

                        if docids:
                            ids = [int(x) for x in docids.split(",")]
                            obj = request.env[report.model].sudo().browse(ids)
                            if report.print_report_name and not len(obj) > 1:
                                report_name = safe_eval(report.print_report_name, {'object': obj})
                                filename = "%s.%s" % (report_name, extension)
                        response.headers.add('Content-Disposition', content_disposition(filename))
                        return response
                    else:
                        return
                except Exception as e:
                    se = _serialize_exception(e)
                    error = {
                        'code': 200,
                        'message': "Odoo Server Error",
                        'data': se
                    }
                    return request.make_response(html_escape(json.dumps(error)))
        except Exception as ex:
            return http.Response(
                json.dumps({
                    "status": 'error',
                    "message": ex
                }),
                status=400,
                mimetype='application/json'
            )

    def report_routes(self, reportname, docids=None, converter=None, **data):
        report = request.env['ir.actions.report'].sudo()._get_report_from_name(reportname)
        context = dict(request.env.context)

        if docids:
            docids = [int(i) for i in docids.split(',')]
        if data.get('options'):
            data.update(json.loads(data.pop('options')))
        if data.get('context'):
            # Ignore 'lang' here, because the context in data is the one from the webclient *but* if
            # the user explicitely wants to change the lang, this mechanism overwrites it.
            data['context'] = json.loads(data['context'])
            if data['context'].get('lang'):
                del data['context']['lang']
            context.update(data['context'])
        if converter == 'html':
            html = report.with_context(context).render_qweb_html(docids, data=data)[0]
            return request.make_response(html)
        elif converter == 'pdf':
            pdf = report.with_context(context).render_qweb_pdf(docids, data=data)[0]
            pdfhttpheaders = [('Content-Type', 'application/pdf'), ('Content-Length', len(pdf))]
            return request.make_response(pdf, headers=pdfhttpheaders)
        elif converter == 'text':
            text = report.with_context(context).render_qweb_text(docids, data=data)[0]
            texthttpheaders = [('Content-Type', 'text/plain'), ('Content-Length', len(text))]
            return request.make_response(text, headers=texthttpheaders)
        else:
            raise werkzeug.exceptions.HTTPException(description='Converter %s not implemented.' % converter)


    def _send_email_template_order(self, request, order):
        su_id = request.env['res.partner'].browse(SUPERUSER_ID)
        template_id = request.env['ir.model.data'].get_object_reference(
                                'sgu_base',
                                'template_email_order')[1]
        if template_id:
            context = request.env.context.copy()
            context.update({'today': date.today().strftime('%d-%m-%Y')})
            request.env.context = context
            email_template_obj = request.env['mail.template'].sudo().browse(template_id)
            values = email_template_obj.generate_email(order.id, fields=None)
            values['email_from'] = su_id.sudo().email
            values['email_to'] = order.customer.email
            values['res_id'] = False
            mail_mail_obj = request.env['mail.mail'].sudo()
            msg_id = mail_mail_obj.create(values)
            if msg_id:
                msg_id.send()
