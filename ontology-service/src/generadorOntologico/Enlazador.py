import urllib
from owlready2 import types, Thing, Ontology

from src.exploradorRecursos import AdminFuentes
from src.generadorOntologico import Generador
from src.util import AsyncHttp, util

global OntoGenerada
OntoDbPedia = Ontology(world=AdminFuentes.getBDO(), base_iri="http://dbpedia.org/resource/").load()

def enlazarConConceptosLocales(claseDestino, coincidencia, keyWords):
    if coincidencia["nivel"] == 2:
        for keyword in keyWords:
            word = keyword["keyword"]
            valorSimilitudTermino = coincidencia["similitud"][word]
            if valorSimilitudTermino >= 2 and keyword["clase"] is not None:
                clasePrincipal = keyword["clase"]
                enlazarConceptos(claseDestino, clasePrincipal, referenciarComoEquivalente=False)
    elif coincidencia["nivel"] == 3:
        for referencia in coincidencia["ReferenciadoA"]:
            enlazarConceptos(claseDestino, referencia["obj"], referenciarComoEquivalente=False)


def enlazarConDbPedia(etiqueta, concepto):
    url = "https://lookup.dbpedia.org/api/search/KeywordSearch?MaxHits=1&QueryString="
    params = urllib.parse.quote_plus(etiqueta.replace("_", " "))
    url = url + "%22" + params + "%22"
    AsyncHttp.get_async(url, callback=procesarRespuesta, data=concepto)


def procesarRespuesta(response, concepto):
    if response is not None:
        if response.status_code == 200:
            result = response.text
            uriInicio = result.find("<URI>")
            uriFin = result.find("</URI>")
            if uriInicio != -1 and uriFin != -1:
                nombreConcepto = result[uriInicio + 5:uriFin]
                nombreConcepto = nombreConcepto[nombreConcepto.rindex("/") + 1:]

                conceptoDbPedia = crearConceptoDbPedia(nombreConcepto)
                if conceptoDbPedia is not None:
                    enlazarConceptos(concepto, conceptoDbPedia, referenciarComoEquivalente=True)

    Generador.continuarProceso()


def crearConceptoDbPedia(nombreConcepto):
    global OntoDbPedia
    try:
        with OntoDbPedia:
            conceptoDbPedia = types.new_class(nombreConcepto, (Thing,))
        return conceptoDbPedia
    except:
        return None


def enlazarConceptos(concepto, conceptoAReferenciar, referenciarComoEquivalente):
    global OntoGenerada

    with OntoGenerada:
        if referenciarComoEquivalente:
            concepto.equivalent_to.append(conceptoAReferenciar)
            util.addReferenciasDbpedia()
        else:
            concepto.is_a.append(conceptoAReferenciar)