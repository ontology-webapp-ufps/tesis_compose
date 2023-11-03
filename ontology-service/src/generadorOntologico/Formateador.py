from io import BytesIO
from src.util import util
from owlready2 import World

def formatearOnto(OntoGenerada, formato):
    try:
        if(formato == "json"):
            result = toJSON_LD(OntoGenerada)
        elif (formato == "nt"):
            result = toNTriples(OntoGenerada)
        else:
            result = toRDF(OntoGenerada)
        return result
    except:
        util.printException(Exception, "formateardor.formatearOnto")
        return "Error al convertir la ontología al formato solicitado"

def toJSON_LD(OntoGenerada):

   
    g = OntoGenerada.world.as_rdflib_graph()
    print(g)
    result = g.serialize(format='application/json-ld')

    return result

def toRDF(OntoGenerada):
    virtualFile = BytesIO()
    OntoGenerada.save(virtualFile)

    result = virtualFile.getvalue().decode('utf8')

    virtualFile.close()
    return result

def toNTriples(OntoGenerada):
    virtualFile = BytesIO()
    OntoGenerada.save(virtualFile, format = "ntriples")

    result = virtualFile.getvalue().decode('utf-8')

    virtualFile.close()
    return result