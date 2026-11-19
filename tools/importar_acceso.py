# Junta tools/acceso/*.txt en data/eso.json.
# Prueba de acceso a Grado Medio de Castilla y León: Competencias básicas nivel 3 (BOCYL nº 42, 3 de marzo de 2026, anexo I).
# Formato: "@materia", "#COMPETENCIA" (p. ej. #NC.3.4),
#   "nivel|pregunta || correcta | mal | mal | mal >> explicación"  o  "nivel|vf=1|afirmación >> explicación"
import json, glob, re, sys
from collections import Counter
cats = {"lengua": "Lengua castellana", "matematicas": "Matemáticas", "digital": "Competencia digital"}
tiempos = {"lengua": 120, "matematicas": 180, "digital": 60}  # segundos por pregunta
dominios = {
    "CE": "Comprensión escrita", "CO": "Comprensión oral", "EO": "Expresión oral", "EE": "Expresión escrita",
    "NC": "Números y cálculo", "FM": "Formas y medidas", "GE": "Gráficos y estadística",
    "IAD": "Información y alfabetización digital", "CC": "Comunicación y colaboración", "CCD": "Creación de contenidos",
    "SEG": "Seguridad", "PRO": "Resolución de problemas",
}
# Competencias del anexo I (nivel 3), con un título corto para enseñar en la app
competencias = {
    "EO.3.1": "Expresar ideas de forma ordenada y clara", "EO.3.2": "Mensajes orales: ideas principales y secundarias",
    "EO.3.3": "Hablar con claridad según el contexto", "EO.3.4": "Resumir oralmente un texto", "EO.3.5": "Interactuar oralmente de forma adecuada",
    "CO.3.1": "Comprender mensajes orales y su intención", "CO.3.2": "Interpretar los medios de comunicación",
    "CO.3.3": "Interpretar instrucciones y opiniones orales", "CO.3.4": "Escuchar de forma crítica",
    "EE.3.1": "Ortografía y gramática", "EE.3.2": "Resumir información de varias fuentes", "EE.3.3": "Escribir según la situación (correo, CV, solicitud)",
    "EE.3.4": "Tipos de texto y estructura", "EE.3.5": "Escribir en papel o en digital",
    "CE.3.1": "Tema principal y secundarios", "CE.3.2": "Publicidad, opinión y noticias", "CE.3.3": "Comprender e interpretar textos",
    "CE.3.4": "Sacar conclusiones de textos de actualidad", "CE.3.5": "Hechos, opiniones y argumentos",
    "NC.3.1": "Números y operaciones en la vida diaria", "NC.3.2": "Enteros, fracciones, decimales y calculadora",
    "NC.3.3": "Ecuaciones de primer grado", "NC.3.4": "Proporcionalidad (regla de tres)", "NC.3.5": "Porcentajes",
    "FM.3.1": "Problemas geométricos", "FM.3.2": "Longitud, masa, tiempo, superficie y volumen", "FM.3.3": "Magnitudes, instrumentos y unidades",
    "GE.3.1": "Tablas y medidas estadísticas", "GE.3.2": "Gráficos estadísticos", "GE.3.3": "Probabilidad",
    "IAD.3.1": "Buscar información en internet", "IAD.3.2": "Comparar herramientas y dispositivos", "IAD.3.3": "Organizar y publicar información",
    "CC.3.1": "Compartir información y archivos", "CC.3.2": "Trámites y participación digital", "CC.3.3": "Compartir información laboral o personal",
    "CC.3.4": "Videoconferencias y netiqueta",
    "CCD.3.1": "Crear contenido digital", "CCD.3.2": "Editar y adaptar contenidos", "CCD.3.3": "Derechos de autor y licencias",
    "SEG.3.1": "Comprobar la fiabilidad de la información", "SEG.3.2": "Ciberdelitos y cómo prevenirlos", "SEG.3.3": "Contraseñas y acceso seguro",
    "SEG.3.4": "Salud y uso de dispositivos", "SEG.3.5": "Uso responsable y reciclaje",
    "PRO.3.1": "Resolver problemas técnicos", "PRO.3.2": "Obsolescencia programada", "PRO.3.3": "Elegir soluciones tecnológicas",
    "PRO.3.4": "Publicidad y elección de productos",
}
out, errs, seen, n = [], [], set(), 0
for f in sorted(glob.glob('tools/acceso/*.txt')):
    cat = dom = comp = None
    for line in open(f, encoding='utf-8'):
        L = line.strip()
        if not L: continue
        if L.startswith('@'): cat = L[1:]; continue
        if L.startswith('#'): comp = L[1:]; dom = comp.split('.')[0]; continue
        m = re.match(r'^([123])\|(?:vf=([01])\|)?(.*)$', L)
        if not m or cat not in cats or comp not in competencias: errs.append((f, L[:60])); continue
        body, _, expl = m.group(3).partition('>>')
        if not expl.strip(): errs.append(('sin explicación', L[:60]))
        n += 1
        q, _, a = body.partition('||')
        q = q.strip()
        item = {"id": f"g{n:03d}", "c": cat, "d": dom, "k": comp, "q": q, "n": int(m.group(1)), "e": expl.strip()}
        if m.group(2) is None:
            a = [x.strip() for x in a.split('|')]
            if len(a) != 4 or len(set(a)) != 4 or not all(a): errs.append((item['id'], q[:50], a))
            item["a"] = a
        else:
            item["vf"] = m.group(2) == '1'
        key = q.lower() + '|' + (item.get('a') or ['vf'])[0].lower()
        if key in seen: errs.append(('repetida', q[:50]))
        seen.add(key)
        out.append(item)
if errs: print('ERRORES', *errs, sep='\n'); sys.exit(1)
json.dump({"curso": "eso", "categorias": cats, "dominios": dominios, "competencias": competencias, "tiempos": tiempos, "niveles": {"1": "Fácil", "2": "Medio", "3": "Difícil"},
           "nota": "Preguntas tipo test según los contenidos de la prueba de acceso a ciclos de Grado Medio de Castilla y León (competencias básicas nivel 3, BOCYL 3-3-2026). La PRIMERA respuesta es la correcta.",
           "preguntas": out}, open('data/eso.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), Counter(x['c'] for x in out), Counter(x['n'] for x in out))
falta = [k for k in competencias if not any(x['k'] == k for x in out)]
print('competencias sin preguntas:', falta or 'ninguna')
print(sorted(Counter(x['k'] for x in out).items()))
