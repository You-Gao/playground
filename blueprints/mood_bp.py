from flask import Flask, send_from_directory, make_response, request, render_template
from flask_smorest import Blueprint
from flask.views import MethodView

import os
import logging as log
import random, math, json

from schemas.mood_schemas import HexSchema, PlaceholderSchema

bp = Blueprint('mood', 'mood', url_prefix='/mood/api/', description='Forwarding SendGrid Email Payloads')

log = log.getLogger(__name__)
react_build_path = os.path.join(os.getcwd(), "react_apps")


@bp.route('/')
class ReactView(MethodView):
    def get(self):
        return render_template('home.html')
    def post(self):
        log.info(request.json)
        return make_response('OK', 200)
    
@bp.route('/hex/')
class Hex(MethodView):
    @bp.response(200, HexSchema)
    def get(self):
        # random num from #000000 to #FFFFFF
        num = math.floor(random.randrange(0, 16777215))
        response = json.dumps({'hex': f'#{num:06X}'})
        return make_response(response, 200, {'Content-Type': 'application/json'})
    
@bp.route('/placeholder/')
class Placeholder(MethodView):
    @bp.response(200, PlaceholderSchema)
    def get(self):
        with open('data/placeholders.json', 'r') as f:
            response = json.load(f)
        response = random.choice(response)
        print(response)
        response = json.dumps({'placeholder': response["text"]})
        return make_response(response, 200, {'Content-Type': 'application/json'})

@bp.route('/<string:app>/static/<string:type>/<string:file>')
class StaticView(MethodView):
    def get(self, app, type, file):
        print(type)
        print(file)
        file_path = os.path.join(react_build_path, app, 'build', 'static', type)
        print(file_path)
        return send_from_directory(file_path, file)
