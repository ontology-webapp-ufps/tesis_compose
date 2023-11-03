from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
import os
from dotenv import load_dotenv

from models.models import db

from views.user_views import ViewAuth, ViewDelete, ViewLogin, ViewReport, ViewSingIn, ViewUpdate

app = Flask(__name__)
loaded = load_dotenv('.env')
db_host = os.environ.get("DB_HOST")
db_port = os.environ.get("DB_PORT")
db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")
db_name = os.environ.get("DB_NAME")

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
app.config['SQLALCHEMY_DATABASE_URI'] = connection_string

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'frase-secreta'
app.config['PROPAGATE_EXCEPTIONS'] = True

app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

api = Api(app)

api.add_resource(ViewSingIn, '/singin')
api.add_resource(ViewLogin, '/login')
api.add_resource(ViewAuth, '/validate')

api.add_resource(ViewReport, '/user_report')
api.add_resource(ViewUpdate, '/update_user')
api.add_resource(ViewDelete, '/delete_user')

jwt = JWTManager(app)