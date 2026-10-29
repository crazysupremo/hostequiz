# Genera las ilustraciones SVG de public/img (python3 tools/dibujos.py)
import os, math

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "img")
os.makedirs(OUT, exist_ok=True)

LINE = "#f4e7d4"
GLASS = "rgba(244,231,212,0.07)"
C = dict(
    cafe="#4a2814", crema="#b8763a", leche="#efe3cf", espuma="#fbf6ec", condensada="#f0d9a0",
    nata="#fffaf0", whisky="#6a3a17", licor="#c98a2b", cola="#3b1d10", vino="#7d1d2c",
    blanco="#e9d98a", cerveza="#e3a32a", cava="#efe08f", vermut="#8a2a1e", helado="#f5e6b5",
    hielo="rgba(214,236,248,0.55)", hieloL="#d6ecf8", limon="#f2d43a", naranja="#f08a24",
    aceituna="#7b8f2a", cacao="#6b3d1f", grano="#3a1f0e", combinado="#d6b46a",
)


def svg(body, defs=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img"><defs>{defs}</defs>{body}</svg>\n'


def save(name, content):
    with open(os.path.join(OUT, name + ".svg"), "w") as f:
        f.write(content)


# ---------- formas de vasos y copas: (contorno, y_arriba, y_abajo, pie) ----------
def stem(y_top, y_base=206, rx=34):
    return (f'<path d="M100 {y_top} V{y_base}" stroke="{LINE}" stroke-width="5" stroke-linecap="round"/>'
            f'<ellipse cx="100" cy="{y_base + 2}" rx="{rx}" ry="7" fill="{GLASS}" stroke="{LINE}" stroke-width="4"/>')

SHAPES = {
    "tubo":     ("M72 28 H128 V206 Q128 212 122 212 H78 Q72 212 72 206 Z", 28, 212, ""),
    "bajo":     ("M55 112 H145 L141 206 Q141 212 135 212 H65 Q59 212 59 206 Z", 112, 212, ""),
    "chupito":  ("M80 132 H120 L116 210 H84 Z", 132, 210, ""),
    "vasito":   ("M68 82 H132 L126 208 Q126 212 122 212 H78 Q74 212 74 208 Z", 82, 212, ""),
    "refresco": ("M60 48 H140 L130 206 Q130 212 124 212 H76 Q70 212 70 206 Z", 48, 212, ""),
    "jarra":    ("M58 58 H132 V204 Q132 212 124 212 H66 Q58 212 58 204 Z", 58, 212,
                 f'<path d="M132 88 H150 Q162 88 162 100 V160 Q162 172 150 172 H132" fill="none" stroke="{LINE}" stroke-width="7"/>'),
    "cana":     ("M74 100 H126 L121 206 Q121 212 115 212 H85 Q79 212 79 206 Z", 100, 212, ""),
    "vino":     ("M62 36 H138 Q142 128 100 136 Q58 128 62 36 Z", 36, 136, stem(136)),
    "balon":    ("M72 34 H128 C170 64 166 146 100 152 C34 146 30 64 72 34 Z", 34, 152, stem(152)),
    "flauta":   ("M84 24 H116 L111 136 Q100 148 89 136 Z", 24, 146, stem(146, rx=28)),
    "plana":    ("M42 86 H158 Q154 124 100 128 Q46 124 42 86 Z", 86, 128, stem(128)),
    "coctel":   ("M40 48 H160 L100 128 Z", 48, 128, stem(128)),
    "licor":    ("M80 92 H120 Q124 140 100 144 Q76 140 80 92 Z", 92, 144, stem(144, rx=24)),
    "irlandes": ("M66 30 H134 L127 150 Q100 162 73 150 Z", 30, 158,
                 stem(158, 200, 32)),
}


def glass_parts(shape, layers=(), inside="", outside="", cid="g"):
    path, y0, y1, extra = SHAPES[shape]
    clip = f'<clipPath id="{cid}"><path d="{path}"/></clipPath>'
    body = f'<path d="{path}" fill="{GLASS}"/>'
    g = ""
    y = y1
    for color, frac in layers:
        h = frac * (y1 - y0)
        g += f'<rect x="0" y="{y - h:.1f}" width="200" height="{h + 0.6:.1f}" fill="{color}"/>'
        y -= h
    body += f'<g clip-path="url(#{cid})">{g}{inside}</g>'
    body += f'<path d="{path}" fill="none" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>{extra}{outside}'
    return clip, body


def glass(shape, layers=(), inside="", outside=""):
    clip, body = glass_parts(shape, layers, inside, outside)
    return svg(body, clip)


def level(shape, frac):
    _, y0, y1, _ = SHAPES[shape]
    return y1 - frac * (y1 - y0)


def ice(x, y, s=22, rot=0):
    return (f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="4" fill="{C["hielo"]}" stroke="{C["hieloL"]}" '
            f'stroke-width="2" transform="rotate({rot} {x + s / 2} {y + s / 2})"/>')


def slice_(cx, cy, r, color):
    spokes = "".join(
        f'<path d="M{cx} {cy} L{cx + r * 0.8 * math.cos(a):.1f} {cy + r * 0.8 * math.sin(a):.1f}" stroke="#fff6d8" stroke-width="1.6"/>'
        for a in [i * math.pi / 4 for i in range(8)])
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * 0.82:.1f}" fill="#fff1c2" opacity=".55"/>{spokes}')


