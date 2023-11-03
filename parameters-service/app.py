from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from models.models import db
from views.about_project_view import ProjectSection
from views.main_section_view import MainSection
from views.team_section_view import TeamSection

app = Flask(__name__)

db_host = 'parameters_database'
db_port = 5432
db_name = 'PARAMETER_DB'
db_password = 'PARAMETER_PASSWORD_ULTA_SECRETO'
db_user = 'USER_PARAMETER_DB'

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