# Importa tools/nuevas/*.txt al banco de preguntas (es) y a data/i18n (pt, en y, si hay línea «ar|…», ar)
import json, glob, re, sys
bank = json.load(open('data/preguntas.json'))
tr = {l: json.load(open(f'data/i18n/{l}.json')) for l in ['pt', 'en', 'ar']}
bank['preguntas'] = [x for x in bank['preguntas'] if not x['id'].startswith('n')]  # reimport limpio
for l in ['pt', 'en']:
    for k in [k for k in tr[l] if k.startswith('n')]: del tr[l][k]
seen = {x['q'].lower() for x in bank['preguntas'] if 'img' not in x}
errs, n_new, cnt = [], 0, {}
for f in sorted(glob.glob('tools/nuevas/*.txt')):
    cat = None
    lines = [l.rstrip('\n') for l in open(f, encoding='utf-8')]
    i = 0
    while i < len(lines):
        L = lines[i].strip()
        if not L: i += 1; continue
        if L.startswith('@'): cat = L[1:]; i += 1; continue
        head, pt, en = L, lines[i+1].strip(), lines[i+2].strip(); i += 3
        ar = None
        if i < len(lines) and lines[i].strip().startswith('ar|'): ar = lines[i].strip()[3:]; i += 1
        m = re.match(r'^([123])\|(?:vf=([01])\|)?(.*)$', head)
        if not m: errs.append((f, head[:50])); continue
        lv, vf, es = int(m.group(1)), m.group(2), m.group(3)
        n_new += 1
        pid = f'n{n_new:03d}'
        def split(s):
            q, _, a = s.partition('||')
            return q.strip(), [x.strip() for x in a.split('|')] if a.strip() else []
        qs, as_ = split(es); qp, ap = split(pt); qe, ae = split(en)
        qa, aa = split(ar) if ar else (None, [])
        if vf is None:
            for name, a in [('es', as_), ('pt', ap), ('en', ae)] + ([('ar', aa)] if ar else []):
                if len(a) != 4: errs.append((pid, name, 'n answers', len(a), qs[:40]))
                if len({x.lower() for x in a}) != len(a): errs.append((pid, name, 'dup', a))
        elif as_ or ap or ae: errs.append((pid, 'vf with answers'))
        if qs.lower() in seen: errs.append((pid, 'duplicate question', qs[:50]))
        seen.add(qs.lower())
        item = {'id': pid, 'c': cat, 'q': qs, 'n': lv}
        if vf is None: item['a'] = as_
        else: item['vf'] = vf == '1'
        bank['preguntas'].append(item)
        tr['pt'][pid] = [qp] + ap; tr['en'][pid] = [qe] + ae
        if ar: tr['ar'][pid] = [qa] + aa
        cnt[cat] = cnt.get(cat, 0) + 1
cats = {**bank['categorias'], 'vinos': 'Vinos y bodega', 'cocteleria': 'Coctelería y destilados', 'cliente': 'Atención al cliente'}
order = ['cafes', 'tes', 'bebidas', 'vinos', 'cocteleria', 'cristaleria', 'montaje', 'servicio', 'cliente', 'cocina', 'higiene', 'vocabulario']
bank['categorias'] = {k: cats[k] for k in order}
unknown = {x['c'] for x in bank['preguntas']} - set(order)
if errs or unknown:
    print('ERRORES', errs, unknown); sys.exit(1)
json.dump(bank, open('data/preguntas.json', 'w'), ensure_ascii=False, indent=1)
for l in ['pt', 'en']: json.dump(tr[l], open(f'data/i18n/{l}.json', 'w'), ensure_ascii=False, indent=0)
json.dump(tr['ar'], open('data/i18n/ar.json', 'w'), ensure_ascii=False, indent=1)
from collections import Counter
print('nuevas', n_new, cnt)
print('total', len(bank['preguntas']), Counter(x['c'] for x in bank['preguntas']), Counter(x.get('n') for x in bank['preguntas']))
