import json
from unittest import TestCase
import unittest


from models.models import TeamSectionSchema, db, TeamSectionModel
from app import app

parameters_schema = TeamSectionSchema()

class TestTeamSection(TestCase):
    
    def setUp(self):
        self.parameters = []
        self.client = app.test_client()

        section = TeamSectionModel.query.all()
        self.parameters.append(section)

        section1 = [
            TeamSectionModel(
                id= 1,
                role= "Tesista",
                email= "juancamilohp@ufps.edu.co",
                img= "https://media.licdn.com/dms/image/D4E03AQFhC_o0V8Vl0Q/profile-displayphoto-shrink_800_800/0/1665936899590?e=2147483647&v=beta&t=MEiK75HhIoTXizKgKtMT9dAcQdZsL28_BDzStOUY8BE",
                name= "Juan Camilo Hernández Parra"
            ),
            TeamSectionModel(
                id= 2,
                role= "Tesista",
                email= "josemanoloph@ufps.edu.co",
                img= "https://media.licdn.com/dms/image/C4D03AQGqjXXvUzXjfw/profile-displayphoto-shrink_800_800/0/1590708714139?e=2147483647&v=beta&t=N7q7GkhTzP_P7qt5Jcm5S2AnsfoqftTxN1BrACq5HGg",
                name= "Jose Manolo Pinzon Hernandez"
            ),
            TeamSectionModel(
                id= 3,
                role= "Director",
                email= "eduardpuerto@ufps.edu.co",
                img= "https://docentes.ufps.edu.co/public/imagenes/1f8e6f3c0f57d2003077f6222c0251bf936b1df76b6924143ea80f37ccaf8762.JPEG",
                name= "Eduard Gilberto Puerto Cuadros"
            ),
        ]
        self.parameters.append(section1)

        section2 = [
            TeamSectionModel(
                id= 1,
                role= "Tesista",
                email= "juan@gmail.com",
                img= "https://url.com",
                name= "Juan Carlos"
            ),
            TeamSectionModel(
                id= 2,
                role= "Tesista",
                email= "manuel@ufps.edu.co",
                img= "https://url.com",
                name= "Manuel Pinzon"
            ),
            TeamSectionModel(
                id= 3,
                role= "Director",
                email= "eduardpuerto@ufps.edu.co",
                img= "https://url.com",
                name= "Milton Vera"
            ),
        ]
        self.parameters.append(section2)

    def tearDown(self):
        if len(self.parameters[0]) == 0:
            for initial_param in self.parameters[1]:
                db.session.add(initial_param)
                db.session.commit()
        else:
            self.restore_initial_data(self.parameters[0])
 
    def test_get_team_section(self):
        data = TeamSectionModel.query.all()

        if len(data)==0:
            for initial_param in self.parameters[1]:
                db.session.add(initial_param)
                db.session.commit()
            data = TeamSectionModel.query.all()

        endpoint = "/team_section"
        response_data = json.loads(self.client.get(endpoint).get_data())

        self.assertEqual(len(data), len(response_data))
        i = 0

        for response in response_data:
            self.assertEqual(int(response['id']), data[i].id)
            self.assertEqual(response['name'], data[i].name)
            self.assertEqual(response['email'], data[i].email)
            self.assertEqual(response['role'], data[i].role)
            self.assertEqual(response['img'], data[i].img)
            i+=1

    def test_post_team_section_sucess(self):
        endpoint = "/team_section"
        headers = {'Content-Type': 'application/json'}
        parser = [parameters_schema.dump(parameter) for parameter in self.parameters[2]]
        data = {}
        data['data'] = parser
        data['token'] = "mi_token_de_api"

        #Evitar sobreescritura de parametros
        previous = []
        previous_db_data = TeamSectionModel.query.all()

        if len(previous_db_data) == 0:
            previous_db_data = self.parameters[1]
        
        for db_data in previous_db_data:
            temp_data = TeamSectionModel(
                id = db_data.id,
                name = db_data.name,
                email = db_data.email,
                role = db_data.role,
                img = db_data.img
            )
            previous.append(temp_data)
        
        response_data = json.loads(self.client.post(endpoint, data=json.dumps(data), headers=headers).get_data())
        
        self.restore_initial_data(previous)
        
        self.assertEqual(int(response_data['api_code']), 1)

    def test_post_team_section_failure(self):
        endpoint = "/team_section"
        headers = {'Content-Type': 'application/json'}

        data = parameters_schema.dump(self.parameters[2])
        data['token'] = "mi_token_incorrecto"

        response_data = json.loads(self.client.post(endpoint, data=json.dumps(data), headers=headers).get_data())

        self.assertEqual(int(response_data['api_code']), 2)

    def restore_initial_data(self, dataset):
        for data in dataset:
            db_data = TeamSectionModel.query.get(data.id)
            db_data.name = data.name
            db_data.email = data.email
            db_data.role = data.role
            db_data.img = data.img
            db.session.add(db_data)
        db.session.commit()