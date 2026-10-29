// HosteQuiz — servidor del juego, sin dependencias (solo Node.js)
// Tiempo real con Server-Sent Events (servidor -> móvil) y fetch POST (móvil -> servidor).
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const BANK = require("./data/preguntas.json");
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "public");
const MAX_PLAYERS = 100;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

// ---------- utilidades ----------
const games = new Map(); // pin -> partida
const token = (n = 8) => crypto.randomBytes(n).toString("hex");

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newPin() {
  let pin;
  do pin = String(Math.floor(100000 + Math.random() * 900000));
  while (games.has(pin));
  return pin;
}

// Pregunta del banco -> pregunta de partida (respuestas mezcladas)
function toGameQuestion(p) {
  if (typeof p.vf === "boolean") return { c: p.c, q: p.q, a: ["Verdadero", "Falso"], ok: p.vf ? 0 : 1, vf: true };
  const order = shuffle(p.a.map((_, i) => i));
  return { c: p.c, q: p.q, a: order.map((i) => p.a[i]), ok: order.indexOf(0), vf: false };
}

const cleanName = (s) => String(s || "").replace(/\s+/g, " ").trim().slice(0, 16);

function ranking(game) {
  return [...game.players.values()]
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ id: p.id, name: p.name, score: p.score, rank: i + 1 }));
}

const playerList = (game) => [...game.players.values()].map((p) => ({ id: p.id, name: p.name, online: p.streams.size > 0 }));

function publicQuestion(game) {
  const q = game.questions[game.idx];
  return {
    idx: game.idx,
    total: game.questions.length,
    cat: BANK.categorias[q.c] || "",
    q: q.q,
    a: q.a,
    vf: q.vf,
    time: game.time,
    left: Math.max(0, game.time * 1000 - (Date.now() - game.qStart)),
  };
}

