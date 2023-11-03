from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv

from models.models import db
from views.about_project_view import ProjectSection
from views.main_section_view import MainSection
from views.team_section_view import TeamSection
import os

app = Flask(__name__)

loaded = load_dotenv('.env')
db_host = os.environ.get("DB_HOST")
db_port = os.environ.get("DB_PORT")
db_user = os.environ.get("DB_USER")
db_password = os.environ.get("DB_PASSWORD")
db_name = os.environ.get("DB_NAME")

connection_string = f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
app.config['SQLALCHEMY_DATABASE_URI'] = connection_string
app.config['JWT_SECRET_KEY'] = 'frase-secreta'
app.config['PROPAGATE_EXCEPTIONS'] = True

app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

cors = CORS(app)

api = Api(app)

api.add_resource(MainSection, '/main_section')
api.add_resource(ProjectSection, '/project_section')
api.add_resource(TeamSection, '/team_section') 