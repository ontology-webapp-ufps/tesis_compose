from flask import request
from flask_restful import Resource

from models.models import db, MainSectionModel, MainSectionSchema

parameters_schema = MainSectionSchema()

class MainSection(Resource):
    def get(self):
        parameters = MainSectionModel.query.get_or_404(1)
        return [parameters_schema.dump(parameters)]
    
    def post(self):
        if(request.json["token"] == 'mi_token_de_api'):
            parameters = MainSectionModel.query.get(1)

            if parameters is  None:
                parameters = MainSectionModel()
                parameters.id = 1

            parameters.main_title = request.json["main_title"]
            parameters.content_title = request.json["content_title"]
            parameters.content = request.json["content"]
            parameters.image = request.json["image"]

            db.session.add(parameters)
            db.session.commit()
            
            return {"api_code": "1", "mensaje": "Actualización de parametros exitosa."}
        else:
            return {"api_code": "2", "mensaje": "No estas autorizado para realizar la petición."}