// ---------- envío de eventos (SSE) ----------
function send(res, event, data) {
  try { res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`); } catch (e) {}
}
const toHost = (game, ev, data) => game.hostStreams.forEach((r) => send(r, ev, data));
const toPlayer = (p, ev, data) => p.streams.forEach((r) => send(r, ev, data));
const toAllPlayers = (game, ev, data) => game.players.forEach((p) => toPlayer(p, ev, data));

// ---------- flujo de la partida ----------
function startQuestion(game) {
  clearTimeout(game.timer);
  game.state = "question";
  game.answers = new Map();
  game.qStart = Date.now();
  const pq = publicQuestion(game);
  toHost(game, "question", { ...pq, answered: 0, players: game.players.size });
  toAllPlayers(game, "question", { ...pq, answered: false });
  game.timer = setTimeout(() => reveal(game), game.time * 1000 + 500);
}

function reveal(game) {
  if (game.state !== "question") return;
  clearTimeout(game.timer);
  game.state = "reveal";
  const q = game.questions[game.idx];
  const counts = q.a.map(() => 0);

  for (const p of game.players.values()) {
    const ans = game.answers.get(p.id);
    let pts = 0;
    if (ans) {
      counts[ans.choice]++;
      if (ans.choice === q.ok) {
        p.streak++;
        pts = Math.round(1000 * (1 - ans.ms / (game.time * 1000) / 2)); // más rápido = más puntos
        pts += Math.min(p.streak - 1, 5) * 100; // bonus por racha
      } else p.streak = 0;
    } else p.streak = 0;
    p.score += pts;
    p.last = { answered: !!ans, correct: !!ans && ans.choice === q.ok, pts };
  }

  const rank = ranking(game);
  game.lastReveal = { ...publicQuestion(game), ok: q.ok, counts, answeredCount: game.answers.size, players: game.players.size };
  toHost(game, "reveal", game.lastReveal);
  for (const r of rank) {
    const p = game.players.get(r.id);
    p.lastResult = { ...p.last, score: p.score, rank: r.rank, streak: p.streak, okText: q.a[q.ok], total: rank.length };
    toPlayer(p, "result", p.lastResult);
  }
}

function boardData(game) {
  return { top: ranking(game).slice(0, 5), idx: game.idx, total: game.questions.length };
}

function showBoard(game) {
  game.state = "board";
  toHost(game, "board", boardData(game));
  toAllPlayers(game, "wait", { text: "Mira la clasificación en la pantalla" });
}

function podiumHost(game) {
  const rank = ranking(game);
  return { top: rank.slice(0, 5), total: rank.length };
}
function podiumPlayer(game, p) {
  const rank = ranking(game);
  const me = rank.find((r) => r.id === p.id);
  return { rank: me?.rank, score: p.score, total: rank.length, top: rank.slice(0, 3) };
}

function endGame(game) {
  clearTimeout(game.timer);
  game.state = "end";
  toHost(game, "podium", podiumHost(game));
  game.players.forEach((p) => toPlayer(p, "podium", podiumPlayer(game, p)));
}

function closeGame(game) {
  clearTimeout(game.timer);
  clearTimeout(game.hostGoneTimer);
  toHost(game, "closed", {});
  toAllPlayers(game, "closed", {});
  game.hostStreams.forEach((r) => r.end());
  game.players.forEach((p) => p.streams.forEach((r) => r.end()));
  games.delete(game.pin);
}

// Lo que ve alguien que se (re)conecta
function hostSnapshot(game, res) {
  send(res, "hello", { pin: game.pin, total: game.questions.length, time: game.time, state: game.state });
  send(res, "players", playerList(game));
  if (game.state === "question") send(res, "question", { ...publicQuestion(game), answered: game.answers.size, players: game.players.size });
  if (game.state === "reveal") send(res, "reveal", game.lastReveal);
  if (game.state === "board") send(res, "board", boardData(game));
  if (game.state === "end") send(res, "podium", podiumHost(game));
}

function playerSnapshot(game, p, res) {
  send(res, "hello", { name: p.name, score: p.score, state: game.state });
  if (game.state === "lobby") send(res, "lobby", { name: p.name });
  if (game.state === "question") send(res, "question", { ...publicQuestion(game), answered: game.answers.has(p.id) });
  if (game.state === "reveal") send(res, "result", p.lastResult || { answered: false, correct: false, pts: 0, score: p.score });
  if (game.state === "board") send(res, "wait", { text: "Mira la clasificación en la pantalla" });
  if (game.state === "end") send(res, "podium", podiumPlayer(game, p));
}

// ---------- API ----------
function readBody(req) {
  return new Promise((resolve) => {
    let b = "";
    req.on("data", (c) => { b += c; if (b.length > 1e5) req.destroy(); });
    req.on("end", () => { try { resolve(JSON.parse(b || "{}")); } catch { resolve({}); } });
  });
}

function json(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(data));
}

const api = {
  // El presentador crea la partida
  "POST /api/host/create": async (body) => {
    const cats = Array.isArray(body.cats) ? body.cats.filter((c) => BANK.categorias[c]) : [];
    if (!cats.length) return [400, { error: "Elige al menos una categoría." }];
    const n = Math.min(Math.max(parseInt(body.n) || 10, 3), 60);
    const time = [10, 20, 30, 60].includes(+body.time) ? +body.time : 20;
    const pool = BANK.preguntas.filter((p) => cats.includes(p.c));
    const game = {
      pin: newPin(),
      hostKey: token(12),
      questions: shuffle(pool).slice(0, n).map(toGameQuestion),
      time,
      players: new Map(),
      hostStreams: new Set(),
      state: "lobby",
      idx: -1,
      answers: new Map(),
      created: Date.now(),
      timer: null,
      hostGoneTimer: null,
    };
    games.set(game.pin, game);
    return [200, { pin: game.pin, hostKey: game.hostKey, total: game.questions.length, time }];
  },

  // Botones del presentador
  "POST /api/host/action": async (body) => {
    const game = games.get(String(body.pin));
    if (!game || game.hostKey !== body.key) return [404, { error: "La partida ya no existe." }];
    switch (body.action) {
      case "start":
        if (game.state === "lobby" && game.players.size) { game.idx = 0; startQuestion(game); }
        break;
      case "skip":
        reveal(game);
        break;
      case "next":
        if (game.state === "reveal") showBoard(game);
        else if (game.state === "board") {
          if (game.idx + 1 < game.questions.length) { game.idx++; startQuestion(game); }
          else endGame(game);
        }
        break;
      case "kick": {
        const p = game.players.get(body.id);
        if (p) { toPlayer(p, "kicked", {}); p.streams.forEach((r) => r.end()); game.players.delete(p.id); }
        toHost(game, "players", playerList(game));
        break;
      }
      case "end":
        closeGame(game);
        break;
    }
    return [200, { ok: true }];
  },

  // Un jugador entra (o vuelve)
  "POST /api/join": async (body) => {
    const game = games.get(String(body.pin || "").trim());
    if (!game) return [404, { error: "No hay ninguna partida con ese PIN." }];
    if (body.id && game.players.has(body.id)) return [200, { id: body.id, name: game.players.get(body.id).name }];
    const nm = cleanName(body.name);
    if (!nm) return [400, { error: "Escribe tu nombre." }];
    if (game.state === "end") return [400, { error: "Esta partida ya ha terminado." }];
    if ([...game.players.values()].some((p) => p.name.toLowerCase() === nm.toLowerCase()))
      return [400, { error: "Ese nombre ya está en uso. Prueba otro." }];
    if (game.players.size >= MAX_PLAYERS) return [400, { error: "La partida está llena." }];
    const p = { id: token(10), name: nm, score: 0, streak: 0, streams: new Set(), last: null, lastResult: null, goneTimer: null };
    game.players.set(p.id, p);
    toHost(game, "players", playerList(game));
    return [200, { id: p.id, name: nm }];
  },

  "POST /api/answer": async (body) => {
    const game = games.get(String(body.pin));
    const p = game?.players.get(body.id);
    if (!p) return [404, { error: "No estás en esta partida." }];
    if (game.state !== "question") return [409, { error: "Se acabó el tiempo." }];
    if (game.answers.has(p.id)) return [200, { ok: true }];
    const q = game.questions[game.idx];
    const c = parseInt(body.choice);
    if (!(c >= 0 && c < q.a.length)) return [400, { error: "Respuesta no válida." }];
    game.answers.set(p.id, { choice: c, ms: Math.min(game.time * 1000, Date.now() - game.qStart) });
    toHost(game, "answered", { answered: game.answers.size, players: game.players.size });
    const online = [...game.players.values()].filter((x) => x.streams.size > 0);
    if (online.length && online.every((x) => game.answers.has(x.id))) setTimeout(() => reveal(game), 400);
    return [200, { ok: true }];
  },
};

// Conexión en tiempo real
function openStream(req, res, url) {
  const game = games.get(url.searchParams.get("pin") || "");
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.write("retry: 2000\n\n");
  if (!game) { send(res, "closed", {}); return res.end(); }

  const role = url.searchParams.get("role");
  if (role === "host") {
    if (url.searchParams.get("key") !== game.hostKey) { send(res, "closed", {}); return res.end(); }
    clearTimeout(game.hostGoneTimer);
    game.hostStreams.add(res);
    hostSnapshot(game, res);
    req.on("close", () => {
      game.hostStreams.delete(res);
      if (!game.hostStreams.size)
        game.hostGoneTimer = setTimeout(() => games.has(game.pin) && closeGame(game), 5 * 60 * 1000); // 5 min para volver
    });
    return;
  }

  const p = game.players.get(url.searchParams.get("id") || "");
  if (!p) { send(res, "gone", {}); return res.end(); }
  clearTimeout(p.goneTimer);
  p.streams.add(res);
  playerSnapshot(game, p, res);
  toHost(game, "players", playerList(game));
  req.on("close", () => {
    p.streams.delete(res);
    if (p.streams.size) return;
    toHost(game, "players", playerList(game));
    // En la sala de espera, si no vuelve en 60 s, sale de la lista
    if (game.state === "lobby")
      p.goneTimer = setTimeout(() => {
        if (!p.streams.size && game.state === "lobby" && game.players.delete(p.id)) toHost(game, "players", playerList(game));
      }, 60 * 1000);
  });
}

// Latido para que Render no corte las conexiones abiertas
setInterval(() => {
  for (const g of games.values()) {
    g.hostStreams.forEach((r) => { try { r.write(": ping\n\n"); } catch (e) {} });
    g.players.forEach((p) => p.streams.forEach((r) => { try { r.write(": ping\n\n"); } catch (e) {} }));
  }
}, 20 * 1000);

// Borra partidas de más de 4 horas
setInterval(() => {
  const limit = Date.now() - 4 * 60 * 60 * 1000;
  for (const g of games.values()) if (g.created < limit) closeGame(g);
}, 10 * 60 * 1000);

// ---------- servidor HTTP ----------
function serveStatic(res, pathname) {
  if (pathname === "/") pathname = "/index.html";
  const file = path.normalize(path.join(PUBLIC, decodeURIComponent(pathname)));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Página no encontrada");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  try {
    if (req.method === "GET" && url.pathname === "/health") return json(res, 200, { ok: true, partidas: games.size });
    if (req.method === "GET" && url.pathname === "/events") return openStream(req, res, url);
    if (req.method === "GET" && url.pathname === "/api/categorias") {
      return json(res, 200, Object.entries(BANK.categorias).map(([id, nombre]) => ({
        id, nombre, total: BANK.preguntas.filter((p) => p.c === id).length,
      })));
    }
    if (req.method === "GET" && url.pathname === "/api/preguntas") return json(res, 200, BANK);
    const handler = api[`${req.method} ${url.pathname}`];
    if (handler) {
      const [code, data] = await handler(await readBody(req));
      return json(res, code, data);
    }
    if (req.method === "GET") return serveStatic(res, url.pathname);
    res.writeHead(405); res.end();
  } catch (e) {
    console.error(e);
    json(res, 500, { error: "Error del servidor" });
  }
});

server.listen(PORT, () => console.log(`HosteQuiz en http://localhost:${PORT}`));
