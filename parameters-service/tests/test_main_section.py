import json
from unittest import TestCase

from models.models import MainSectionSchema, db, MainSectionModel
from app import app

parameters_schema = MainSectionSchema()

class TestMainSection(TestCase):
    
    def setUp(self):
        self.parameters = []
        self.client = app.test_client()

        parameters1 = MainSectionModel.query.get(1)
        parameters2 = MainSectionModel()
        parameters3 = MainSectionModel()

        self.parameters.append(parameters1)

        parameters3.id = 1
        parameters3.main_title = "UFPS - GIA"
        parameters3.content_title = "Buscador Ontologico"
        parameters3.content = "Este es un contendio de pruebas"
        parameters3.image = "https://myurl.com"

        self.parameters.append(parameters3)

        parameters2.id = 1
        parameters2.main_title = "UFPS - GIA 22"
        parameters2.content_title = "Buscador Ontologico5"
        parameters2.content = "Este es un contendio utilizado durante las pruebas"
        parameters2.image = "https://myurl.co"

        self.parameters.append(parameters2)

    def tearDown(self):
        if self.parameters[0] is not None:
            dataset = self.parameters[0]
        else:
            dataset = self.parameters[1]

        self.restore_initial_data(dataset)
    
    def test_get_main_section(self):
        data = MainSectionModel.query.get(1)

        if data is None:
            data = MainSectionModel(
                id = 1,
                main_title = self.parameters[1].main_title,
                content_title = self.parameters[1].content_title,
                content = self.parameters[1].content,
                image = self.parameters[1].image
            )
            db.session.add(data)
            db.session.commit()
        
        endpoint = "/main_section"
        resultado_nueva_persona = self.client.get(endpoint)
        datos_respuesta = json.loads(resultado_nueva_persona.get_data())

        self.assertEqual(datos_respuesta[0]['id'], data.id)
        self.assertEqual(datos_respuesta[0]['main_title'], data.main_title)
        self.assertEqual(datos_respuesta[0]['content_title'], data.content_title)
        self.assertEqual(datos_respuesta[0]['content'], data.content)
        self.assertEqual(datos_respuesta[0]['image'], data.image)

    def test_post_main_section_sucess_token(self):
        previous = MainSectionModel()
        if self.parameters[0] is not None:
            previous = MainSectionModel(
                id=1,
                main_title = self.parameters[0].main_title,
                content_title = self.parameters[0].content_title,
                content = self.parameters[0].content,
                image = self.parameters[0].image
            )

        endpoint = "/main_section"
        headers = {'Content-Type': 'application/json'}

        data = parameters_schema.dump(self.parameters[2])
        data['token'] = "mi_token_de_api"

        response_data = json.loads(self.client.post(endpoint, data=json.dumps(data), headers=headers).get_data())

        self.restore_initial_data(previous)
        
        self.assertEqual(int(response_data['api_code']), 1)

    def test_post_main_section_failed_token(self):
        endpoint = "/main_section"
        headers = {'Content-Type': 'application/json'}

        data = parameters_schema.dump(self.parameters[2])
        data['token'] = "mi_token_incorrecto"

        resultado_nueva_persona = self.client.post(endpoint, data=json.dumps(data), headers=headers)
        datos_respuesta = json.loads(resultado_nueva_persona.get_data())

        self.assertEqual(int(datos_respuesta['api_code']), 2)

    def test_post_main_section_not_previous_data(self):
        #delete previous data
        previous = MainSectionModel(
            id=1,
            main_title = self.parameters[0].main_title,
            content_title = self.parameters[0].content_title,
            content = self.parameters[0].content,
            image = self.parameters[0].image
        )

        delete_data = MainSectionModel.query.get(1)
        db.session.delete(delete_data)
        db.session.commit()

        endpoint = "/main_section"
        headers = {'Content-Type': 'application/json'}

        data = parameters_schema.dump(self.parameters[2])
        data['token'] = "mi_token_de_api"

        response_data = json.loads(self.client.post(endpoint, data=json.dumps(data), headers=headers).get_data())

        self.restore_initial_data(previous)

        self.assertEqual(int(response_data['api_code']), 1)

    def restore_initial_data(self, data):
        db_data = MainSectionModel.query.get(data.id)
        db_data.main_title = data.main_title
        db_data.content_title = data.content_title
        db_data.content = data.content
        db_data.image = data.image
        db.session.add(db_data)
        db.session.commit()