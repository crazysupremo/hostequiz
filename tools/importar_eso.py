# Junta tools/eso/*.txt en data/eso.json (preguntas en español; prueba libre GESO de Castilla y León)
import json, glob, re, sys
from collections import Counter
cats = {"matematicas": "Matemáticas", "ciencias": "Ciencias y Tecnología", "lengua": "Lengua castellana y literatura", "ingles": "Inglés", "social": "Ámbito social"}
tiempos = {"matematicas": 180, "ciencias": 90, "lengua": 60, "ingles": 45, "social": 60}  # segundos por pregunta
out, errs, seen, n = [], [], set(), 0
for f in sorted(glob.glob('tools/eso/*.txt')):
    cat = None
    for line in open(f, encoding='utf-8'):
        L = line.strip()
        if not L: continue
        if L.startswith('@'): cat = L[1:]; continue
        m = re.match(r'^([123])\|(?:vf=([01])\|)?(.*)$', L)
        if not m or cat not in cats: errs.append((f, L[:60])); continue
        n += 1
        q, _, a = m.group(3).partition('||')
        q = q.strip()
        item = {"id": f"e{n:03d}", "c": cat, "q": q, "n": int(m.group(1))}
        if m.group(2) is None:
            a = [x.strip() for x in a.split('|')]
            if len(a) != 4 or len({x.lower() for x in a}) != 4: errs.append((item['id'], q[:50], a))
            item["a"] = a
        else:
            item["vf"] = m.group(2) == '1'
        if q.lower() in seen and 'a' in item and item['a'][0].lower() in seen: errs.append(('dup', q[:50]))
        seen.add(q.lower() + '|' + (item.get('a') or ['vf'])[0].lower())
        out.append(item)
if errs: print('ERRORES', errs); sys.exit(1)
json.dump({"curso": "eso", "categorias": cats, "tiempos": tiempos, "niveles": {"1": "Fácil", "2": "Medio", "3": "Difícil"},
           "nota": "Preguntas basadas en las pruebas libres de Graduado en ESO para mayores de 18 años de la Junta de Castilla y León (2025-2026). La PRIMERA respuesta es la correcta.",
           "preguntas": out}, open('data/eso.json', 'w'), ensure_ascii=False, indent=1)
print(len(out), Counter(x['c'] for x in out), Counter(x['n'] for x in out))
