// Utilidades compartidas
const SHAPES = [
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 37 34H3Z" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 38 20 20 38 2 20Z" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="4" width="32" height="32" rx="3" fill="currentColor"/></svg>',
];
// En verdadero/falso: Verdadero = azul ◆, Falso = rojo ▲
const colorIdx = (i, vf) => (vf ? [1, 0][i] : i);

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function api(path, body) {
  const r = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  let data = {};
  try { data = await r.json(); } catch (e) {}
  if (!r.ok) throw new Error(data.error || "No se ha podido conectar. Inténtalo otra vez.");
  return data;
}

// Conexión en tiempo real; se reconecta sola si el móvil se bloquea
function stream(params, handlers) {
  const es = new EventSource("/events?" + new URLSearchParams(params));
  for (const [ev, fn] of Object.entries(handlers)) {
    es.addEventListener(ev, (e) => fn(JSON.parse(e.data || "{}")));
  }
  return es;
}

const store = {
  get(k, s = localStorage) { try { return JSON.parse(s.getItem(k)); } catch (e) { return null; } },
  set(k, v, s = localStorage) { try { s.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k, s = localStorage) { try { s.removeItem(k); } catch (e) {} },
};

const CUP = '<svg class="cup" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 12h18v7a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z" fill="#e39b45"/><path d="M23 14h2.5a3.5 3.5 0 0 1 0 7H23" fill="none" stroke="#e39b45" stroke-width="2.4"/><path d="M11 3c-1.5 2 1.5 3 0 6M16 3c-1.5 2 1.5 3 0 6" fill="none" stroke="#f4e7d4" stroke-width="2" stroke-linecap="round"/></svg>';
const LOGO = `<a class="logo" href="/">${CUP}<span>Hoste<b>Quiz</b></span></a>`;

// Imagen de la pregunta (si tiene)
const pic = (d, size = "") => (d.img ? `<div class="qimg ${size}"><img src="${esc(d.img)}" alt=""></div>` : "");