def peel(x, y):
    return f'<path d="M{x} {y} q14 -10 26 4 q10 12 24 2" fill="none" stroke="{C["limon"]}" stroke-width="7" stroke-linecap="round"/>'


def olive(x, y):
    return (f'<path d="M{x} {y - 40} L{x + 16} {y + 22}" stroke="#d9c7a8" stroke-width="3" stroke-linecap="round"/>'
            f'<ellipse cx="{x + 9}" cy="{y}" rx="11" ry="8" fill="{C["aceituna"]}" transform="rotate(60 {x + 9} {y})"/>'
            f'<circle cx="{x + 11}" cy="{y - 3}" r="2.5" fill="#c0392b"/>')


def bubbles(xs, y0, y1):
    out = ""
    for i, x in enumerate(xs):
        for j in range(4):
            y = y1 - 14 - j * (y1 - y0) / 4.6 - (i % 2) * 9
            out += f'<circle cx="{x}" cy="{y:.0f}" r="{2 + (j % 2)}" fill="none" stroke="#fff8d0" stroke-width="1.4"/>'
    return out


def beans(y, xs):
    return "".join(
        f'<ellipse cx="{x}" cy="{y}" rx="7" ry="5" fill="{C["grano"]}" transform="rotate({(-25, 20, -10, 30, 0)[i % 5]} {x} {y})"/>'
        f'<path d="M{x - 5} {y} q5 -2 10 0" stroke="#7a4a24" stroke-width="1.4" fill="none" transform="rotate({(-25, 20, -10, 30, 0)[i % 5]} {x} {y})"/>'
        for i, x in enumerate(xs))


def dots(y, xs, color):
    return "".join(f'<circle cx="{x}" cy="{y + (i % 3) * 3}" r="2.6" fill="{color}"/>' for i, x in enumerate(xs))


def cup(big=False, layers=(("cafe", 0.82),), saucer=True):
    if big:
        path, y0, y1 = "M52 84 H148 L140 168 Q100 186 60 168 Z", 84, 180
        handle = f'<path d="M146 100 H160 Q172 100 172 114 V128 Q172 142 158 144 L142 148" fill="none" stroke="{LINE}" stroke-width="7"/>'
        sy, srx = 186, 74
    else:
        path, y0, y1 = "M68 112 H132 L127 164 Q100 178 73 164 Z", 112, 174
        handle = f'<path d="M131 124 H142 Q152 124 152 134 V142 Q152 152 142 153 L128 156" fill="none" stroke="{LINE}" stroke-width="6"/>'
        sy, srx = 180, 56
    # el interior se ve desde arriba: una elipse con el color de la superficie
    top_color = C[layers[-1][0]]
    body = ""
    if saucer:
        body += f'<ellipse cx="100" cy="{sy}" rx="{srx}" ry="10" fill="#e9dccb" stroke="{LINE}" stroke-width="3"/>'
    body += handle
    body += f'<path d="{path}" fill="#f6efe4" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>'
    w = (148 - 52) / 2 if big else (132 - 68) / 2
    body += f'<ellipse cx="100" cy="{y0}" rx="{w}" ry="9" fill="#d9c9b4" stroke="{LINE}" stroke-width="3"/>'
    body += f'<ellipse cx="100" cy="{y0 + 2}" rx="{w - 6}" ry="6" fill="{top_color}"/>'
    if layers[-1][0] == "cafe":
        body += f'<ellipse cx="100" cy="{y0 + 2}" rx="{w - 10}" ry="4" fill="{C["crema"]}" opacity=".8"/>'
    return body


