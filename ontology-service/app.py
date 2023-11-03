from src.generadorOntologico import Recolector
from src.exploradorRecursos import AdminFuentes
import json
from flask_cors import CORS
from flask import Flask, request, render_template
from flask_fontawesome import FontAwesome

app = Flask(__name__)
cors = CORS(app)
fa = FontAwesome(app)

@app.route('/')
def hello_world():
    return json.dumps({
        "statusCode": 200,
        "method": "GET",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : "BIENVENIDOS AL SERVICIO ONTOLOGICO"
        }
    })
#Requiere Flask 1.1 para lo de los parámetros dentro de la ruta

@app.route('/search', methods=['POST'])
def buscar():
    keyWords = request.args.get("keyWords", "").split(",")
    formato = request.args.get("format", "").lower()
    lang = request.args.get("lang", "").lower()
    if lang == "": lang = "eng"
    umbral = int(request.args.get("umbral", default=-1, type=int))
    if umbral == -1: umbral = 70
    code, OntoGenerada, message = Recolector.buscar(keyWords, umbral, formato, lang)
    return json.dumps({
        "statusCode": code,
        "method": "POST",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : message,
            "type": formato,
            "result": json.dumps(OntoGenerada)
        }
    })


@app.route('/add/<path:IRI>', methods=['POST'])
def addFuenteExterna(IRI):  
    code, message =  AdminFuentes.addFuenteExterna(IRI)
    return json.dumps({
        "statusCode": code,
        "method": "POST",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : message
        }
    })

@app.route('/add/local/<path:file_name>', methods=['POST'])
def addFuenteLocal(file_name):
    code, message =  AdminFuentes.addFuenteLocal(file_name)
    return json.dumps({
        "statusCode": code,
        "method": "POST",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : message
        }
    })

@app.route('/remove/<path:IRI>', methods=['DELETE'])
def removeFuente(IRI):
    code, message = AdminFuentes.removeFuente(IRI)
    return json.dumps({
        "statusCode": code,
        "method": "DELETE",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : message
        }
    })

@app.route('/getFuentes', methods=['GET'])
def getFuentes():
    message , result, code, type_obj =  AdminFuentes.listarKeysWorld()
    return json.dumps({
        "statusCode": code,
        "method": "GET",
        "headers": {
            "content-Type": "text/html; charset=UTF-8"
        },
        "body":{
            "message" : message,
            "type": type_obj,
            "result": result
        }
    })


import werkzeug.serving
werkzeug.serving.run_simple('0.0.0.0', 5000, app)