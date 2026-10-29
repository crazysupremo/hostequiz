# HosteQuiz

Quiz ao vivo de hotelaria (estilo Kahoot), em espanhol.
Um ecrã mostra as perguntas e os jogadores respondem pelo telemóvel com um PIN.

- `/` → entrar numa partida (PIN + nome)
- `/host.html` → criar partida (escolher temas, nº de perguntas e tempo)
- `/practica.html` → praticar sozinho
- `/crear.html` → criar o seu próprio quiz, com ideias da IA

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

## IA para criar perguntas

A IA fica integrada no app: a pessoa escreve o tema e toca em **Generar preguntas**.

Para ativar, no Render → o seu serviço → **Environment** → **Add Environment Variable**:
- `GROQ_API_KEY` = chave grátis de https://console.groq.com (sem cartão). **Recomendada.**
- `GEMINI_API_KEY` = (opcional) chave do Google AI Studio. Atenção: as regras do Google só
  permitem o plano **pago** em apps usados por pessoas na União Europeia.

O app tenta por esta ordem: Groq (2 modelos) → Gemini → Anthropic. Se uma IA falhar ou chegar
ao limite, passa sozinho para a seguinte.

Sem nenhuma chave, o app mostra o modo manual (copiar o pedido e colar no ChatGPT/Gemini/Claude).

Cada pessoa pode pedir no máximo 15 gerações por hora (variável `AI_LIMIT_PER_HOUR`).
Os quizzes criados ficam guardados no telemóvel/computador de quem os criou.
