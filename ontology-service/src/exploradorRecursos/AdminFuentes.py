import sys, os
from owlready2 import default_world, close_world

PATH = os.path.relpath('src/sources') +"/"
print(PATH)
default_world.set_backend(filename=PATH + "BDO.sqlite3")

def getBDO():
    try:
        return default_world
    except IOError as e:
        msg = "IOError at Admin.getWorld: " + str(e)
        print(msg)
        return msg
    except:
        msg = "Unespected error at Admin.getWorld: "
        print(msg)
        return msg


'''
¿Qué pasa cuando un usuario está sacando info y tiene el mundo abierto
y se necesita añadir o eliminar alguna fuente?
¿Es necesario manejar el archivo de forma sincrónica? ¿Cómo sé cuando otra instancia está accediendo a él?
¿Cómo hago un re intentador para que espere un poquito mientras se desocupa el mundo?
'''

'''
    Estoy seguro de cómo cerrar el mundo, pero ni idea de volver a abrirlo. Queda como objeto de pruebas para 
    cuando esté usándose en simultáneo. No sé qué tan malo sea dejarlo abierto por siempre.
'''


def addFuenteLocal(file_name):
    #No necesitan un tratamiento distinto. Es posible que en un futuro, o con el uso de otra librería.
   return addFuente(PATH+file_name)

def addFuenteExterna(IRI):
    return addFuente(IRI)

def addFuente(fuente):
    try:
        default_world = getBDO()
        default_world.get_ontology(fuente).load()
        default_world.save()
        return 200, "Ontologia agregada"
    except IOError as e:
        return 400, "IOError at Admin.removeFuente: " + str(e)
    except:
        return 400, "Failed at Admin.removeFuente: " + str(sys.exc_info()[0])
    '''
        finally:
            try:
                default_world.close()
            except:
                return "Error closing default_world"
    '''

def removeFuente(IRI):
    try:
        default_world = getBDO()
        # remover
        #print(myWorld.get_ontology(IRI))
        default_world.get_ontology(IRI).destroy()
        default_world.save()
        return 200, "Ontologia eliminada"
    except IOError as e:
        return 400, "IOError at Admin.removeFuente: " + str(e)
    except:
        return 400, "Failed at Admin.removeFuente: " + str(sys.exc_info()[0])
    '''
        finally:
            try:
                default_world.close()
            except:
                return "Error closing default_world"
        '''


def listarKeysWorld():
    try:
        default_world = getBDO()
        list_key = []
        for key in default_world.ontologies.keys():
           list_key.append("<br>" + key + "<br>")
        #default_world.close()
        return "Fuentes cargadas actualmente en el mundo:<br>", list_key, 200, "list"
    except:
        return "Failed at Admin.listarKeysWorld: ", [], 400, "null"

def closeMoK():
    close_world(default_world)