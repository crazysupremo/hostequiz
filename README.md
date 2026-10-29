# HosteQuiz

Quiz ao vivo de hotelaria (estilo Kahoot), em espanhol.
Um ecrã mostra as perguntas e os jogadores respondem pelo telemóvel com um PIN.

- `/` → entrar numa partida (PIN + nome)
- `/host.html` → criar partida (escolher temas, nº de perguntas e tempo)
- `/practica.html` → praticar sozinho

Não tem dependências: só precisa de Node.js 18 ou mais recente.

## Rodar no computador

```
node server.js
```

Abra http://localhost:3000

## Publicar no Render

1. Envie esta pasta para um repositório no GitHub.
2. No Render: **New → Web Service** → escolha o repositório.
3. Build Command: `echo ok` · Start Command: `node server.js` · Plano: Free.

## Editar as perguntas

Ficheiro `data/preguntas.json`.
Em cada pergunta, a **primeira resposta é a correta** (o jogo baralha a ordem).
Para verdadeiro/falso use `"vf": true` ou `"vf": false`.

```json
{ "c": "cafes", "q": "¿Qué lleva un cortado?", "a": ["Café y un chorrito de leche", "Errada 1", "Errada 2", "Errada 3"] }
```
