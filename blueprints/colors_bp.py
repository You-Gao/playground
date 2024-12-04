from flask import Flask, send_from_directory, make_response, request, render_template
from flask_smorest import Blueprint
from flask.views import MethodView

import os
import logging as log
import random, math, json
import numpy as np

from schemas.mood_schemas import HexSchema, PlaceholderSchema

bp = Blueprint('mood', 'mood', url_prefix='/mood/api/', description='Forwarding SendGrid Email Payloads')

log = log.getLogger(__name__)
react_build_path = os.path.join(os.getcwd(), "react_apps")

# global colors array to be used in the app
colors = []

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
        text = request.args.get('text')
        response_dict = {'hex': f'#{num:06X}', 'text': text}
        response = json.dumps(response_dict)
        colors.append(response_dict)
        return make_response(response, 200, {'Content-Type': 'application/json'})
 
@bp.route('/placeholder/')
class Placeholder(MethodView):
    @bp.response(200, PlaceholderSchema)
    def get(self):
        with open('data/placeholders.json', 'r') as f:
            response = json.load(f)
        response = random.choice(response)
        response = json.dumps({'placeholder': response["text"]})
        return make_response(response, 200, {'Content-Type': 'application/json'})
    
@bp.route('/questions/')
class Questions(MethodView):
    def get(self):
        with open('data/questions.json', 'r') as f:
            response = json.load(f)
            print(response)
        
        response = random.choice(response)
        print(response)
        response = json.dumps({'question': response["question"]})
        return make_response(response, 200, {'Content-Type': 'application/json'})

@bp.route('/colors/')
class Colors(MethodView):
    def get(self):
        return make_response(json.dumps(colors), 200, {'Content-Type': 'application/json'})

@bp.route('/<string:app>/static/<string:type>/<string:file>')
class StaticView(MethodView):
    def get(self, app, type, file):
        print(type)
        print(file)
        file_path = os.path.join(react_build_path, app, 'build', 'static', type)
        print(file_path)
        return send_from_directory(file_path, file)
