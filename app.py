from flask import Flask
from flask_smorest import Api
from flask_cors import CORS

from blueprints.serve_react import bp as react_bp
from blueprints.colors_bp import bp as colors_bp


app = Flask(__name__)

# allow all cors
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/mood/api/*": {"origins": ["http://playground.yougao.dev", "http://localhost:3000"]}}
app.config["API_TITLE"] = "My API"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.2"
app.config["OPENAPI_URL_PREFIX"] = "/api/docs"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/"

api = Api(app)
api.register_blueprint(react_bp)
api.register_blueprint(colors_bp)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