# ================= VASOS Y COPAS (vacíos, para reconocerlos) =================
for name in ["tubo", "bajo", "chupito", "vino", "balon", "flauta", "plana", "coctel", "licor", "jarra", "irlandes", "refresco"]:
    save("vaso-" + name, glass(name))

save("taza-pequena", svg(cup(False)))
save("taza-grande", svg(cup(True, (("leche", 1),))))

# ================= CAFÉS POR CAPAS (esquema en vaso de cristal) =================
L = lambda k: C[k]
save("cafe-solo", glass("vasito", [(L("cafe"), .32), (L("crema"), .05)]))
save("cafe-cortado", glass("vasito", [(L("cafe"), .32), (L("leche"), .14), (L("espuma"), .05)]))
save("cafe-con-leche", glass("vasito", [(L("cafe"), .32), (L("leche"), .42), (L("espuma"), .08)]))
save("leche-manchada", glass("vasito", [(L("leche"), .72), ("#c9a47e", .08), (L("espuma"), .07)]))
save("cafe-bombon", glass("vasito", [(L("condensada"), .32), (L("cafe"), .36), (L("crema"), .04)]))
save("capuchino", glass("vasito", [(L("cafe"), .28), (L("leche"), .2), (L("espuma"), .3)],
                        inside=dots(level("vasito", .78) + 4, range(80, 125, 7), L("cacao"))))
save("cafe-irlandes", glass("irlandes", [(L("whisky"), .62), (L("nata"), .2)]))
save("cafe-escoces", glass("bajo", [(L("whisky"), .55)],
                           outside=f'<circle cx="100" cy="{level("bajo", .55) - 8}" r="24" fill="{L("helado")}" stroke="{LINE}" stroke-width="3"/>'
                                   f'<circle cx="92" cy="{level("bajo", .55) - 16}" r="2" fill="#2b1a0e"/><circle cx="108" cy="{level("bajo", .55) - 10}" r="2" fill="#2b1a0e"/>'))
save("carajillo", glass("vasito", [(L("licor"), .18), (L("cafe"), .38), (L("crema"), .04)],
                        inside=beans(198, [86, 98, 110, 92, 116][:5])))
# café solo con hielo: taza pequeña + vaso bajo con hielo aparte
_clip, _vaso = glass_parts("bajo", inside=ice(66, 160, 26, 12) + ice(98, 168, 26, -18) + ice(80, 134, 24, 30))
save("cafe-con-hielo", svg(f'<g transform="translate(-22 20) scale(.72)">{cup(False)}</g>'
                           f'<g transform="translate(70 34) scale(.68)">{_vaso}</g>', _clip))

# ================= BEBIDAS SERVIDAS =================
save("refresco", glass("refresco", [(L("cola"), .8)],
                       inside=ice(78, 70, 26, 15) + ice(104, 84, 26, -12) + ice(84, 104, 24, 35),
                       outside=slice_(136, 50, 20, L("limon"))))
save("combinado", glass("balon", [(L("combinado"), .7)],
                        inside=ice(66, 70, 26, 10) + ice(100, 66, 26, -20) + ice(80, 98, 26, 25) + ice(110, 100, 24, 5),
                        outside=peel(70, 40)))
