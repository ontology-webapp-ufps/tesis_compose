from flask import request
from flask_restful import Resource

from models.models import db, AboutSectionModel, AboutSectionSchema

parameters_schema = AboutSectionSchema()

class ProjectSection(Resource):
    def get(self):
        parameters = AboutSectionModel.query.all()
        return [parameters_schema.dump(parameter) for parameter in parameters]
    
    def post(self):
        dataset = request.json['data']

        if(request.json["token"] == 'mi_token_de_api' and len(dataset) == 3):
            count = 1
            for data in dataset:   
                print(data)
                update_param = AboutSectionModel.query.get(count)

                if update_param is None:
                    update_param = AboutSectionModel()
                    update_param.id = count
                
                update_param.content_title = data['content_title']
                update_param.content = data['content']
                db.session.add(update_param)
                db.session.commit()
                db.session.remove()

                count+=1

            return {"api_code": "1", "mensaje": "Actualización de parametros exitosa."}
        elif request.json["token"] == 'mi_token_de_api' and len(dataset) != 3:
            return {"api_code": "2", "mensaje": "El request no tiene la estructura correcta."}
        else:
            return {"api_code": "2", "mensaje": "No estas autorizado para realizar la petición."}

