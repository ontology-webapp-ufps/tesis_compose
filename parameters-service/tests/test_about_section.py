import json
from unittest import TestCase

from models.models import AboutSectionSchema, db, AboutSectionModel
from app import app

parameters_schema = AboutSectionSchema()

class TestAboutSection(TestCase):
    
    def setUp(self):
        self.parameters = []

        section = [AboutSectionModel.query.get(1), AboutSectionModel.query.get(2), AboutSectionModel.query.get(3)]
        self.parameters.append(section)

        section2 = [
            AboutSectionModel(id=1, content_title="Motivation", content="motivation of this project is gradution"),
            AboutSectionModel(id=2, content_title="Principles", content="Principles of this project is gradution"),
            AboutSectionModel(id=3, content_title="Technologies", content="Technologies of this project is flask and angular")
        ]

        self.parameters.append(section2)

        self.client = app.test_client()

    def tearDown(self):
        dataset = self.parameters[0]

        if dataset[0] is None or dataset[1] is None or dataset[2] is None:
            dataset = AboutSectionModel.query.all()
            for data in dataset:
                new_data = AboutSectionModel()
                new_data = data;
                if data.id == 1:
                    new_data.content_title = "Motivación"
                    new_data.content = "Este proyecto es desarollado como parte del proceso de sustentación de tesis para optar por el titulo de ingeniería de Sistemas en la Universidad Francisco de Paula Santander"
                    db.session.add(new_data)   
                elif data.id == 2:
                    new_data.content_title = "Principios"
                    new_data.content = "Este proyecto aplica un estilo de arquitectura orientado a los microservicios, conectado a un servicio web desarrolado previamente"
                    db.session.add(new_data)   
                elif data.id == 3:
                    new_data.content_title = "Tecnologías"
                    new_data.content = "En el proyecto se emplean frameworks de desarrollo como es el caso de Angular, Flask y ... para la creación de los microservicios, los cuales son desplegados en la nube de AWS"
                    db.session.add(new_data)   
                else:
                    print('unsoported')
        else:
            self.restore_initial_data(dataset)

    def test_get_about_section(self):
        data = AboutSectionModel.query.all()

        if len(data)<3:
            data = self.parameters[1]
            for dataset_param in data:
                new_param = AboutSectionModel()
                new_param = dataset_param
                db.session.add(new_param)
                db.session.commit()
        
        endpoint = "/project_section"
        new_parameters = self.client.get(endpoint)
        response_data = json.loads(new_parameters.get_data())

        self.assertEqual(response_data[0]['id'], data[0].id)
        self.assertEqual(response_data[0]['content_title'], data[0].content_title)
        self.assertEqual(response_data[0]['content'], data[0].content)
        self.assertEqual(response_data[1]['id'], data[1].id)
        self.assertEqual(response_data[1]['content_title'], data[1].content_title)
        self.assertEqual(response_data[1]['content'], data[1].content)
        self.assertEqual(response_data[2]['id'], data[2].id)
        self.assertEqual(response_data[2]['content_title'], data[2].content_title)
        self.assertEqual(response_data[2]['content'], data[2].content)

    def test_post_about_section_sucess(self):
        #Se debe evitar apuntar a la misma referencia de memoria para evitar sobreescritura
        previous_data = []
        for model in self.parameters[0]:
            previous_data.append(AboutSectionModel(
                id=int(model.id),
                content_title=model.content_title,
                content=model.content
            ))

        new_data = self.parameters[1]

        endpoint = "/project_section"
        headers = {'Content-Type': 'application/json'}

        parser = [parameters_schema.dump(parameter) for parameter in new_data]
        response = {}
        response['data'] = parser
        response['token'] = "mi_token_de_api"

        response_data = self.client.post(endpoint, data=json.dumps(response), headers=headers).get_json()
        
        self.restore_initial_data(previous_data)

        self.assertEqual(int(response_data['api_code']), 1)

    def test_post_about_section_failed_token(self):
        endpoint = "/project_section"
        headers = {'Content-Type': 'application/json'}

        parser = [parameters_schema.dump(parameter) for parameter in self.parameters[1]]
        data = {}
        data['data'] = parser
        data['token'] = "mi_token_incorrecto"

        new_parameters = self.client.post(endpoint, data=json.dumps(data), headers=headers)
        response_data = json.loads(new_parameters.get_data())

        self.assertEqual(int(response_data['api_code']), 2)
    
    def test_post_about_section_failed_content(self):
        endpoint = "/project_section"
        headers = {'Content-Type': 'application/json'}

        parser = [parameters_schema.dump(self.parameters[1][0])]
        data = {}
        data['data'] = parser
        data['token'] = "mi_token_de_api"

        new_parameters = self.client.post(endpoint, data=json.dumps(data), headers=headers)
        response_data = json.loads(new_parameters.get_data())

        self.assertEqual(int(response_data['api_code']), 2)

    def restore_initial_data(self, dataset):
        for data in dataset:
            db_data = AboutSectionModel.query.get(data.id)
            db_data.content_title = data.content_title
            db_data.content = data.content
            db.session.add(db_data)
        db.session.commit()