save("vermut", glass("bajo", [(L("vermut"), .7)],
                     inside=ice(72, 128, 24, 18) + ice(102, 136, 24, -14),
                     outside=slice_(140, 112, 18, L("naranja")) + olive(78, 112)))
save("cerveza-jarra", glass("jarra", [(L("cerveza"), .78), ("#fff9ee", .14)],
                            inside=bubbles([76, 96, 116], 90, 212)))
save("cerveza-hielo", glass("jarra", [(L("cerveza"), .78), ("#fff9ee", .14)],
                            inside=ice(70, 100, 26, 14) + ice(100, 112, 26, -12) + ice(80, 140, 24, 30)))
save("cana", glass("cana", [(L("cerveza"), .74), ("#fff9ee", .16)], inside=bubbles([90, 108], 110, 212)))
save("vino-tinto", glass("vino", [(L("vino"), .48)]))
save("vino-blanco", glass("vino", [(L("blanco"), .48)]))
save("cava", glass("flauta", [(L("cava"), .82)], inside=bubbles([94, 104], 34, 140)))

# ================= MONTAJE =================
def mesa(highlight=None):
    hl = lambda k: (f'stroke="{C["naranja"]}" stroke-width="5"' if highlight == k else f'stroke="{LINE}" stroke-width="3"')
    b = f'<rect x="8" y="20" width="184" height="200" rx="10" fill="#3a2a1f"/>'
    # plato llano
    b += f'<circle cx="100" cy="140" r="44" fill="#f6efe4" {hl("plato")}/><circle cx="100" cy="140" r="30" fill="none" stroke="#d9c9b4" stroke-width="2"/>'
    # servilleta (triángulo sobre el plato)
    b += f'<path d="M80 156 L100 120 L120 156 Z" fill="#e39b45" {hl("servilleta")}/>'
    # tenedor (izquierda)
    b += f'<g {hl("tenedor")} fill="none" stroke-linecap="round"><path d="M42 112 V186"/><path d="M36 100 V118 Q42 124 48 118 V100"/><path d="M42 100 V114"/></g>'
    # cuchillo y cuchara (derecha)
    b += f'<path d="M158 100 Q166 120 160 140 V186" fill="none" {hl("cuchillo")} stroke-linecap="round"/>'
    b += f'<g {hl("cuchara")}><ellipse cx="178" cy="110" rx="7" ry="11" fill="none"/><path d="M178 121 V186" fill="none" stroke-linecap="round"/></g>'
    # plato de pan (arriba a la izquierda)
    b += f'<circle cx="40" cy="58" r="20" fill="#f6efe4" {hl("pan")}/><ellipse cx="40" cy="58" rx="9" ry="6" fill="#d7a35e"/>'
    # copa (arriba)
    b += f'<circle cx="100" cy="62" r="17" fill="{GLASS}" {hl("copa")}/><circle cx="100" cy="62" r="9" fill="none" stroke="{LINE}" stroke-width="2" opacity=".6"/>'
    return svg(b)

save("mesa", mesa())
for k in ["pan", "servilleta", "copa", "tenedor", "cuchillo"]:
    save("mesa-" + k, mesa(k))

def manteles():
    b = f'<rect x="20" y="150" width="160" height="16" rx="3" fill="#6d5a4a" stroke="{LINE}" stroke-width="2"/>'
    b += f'<text x="100" y="163" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#fff">1</text>'
    b += f'<rect x="14" y="128" width="172" height="16" rx="3" fill="#f6efe4" stroke="{LINE}" stroke-width="2"/>'
    b += f'<text x="100" y="141" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#3a2a1f">2</text>'
    b += f'<rect x="40" y="106" width="120" height="16" rx="3" fill="#e39b45" stroke="{LINE}" stroke-width="2"/>'
    b += f'<text x="100" y="119" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#2a1407">3</text>'
    b += f'<rect x="30" y="170" width="140" height="12" fill="#8a5a3a"/><rect x="40" y="182" width="10" height="40" fill="#8a5a3a"/><rect x="150" y="182" width="10" height="40" fill="#8a5a3a"/>'
    return svg(b)
save("manteles", manteles())

print("SVG generados:", len(os.listdir(OUT)))
