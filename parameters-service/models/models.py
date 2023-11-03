from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()

class MainSectionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    main_title = db.Column(db.String(150), unique=True)
    content_title = db.Column(db.String(150))
    content = db.Column(db.String(300))
    image = db.Column(db.String(300))

class AboutSectionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content_title = db.Column(db.String(150))
    content = db.Column(db.String(300))

class TeamSectionModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    email = db.Column(db.String(300))
    role = db.Column(db.String(100))
    img = db.Column(db.String(300))

class MainSectionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = MainSectionModel
        include_relationships = True
        load_instance = True

class AboutSectionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = AboutSectionModel
        include_relationships = True
        load_instance = True

class TeamSectionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TeamSectionModel
        include_relationships = True
        load_instance = True