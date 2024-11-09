from flask import Flask, send_from_directory, make_response, request
from flask_smorest import Blueprint
from flask.views import MethodView

import os
import logging as log

bp = Blueprint('forward', 'forward', url_prefix='/', description='Forwarding SendGrid Email Payloads')

log = log.getLogger(__name__)
react_build_path = r"C:\Users\commo\OneDrive - University of Virginia\School\STEM\CS\Coding Projects 2024\playground\react_apps\clock\build"


@bp.route('/')
class ReactView(MethodView):
    def get(self):
        return send_from_directory(react_build_path, "index.html")
    def post(self):
        log.info(request.json)
        return make_response('OK', 200)
    
@bp.route('/static/<string:type>/<string:file>')
class StaticView(MethodView):
    def get(self, type, file):
        print(type)
        print(file)
        file_path = os.path.join(react_build_path, 'static', type)
        print(file_path)
        return send_from_directory(file_path, file)