from flask import request
from flask_restful import Resource

from models.models import db, TeamSectionModel, TeamSectionSchema

parameters_schema = TeamSectionSchema()

class TeamSection(Resource):
    def get(self):
        parameters = TeamSectionModel.query.all()
        return [parameters_schema.dump(parameter) for parameter in parameters ]
    
    def post(self):
        if(request.json["token"] == 'mi_token_de_api'):
            new_parameters = request.json['data']

            print(new_parameters[0]['id'])

            for param in new_parameters:
                new_param = TeamSectionModel.query.get(param['id'])

                if new_param is None:
                    new_param = TeamSectionModel(
                        name = param['name'],
                        email = param['email'],
                        role = param['role'],
                        img = param['img']
                    )
                else:
                    new_param.name = param['name']
                    new_param.email = param['email']
                    new_param.img = param['img']
                    new_param.role = param['role']

                db.session.add(new_param)

            db.session.commit()
            return {"api_code": "1", "mensaje": "Actualización de parametros exitosa."}
        else:
            return {"api_code": "2", "mensaje": "No estas autorizado para realizar la petición."}

