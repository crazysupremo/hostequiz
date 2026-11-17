// HosteQuiz — utilidades compartidas: idiomas, sonido, confeti, red

// ============ IDIOMAS ============
const LANG_NAMES = { es: "Español", pt: "Português", en: "English" };

const I18N = {
  es: {
    courseHost: "Hostelería", courseHostDesc: "Cafés, bebidas, sala y cocina", courseEso: "Graduado en ESO", courseEsoDesc: "Prueba libre para mayores de 18 · Castilla y León",
    esoLabel: "Prueba libre · Castilla y León", esoH1: "Prepara el Graduado en ESO", esoIntro: "Elige una materia y practica con el tiempo del examen.",
    esoPractice: "Practicar una materia", esoAll: "Examen mezclado", esoAllDesc: "30 preguntas al azar de todas las materias", nQ: "{n} preguntas", perQ: "{t} por pregunta",
    esoClass: "¿Estás en clase?", esoClassDesc: "Escribe el PIN que ves en la pantalla del profesor.", esoTeacher: "¿Eres profesor?", esoTeacherDesc: "Crea una partida y tus alumnos entran con el móvil.", esoCreate: "Crear partida para la clase",
    goEso: "Graduado en ESO", goEsoDesc: "Matemáticas, lengua, inglés, ciencias y sociales para la prueba libre", goHost: "Hostelería",
    timeUp: "⏰ ¡Se acabó el tiempo!", leave: "Salir", subjects: "Materias", subjectsHint: "Cada materia tiene su tiempo por pregunta.", timeBySubject: "Según la materia (recomendado)",
    esoTagline: "Prepara el Graduado en ESO.", esoLead: "Matemáticas, ciencias, lengua, inglés y sociales, con preguntas basadas en las pruebas libres de Castilla y León. Cada uno a su ritmo.",
    timeAuto: "Automático según la materia", autoHint: "Matemáticas {m} · Ciencias {c} · Lengua y Sociales {l} · Inglés {i} por pregunta", minutes: "{n} min",
    esoNote: "Preguntas tipo test basadas en las pruebas libres de Castilla y León (2025-2026). La prueba real tiene preguntas abiertas.",
    modeTitle: "Modo de juego", modeSolo: "Cada alumno, preguntas diferentes", modeSoloDesc: "Cada uno responde en su móvil a su ritmo. Nadie tiene la misma pregunta que su compañero.",
    modeSame: "Todos la misma pregunta", modeSameDesc: "Las preguntas salen en esta pantalla, como en Kahoot.",
    perPlayer: "{n} preguntas por alumno", race: "Carrera en directo", finishBtn: "Terminar y ver el podio", finished: "terminado",
    doneTitle: "¡Has terminado!", waitOthers: "Espera a que terminen los demás.", hitsOf: "{a} de {b} aciertos", nextComing: "Siguiente pregunta…",
    news: "Novedades", version: "Versión", newsTitle: "Qué hay de nuevo",
    tagline: "El quiz de la barra, la sala y la cocina.",
    lead: "Cafés, bebidas, copas, montaje de mesas y servicio. Una pantalla hace las preguntas y todos responden desde el móvil.",
    createGame: "Crear una partida", practice: "Practicar solo", createAI: "Crear quiz con IA",
    joinTitle: "Entrar en una partida", pinLabel: "PIN del juego", nameLabel: "Tu nombre", namePh: "Ej.: Renato", enter: "Entrar",
    foot: "HosteQuiz · hostelería en 3 idiomas", connecting: "Conectando…",
    inGame: "Ya estás dentro", findName: "Busca tu nombre en la pantalla. El juego empieza enseguida.",
    getReady: "¡Prepárate!", question: "Pregunta", of: "de", sent: "Respuesta enviada", waitTime: "Espera a que se acabe el tiempo.", guess: "¿Habrás acertado?",
    noAnswer: "Sin respuesta", correct: "¡Correcto!", wrong: "Incorrecto", rightWas: "La correcta era:", rightIs: "La correcta es:",
    streak: "Racha de {n} aciertos", points: "puntos", pts: "pts", youAre: "Vas {r}º de {t}",
    lookScreen: "Mira la clasificación en la pantalla",
    won: "¡Has ganado!", podiumYou: "¡Estás en el podio!", wellPlayed: "¡Bien jugado!", gameOver: "Fin de la partida", place: "Puesto {r}º de {t}", backHome: "Volver al inicio",
    kicked: "El presentador te ha sacado de la partida.", gone: "Ya no estás en esta partida. Vuelve a entrar con el PIN.", closed: "La partida ha terminado.",
    newGame: "Nueva partida", topics: "Temas", allNone: "Todos / ninguno", myQuizzes: "Mis quizzes", createOther: "Crear otro",
    wantOwn: "¿Quieres tus propias preguntas?", wantOwnLink: "Crea un quiz con ayuda de la IA",
    level: "Nivel", all: "Todos", lv1: "Fácil", lv2: "Medio", lv3: "Difícil",
    nQuestions: "Número de preguntas", allQ: "Todas", timePerQ: "Tiempo por pregunta", seconds: "{n} segundos",
    available: "{n} preguntas disponibles en lo que has elegido.", chooseOne: "Elige al menos un tema o un quiz tuyo.",
    createBtn: "Crear partida", endGame: "Terminar partida", sure: "¿Seguro? Pulsa otra vez",
    joinAt: "Entra en", withPin: "con el PIN", qCount: "{n} preguntas", scanQR: "o escanea el código con la cámara",
    langHint: "Cada jugador puede elegir su idioma en el móvil.",
    players: "Jugadores", player1: "jugador", playersN: "jugadores", waitingFirst: "Esperando al primer jugador…", start: "Empezar", kick: "Sacar a {n}",
    answers: "respuestas", answered: "respondieron", showNow: "Ver respuesta ya", leaderboard: "Clasificación", nextQ: "Siguiente pregunta", seePodium: "Ver el podio",
    nobody: "Nadie ha jugado.", congrats: "¡Enhorabuena!", sound: "Sonido",
    practiceTitle: "Practicar solo", practiceLead: "Responde a tu ritmo. Después de cada pregunta ves la respuesta correcta.",
    whatReview: "¿Qué quieres repasar?", createMine: "Crear mi quiz con IA", noLevelQ: "No hay preguntas con ese nivel",
    hits: "aciertos", next: "Siguiente", seeResult: "Ver resultado", result: "Resultado", xOfY: "{a} de {b}",
    master: "¡Lo dominas!", good: "Muy bien, sigue así.", review: "Repasa los fallos y vuelve a intentarlo.",
    redo: "Repasar mis {n} fallos", otherTopics: "Elegir otros temas", loadFail: "No se han podido cargar las preguntas.", reload: "Recarga la página.",
    createTitle: "Crea tu propio quiz", createLead: "Escribe tus preguntas o pide ideas a la IA. Después puedes jugarlo con tus compañeros o practicarlo solo.",
    newQuiz: "Nuevo quiz", noneYet: "Todavía no has creado ninguno. Se guardan en este móvil u ordenador.", qShort: "preguntas",
    play: "Jugar", practiceBtn: "Practicar", edit: "Editar", del: "Borrar", sureShort: "¿Seguro?", deleted: "Quiz borrado",
    quizName: "Nombre del quiz", quizNamePh: "Ej.: Cafés del bar", askAI: "Pedir ideas a la IA", aboutWhat: "¿Sobre qué quieres preguntas?",
    temaPh: "Ej.: cafés con alcohol: carajillo, irlandés, jamaicano…", withTricks: "Con trampas", generate: "Generar preguntas", thinking: "Pensando…",
    aiLang: "Las preguntas se crean en tu idioma.", aiMayErr: "La IA puede equivocarse: revisa las respuestas antes de guardar.",
    freeTitle: "Gratis con tu IA favorita", freeAlt: "¿Prefieres hacerlo gratis con tu propia IA?", step1: "Copia el pedido:", copyAsk: "Copiar pedido",
    step2: "Pégalo en una IA gratis y envíalo:", step3: "Copia toda la respuesta y pégala aquí:", respPh: 'Pega aquí la respuesta (empieza por {"preguntas": …)', addQs: "Añadir preguntas",
    addManual: "+ Añadir pregunta a mano", saveQuiz: "Guardar quiz", qN: "Pregunta {n}", remove: "Quitar", writeQ: "Escribe la pregunta",
    correctLbl: "Correcta", answerPh: "Respuesta", answerOpt: "Respuesta (opcional)", noImg: "Sin imagen",
    errTemaFirst: "Primero escribe de qué tema quieres las preguntas.", copied: "Pedido copiado. Ahora pégalo en la IA.", selectCopy: "Selecciona el texto y cópialo.",
    errNotUnderstood: 'No entiendo esa respuesta. Copia TODO lo que escribió la IA (debe empezar por {"preguntas").', errNoValid: "La respuesta no tiene preguntas válidas. Pide a la IA que lo intente otra vez.",
    added: "{n} preguntas añadidas. Revísalas.", errName: "Ponle un nombre al quiz.", errQText: "Falta el texto de la pregunta {n}.",
    errQCorrect: "En la pregunta {n}, la respuesta marcada como correcta está vacía.", errQWrong: "La pregunta {n} necesita al menos una respuesta incorrecta.",
    errQDup: "La pregunta {n} tiene respuestas repetidas.", errAddOne: "Añade al menos una pregunta.", saved: "Quiz guardado", backList: "Mis quizzes",
    ideas: ["Cafés con alcohol", "Servicio del vino", "Cócteles clásicos", "Tipos de cerveza", "Atención al cliente", "Alérgenos", "Tapas españolas", "Cubiertos y su uso"],
    cats: { cafes: "Cafés", tes: "Tés, infusiones y cacao", bebidas: "Bebidas y su servicio", vinos: "Vinos y bodega", cocteleria: "Coctelería y destilados", cliente: "Atención al cliente", matematicas: "Matemáticas", ciencias: "Ciencias y Tecnología", lengua: "Lengua castellana y literatura", ingles: "Inglés", social: "Ámbito social", cristaleria: "Vasos y copas", montaje: "Montaje y mise en place", servicio: "Servicio en sala", cocina: "Cocina y menú del día", higiene: "Higiene y seguridad", vocabulario: "Vocabulario de hostelería" },
    errors: {},
  },
  pt: {
    courseHost: "Hotelaria", courseHostDesc: "Cafés, bebidas, sala e cozinha", courseEso: "Graduado em ESO", courseEsoDesc: "Prova livre para maiores de 18 · Castilla y León",
    esoTagline: "Prepara o Graduado em ESO.", esoLead: "Matemática, ciências, língua, inglês e sociais, com perguntas baseadas nas provas livres de Castilla y León. Cada um ao seu ritmo.",
    timeAuto: "Automático conforme a matéria", autoHint: "Matemática {m} · Ciências {c} · Língua e Sociais {l} · Inglês {i} por pergunta", minutes: "{n} min",
    esoNote: "Perguntas de escolha múltipla baseadas nas provas livres de Castilla y León (2025-2026). A prova real tem perguntas abertas.",
    modeTitle: "Modo de jogo", modeSolo: "Cada aluno, perguntas diferentes", modeSoloDesc: "Cada um responde no telemóvel ao seu ritmo. Ninguém tem a mesma pergunta do colega.",
    modeSame: "Todos a mesma pergunta", modeSameDesc: "As perguntas aparecem neste ecrã, como no Kahoot.",
    perPlayer: "{n} perguntas por aluno", race: "Corrida ao vivo", finishBtn: "Terminar e ver o pódio", finished: "terminou",
    doneTitle: "Terminaste!", waitOthers: "Espera que os outros terminem.", hitsOf: "{a} de {b} certas", nextComing: "Próxima pergunta…",
    news: "Novidades", version: "Versão", newsTitle: "O que há de novo",
    tagline: "O quiz do balcão, da sala e da cozinha.",
    lead: "Cafés, bebidas, copos, montagem de mesas e serviço. Um ecrã faz as perguntas e todos respondem pelo telemóvel.",
    createGame: "Criar uma partida", practice: "Praticar sozinho", createAI: "Criar quiz com IA",
    joinTitle: "Entrar numa partida", pinLabel: "PIN do jogo", nameLabel: "O teu nome", namePh: "Ex.: Renato", enter: "Entrar",
    foot: "HosteQuiz · hotelaria em 3 idiomas", connecting: "A ligar…",
    inGame: "Já estás dentro", findName: "Procura o teu nome no ecrã. O jogo começa já.",
    getReady: "Prepara-te!", question: "Pergunta", of: "de", sent: "Resposta enviada", waitTime: "Espera que o tempo acabe.", guess: "Será que acertaste?",
    noAnswer: "Sem resposta", correct: "Certo!", wrong: "Errado", rightWas: "A certa era:", rightIs: "A certa é:",
    streak: "Sequência de {n} acertos", points: "pontos", pts: "pts", youAre: "Estás em {r}º de {t}",
    lookScreen: "Vê a classificação no ecrã",
    won: "Ganhaste!", podiumYou: "Estás no pódio!", wellPlayed: "Bem jogado!", gameOver: "Fim da partida", place: "Lugar {r}º de {t}", backHome: "Voltar ao início",
    kicked: "O apresentador tirou-te da partida.", gone: "Já não estás nesta partida. Volta a entrar com o PIN.", closed: "A partida terminou.",
    newGame: "Nova partida", topics: "Temas", allNone: "Todos / nenhum", myQuizzes: "Os meus quizzes", createOther: "Criar outro",
    wantOwn: "Queres as tuas próprias perguntas?", wantOwnLink: "Cria um quiz com a ajuda da IA",
    level: "Nível", all: "Todos", lv1: "Fácil", lv2: "Médio", lv3: "Difícil",
    nQuestions: "Número de perguntas", allQ: "Todas", timePerQ: "Tempo por pergunta", seconds: "{n} segundos",
    available: "{n} perguntas disponíveis no que escolheste.", chooseOne: "Escolhe pelo menos um tema ou um quiz teu.",
    createBtn: "Criar partida", endGame: "Terminar partida", sure: "Tens a certeza? Carrega outra vez",
    joinAt: "Entra em", withPin: "com o PIN", qCount: "{n} perguntas", scanQR: "ou lê o código com a câmara",
    langHint: "Cada jogador pode escolher o idioma no telemóvel.",
    players: "Jogadores", player1: "jogador", playersN: "jogadores", waitingFirst: "À espera do primeiro jogador…", start: "Começar", kick: "Tirar {n}",
    answers: "respostas", answered: "responderam", showNow: "Ver resposta já", leaderboard: "Classificação", nextQ: "Próxima pergunta", seePodium: "Ver o pódio",
    nobody: "Ninguém jogou.", congrats: "Parabéns!", sound: "Som",
    practiceTitle: "Praticar sozinho", practiceLead: "Responde ao teu ritmo. Depois de cada pergunta vês a resposta certa.",
    whatReview: "O que queres rever?", createMine: "Criar o meu quiz com IA", noLevelQ: "Não há perguntas com esse nível",
    hits: "acertos", next: "Seguinte", seeResult: "Ver resultado", result: "Resultado", xOfY: "{a} de {b}",
    master: "Dominas isto!", good: "Muito bem, continua assim.", review: "Revê os erros e tenta outra vez.",
    redo: "Rever os meus {n} erros", otherTopics: "Escolher outros temas", loadFail: "Não foi possível carregar as perguntas.", reload: "Recarrega a página.",
    createTitle: "Cria o teu próprio quiz", createLead: "Escreve as tuas perguntas ou pede ideias à IA. Depois podes jogá-lo com os colegas ou praticar sozinho.",
    newQuiz: "Novo quiz", noneYet: "Ainda não criaste nenhum. Ficam guardados neste telemóvel ou computador.", qShort: "perguntas",
    play: "Jogar", practiceBtn: "Praticar", edit: "Editar", del: "Apagar", sureShort: "Certeza?", deleted: "Quiz apagado",
    quizName: "Nome do quiz", quizNamePh: "Ex.: Cafés do bar", askAI: "Pedir ideias à IA", aboutWhat: "Sobre o que queres perguntas?",
    temaPh: "Ex.: cafés com álcool: carajillo, irlandês, jamaicano…", withTricks: "Com rasteiras", generate: "Gerar perguntas", thinking: "A pensar…",
    aiLang: "As perguntas são criadas no teu idioma.", aiMayErr: "A IA pode enganar-se: revê as respostas antes de guardar.",
    freeTitle: "Grátis com a tua IA favorita", freeAlt: "Preferes fazer grátis com a tua própria IA?", step1: "Copia o pedido:", copyAsk: "Copiar pedido",
    step2: "Cola numa IA grátis e envia:", step3: "Copia a resposta toda e cola aqui:", respPh: 'Cola aqui a resposta (começa por {"preguntas": …)', addQs: "Adicionar perguntas",
    addManual: "+ Adicionar pergunta à mão", saveQuiz: "Guardar quiz", qN: "Pergunta {n}", remove: "Tirar", writeQ: "Escreve a pergunta",
    correctLbl: "Certa", answerPh: "Resposta", answerOpt: "Resposta (opcional)", noImg: "Sem imagem",
    errTemaFirst: "Primeiro escreve o tema das perguntas.", copied: "Pedido copiado. Agora cola na IA.", selectCopy: "Seleciona o texto e copia.",
    errNotUnderstood: 'Não percebo essa resposta. Copia TUDO o que a IA escreveu (deve começar por {"preguntas").', errNoValid: "A resposta não tem perguntas válidas. Pede à IA para tentar outra vez.",
    added: "{n} perguntas adicionadas. Revê-as.", errName: "Dá um nome ao quiz.", errQText: "Falta o texto da pergunta {n}.",
    errQCorrect: "Na pergunta {n}, a resposta marcada como certa está vazia.", errQWrong: "A pergunta {n} precisa de pelo menos uma resposta errada.",
    errQDup: "A pergunta {n} tem respostas repetidas.", errAddOne: "Adiciona pelo menos uma pergunta.", saved: "Quiz guardado", backList: "Os meus quizzes",
    ideas: ["Cafés com álcool", "Serviço do vinho", "Cocktails clássicos", "Tipos de cerveja", "Atendimento ao cliente", "Alergénios", "Tapas espanholas", "Talheres e o seu uso"],
    cats: { cafes: "Cafés", tes: "Chás, infusões e cacau", bebidas: "Bebidas e o seu serviço", vinos: "Vinhos e adega", cocteleria: "Coquetelaria e destilados", cliente: "Atendimento ao cliente", matematicas: "Matemática", ciencias: "Ciências e Tecnologia", lengua: "Língua espanhola e literatura", ingles: "Inglês", social: "Âmbito social", cristaleria: "Copos e taças", montaje: "Montagem e mise en place", servicio: "Serviço de sala", cocina: "Cozinha e menu do dia", higiene: "Higiene e segurança", vocabulario: "Vocabulário de hotelaria" },
    errors: {
      "Elige al menos un tema o uno de tus quizzes.": "Escolhe pelo menos um tema ou um quiz teu.",
      "No hay preguntas con esos temas y niveles. Elige otro nivel.": "Não há perguntas com esses temas e níveis. Escolhe outro nível.",
      "La partida ya no existe.": "A partida já não existe.", "No hay ninguna partida con ese PIN.": "Não há nenhuma partida com esse PIN.",
      "Escribe tu nombre.": "Escreve o teu nome.", "Esta partida ya ha terminado.": "Esta partida já terminou.",
      "Ese nombre ya está en uso. Prueba otro.": "Esse nome já está a ser usado. Experimenta outro.", "La partida está llena.": "A partida está cheia.",
      "No estás en esta partida.": "Não estás nesta partida.", "Se acabó el tiempo.": "Acabou o tempo.",
      "Escribe de qué tema quieres las preguntas.": "Escreve o tema das perguntas.",
      "Has pedido muchas preguntas seguidas. Espera un rato y vuelve a probar.": "Pediste muitas perguntas seguidas. Espera um pouco e tenta outra vez.",
      "La IA gratuita ha llegado a su límite por ahora. Prueba dentro de unos minutos.": "A IA grátis chegou ao limite por agora. Tenta daqui a uns minutos.",
      "La IA no ha respondido bien. Prueba otra vez o escribe el tema de otra forma.": "A IA não respondeu bem. Tenta outra vez ou escreve o tema de outra forma.",
      net: "Não foi possível ligar. Tenta outra vez.",
    },
  },
  en: {
    courseHost: "Hospitality", courseHostDesc: "Coffee, drinks, floor and kitchen", courseEso: "ESO diploma", courseEsoDesc: "Open exam for over-18s · Castilla y León",
    esoTagline: "Prepare for the ESO diploma.", esoLead: "Maths, science, Spanish, English and social studies, with questions based on the Castilla y León open exams. Everyone at their own pace.",
    timeAuto: "Automatic by subject", autoHint: "Maths {m} · Science {c} · Spanish and Social {l} · English {i} per question", minutes: "{n} min",
    esoNote: "Multiple-choice questions based on the Castilla y León open exams (2025-2026). The real exam has open questions.",
    modeTitle: "Game mode", modeSolo: "Different questions for each student", modeSoloDesc: "Everyone answers on their phone at their own pace. No two students get the same question.",
    modeSame: "Everyone gets the same question", modeSameDesc: "Questions appear on this screen, like Kahoot.",
    perPlayer: "{n} questions per student", race: "Live race", finishBtn: "Finish and see the podium", finished: "finished",
    doneTitle: "You've finished!", waitOthers: "Wait for the others to finish.", hitsOf: "{a} of {b} correct", nextComing: "Next question…",
    news: "What's new", version: "Version", newsTitle: "What's new",
    tagline: "The quiz for the bar, the floor and the kitchen.",
    lead: "Coffees, drinks, glassware, table setting and service. One screen asks the questions and everyone answers on their phone.",
    createGame: "Host a game", practice: "Practise alone", createAI: "Create a quiz with AI",
    joinTitle: "Join a game", pinLabel: "Game PIN", nameLabel: "Your name", namePh: "e.g. Renato", enter: "Join",
    foot: "HosteQuiz · hospitality in 3 languages", connecting: "Connecting…",
    inGame: "You're in", findName: "Look for your name on the screen. The game starts soon.",
    getReady: "Get ready!", question: "Question", of: "of", sent: "Answer sent", waitTime: "Wait for the time to run out.", guess: "Did you get it right?",
    noAnswer: "No answer", correct: "Correct!", wrong: "Wrong", rightWas: "The right answer was:", rightIs: "The right answer is:",
    streak: "{n} in a row", points: "points", pts: "pts", youAre: "You're {r} of {t}",
    lookScreen: "Look at the leaderboard on the screen",
    won: "You won!", podiumYou: "You're on the podium!", wellPlayed: "Well played!", gameOver: "Game over", place: "Place {r} of {t}", backHome: "Back to start",
    kicked: "The host removed you from the game.", gone: "You're no longer in this game. Join again with the PIN.", closed: "The game has ended.",
    newGame: "New game", topics: "Topics", allNone: "All / none", myQuizzes: "My quizzes", createOther: "Create another",
    wantOwn: "Want your own questions?", wantOwnLink: "Create a quiz with help from AI",
    level: "Level", all: "All", lv1: "Easy", lv2: "Medium", lv3: "Hard",
    nQuestions: "Number of questions", allQ: "All", timePerQ: "Time per question", seconds: "{n} seconds",
    available: "{n} questions available in your selection.", chooseOne: "Choose at least one topic or one of your quizzes.",
    createBtn: "Create game", endGame: "End game", sure: "Sure? Tap again",
    joinAt: "Go to", withPin: "and enter the PIN", qCount: "{n} questions", scanQR: "or scan the code with your camera",
    langHint: "Each player can choose their language on their phone.",
    players: "Players", player1: "player", playersN: "players", waitingFirst: "Waiting for the first player…", start: "Start", kick: "Remove {n}",
    answers: "answers", answered: "answered", showNow: "Show answer now", leaderboard: "Leaderboard", nextQ: "Next question", seePodium: "See the podium",
    nobody: "Nobody played.", congrats: "Congratulations!", sound: "Sound",
    practiceTitle: "Practise alone", practiceLead: "Answer at your own pace. After each question you see the right answer.",
    whatReview: "What do you want to revise?", createMine: "Create my quiz with AI", noLevelQ: "No questions at that level",
    hits: "correct", next: "Next", seeResult: "See result", result: "Result", xOfY: "{a} of {b}",
    master: "You've mastered it!", good: "Well done, keep going.", review: "Go over your mistakes and try again.",
    redo: "Revise my {n} mistakes", otherTopics: "Choose other topics", loadFail: "The questions couldn't be loaded.", reload: "Reload the page.",
    createTitle: "Create your own quiz", createLead: "Write your questions or ask the AI for ideas. Then play it with your team or practise alone.",
    newQuiz: "New quiz", noneYet: "You haven't created any yet. They're saved on this phone or computer.", qShort: "questions",
    play: "Play", practiceBtn: "Practise", edit: "Edit", del: "Delete", sureShort: "Sure?", deleted: "Quiz deleted",
    quizName: "Quiz name", quizNamePh: "e.g. Bar coffees", askAI: "Ask the AI for ideas", aboutWhat: "What do you want questions about?",
    temaPh: "e.g. coffees with alcohol: carajillo, Irish, Jamaican…", withTricks: "With trick questions", generate: "Generate questions", thinking: "Thinking…",
    aiLang: "Questions are created in your language.", aiMayErr: "AI can make mistakes: check the answers before saving.",
    freeTitle: "Free with your favourite AI", freeAlt: "Prefer to do it free with your own AI?", step1: "Copy the request:", copyAsk: "Copy request",
    step2: "Paste it into a free AI and send it:", step3: "Copy the whole reply and paste it here:", respPh: 'Paste the reply here (it starts with {"preguntas": …)', addQs: "Add questions",
    addManual: "+ Add a question by hand", saveQuiz: "Save quiz", qN: "Question {n}", remove: "Remove", writeQ: "Write the question",
    correctLbl: "Correct", answerPh: "Answer", answerOpt: "Answer (optional)", noImg: "No image",
    errTemaFirst: "First write what topic you want questions about.", copied: "Request copied. Now paste it into the AI.", selectCopy: "Select the text and copy it.",
    errNotUnderstood: 'I can\'t read that reply. Copy EVERYTHING the AI wrote (it should start with {"preguntas").', errNoValid: "The reply has no valid questions. Ask the AI to try again.",
    added: "{n} questions added. Check them.", errName: "Give the quiz a name.", errQText: "Question {n} has no text.",
    errQCorrect: "In question {n}, the answer marked as correct is empty.", errQWrong: "Question {n} needs at least one wrong answer.",
    errQDup: "Question {n} has repeated answers.", errAddOne: "Add at least one question.", saved: "Quiz saved", backList: "My quizzes",
    ideas: ["Coffees with alcohol", "Wine service", "Classic cocktails", "Types of beer", "Customer service", "Allergens", "Spanish tapas", "Cutlery and its use"],
    cats: { cafes: "Coffees", tes: "Teas, infusions and cocoa", bebidas: "Drinks and how to serve them", vinos: "Wine and cellar", cocteleria: "Cocktails and spirits", cliente: "Customer service", matematicas: "Maths", ciencias: "Science and Technology", lengua: "Spanish language and literature", ingles: "English", social: "Social studies", cristaleria: "Glassware", montaje: "Table setting and mise en place", servicio: "Floor service", cocina: "Kitchen and set menu", higiene: "Hygiene and safety", vocabulario: "Hospitality vocabulary" },
    errors: {
      "Elige al menos un tema o uno de tus quizzes.": "Choose at least one topic or one of your quizzes.",
      "No hay preguntas con esos temas y niveles. Elige otro nivel.": "No questions with those topics and levels. Choose another level.",
      "La partida ya no existe.": "This game no longer exists.", "No hay ninguna partida con ese PIN.": "There's no game with that PIN.",
      "Escribe tu nombre.": "Write your name.", "Esta partida ya ha terminado.": "This game has already ended.",
      "Ese nombre ya está en uso. Prueba otro.": "That name is taken. Try another one.", "La partida está llena.": "The game is full.",
      "No estás en esta partida.": "You're not in this game.", "Se acabó el tiempo.": "Time's up.",
      "Escribe de qué tema quieres las preguntas.": "Write what topic you want questions about.",
      "Has pedido muchas preguntas seguidas. Espera un rato y vuelve a probar.": "You've asked for a lot of questions in a row. Wait a while and try again.",
      "La IA gratuita ha llegado a su límite por ahora. Prueba dentro de unos minutos.": "The free AI has reached its limit for now. Try again in a few minutes.",
      "La IA no ha respondido bien. Prueba otra vez o escribe el tema de otra forma.": "The AI didn't answer properly. Try again or describe the topic differently.",
      net: "Couldn't connect. Try again.",
    },
  },
};
I18N.es.errors.net = "No se ha podido conectar. Inténtalo otra vez.";

function detectLang() {
  try { const s = localStorage.getItem("hq-lang"); if (s && I18N[s]) return s; } catch (e) {}
  for (const l of navigator.languages || [navigator.language || "es"]) {
    const k = String(l).slice(0, 2).toLowerCase();
    if (I18N[k]) return k;
  }
  return "es";
}
let LANG = detectLang();
let onLangChange = null; // cada página pone aquí su función de redibujar

function t(key, vars) {
  let s = I18N[LANG][key] ?? I18N.es[key] ?? key;
  if (vars && typeof s === "string") for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}
const catName = (id, fallback) => I18N[LANG].cats[id] || I18N.es.cats[id] || fallback || "";
const lvName = (n) => (n ? t("lv" + n) : "");
// Pregunta en el idioma de quien mira (si no hay traducción, en español)
const loc = (d) => (d && d.tr && (d.tr[LANG] || d.tr.es)) || d;

function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = "ltr";
}
function setLang(l) {
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem("hq-lang", l); } catch (e) {}
  applyLang();
  if (onLangChange) onLangChange();
}
applyLang();

// Botón de idioma (se pone en la cabecera de cada pantalla)
const GLOBE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 12h19M12 2.5c3 3.2 3 15.8 0 19M12 2.5c-3 3.2-3 15.8 0 19" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
function langBtn() {
  return `<div class="langwrap"><button class="langbtn" type="button" aria-haspopup="true" aria-expanded="false" onclick="toggleLangMenu(this)">${GLOBE}<span>${LANG.toUpperCase()}</span></button>
    <div class="langmenu" hidden>${Object.entries(LANG_NAMES).map(([k, n]) => `<button type="button" class="${k === LANG ? "on" : ""}" lang="${k}" onclick="setLang('${k}')">${n}</button>`).join("")}</div></div>`;
}
function toggleLangMenu(btn) {
  const m = btn.nextElementSibling;
  m.hidden = !m.hidden;
  btn.setAttribute("aria-expanded", !m.hidden);
  if (!m.hidden) setTimeout(() => document.addEventListener("click", function close(e) {
    if (!btn.parentElement.contains(e.target)) { m.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    document.removeEventListener("click", close);
  }), 0);
}

// ============ SONIDO (Web Audio, sin archivos) ============
const Sound = {
  ctx: null,
  on: (() => { try { return localStorage.getItem("hq-sound") !== "off"; } catch (e) { return true; } })(),
  unlock() { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (this.ctx?.state === "suspended") this.ctx.resume(); },
  toggle() { this.on = !this.on; try { localStorage.setItem("hq-sound", this.on ? "on" : "off"); } catch (e) {} if (this.on) this.unlock(); return this.on; },
  tone(freq, dur = 0.12, type = "sine", vol = 0.18, when = 0) {
    if (!this.on || !this.ctx) return;
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + when;
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  },
  tick() { this.tone(880, 0.05, "square", 0.06); },
  tap() { this.tone(520, 0.06, "triangle", 0.12); },
  join() { this.tone(660, 0.08, "triangle"); this.tone(990, 0.12, "triangle", 0.15, 0.08); },
  go() { [523, 659, 784].forEach((f, i) => this.tone(f, 0.14, "triangle", 0.16, i * 0.09)); },
  good() { [659, 880, 1175].forEach((f, i) => this.tone(f, 0.18, "sine", 0.2, i * 0.08)); },
  bad() { this.tone(220, 0.25, "sawtooth", 0.08); this.tone(165, 0.3, "sawtooth", 0.08, 0.12); },
  fanfare() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => this.tone(f, 0.22, "triangle", 0.18, i * 0.13)); },
};
["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, () => Sound.unlock(), { once: true, passive: true }));
const SPK_ON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const SPK_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
function soundBtn() { return `<button class="langbtn" type="button" aria-label="${t("sound")}" onclick="this.innerHTML = Sound.toggle() ? SPK_ON : SPK_OFF">${Sound.on ? SPK_ON : SPK_OFF}</button>`; }

const buzz = (p) => { try { navigator.vibrate?.(p); } catch (e) {} };

// ============ CONFETI ============
function confetti(power = 1) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.createElement("canvas");
  cv.className = "confetti";
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  const W = (cv.width = innerWidth * devicePixelRatio), H = (cv.height = innerHeight * devicePixelRatio);
  const cols = ["#e39b45", "#f4e7d4", "#d8463c", "#2f6fdb", "#dca021", "#2a9d5c"];
  const ps = Array.from({ length: Math.round(140 * power) }, () => ({
    x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 26 * devicePixelRatio,
    vy: (-Math.random() * 22 - 8) * devicePixelRatio, r: (4 + Math.random() * 6) * devicePixelRatio, c: cols[(Math.random() * cols.length) | 0],
    a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4,
  }));
  let f = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      p.vy += 0.6 * devicePixelRatio; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore();
    }
    if (++f < 180) requestAnimationFrame(loop); else cv.remove();
  })();
}

// Cuenta hacia arriba un número (puntos)
function countUp(el, to, ms = 900) {
  if (!el) return;
  const t0 = performance.now();
  (function step(now) {
    const k = Math.min(1, (now - t0) / ms);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

// ============ FORMAS, RED, ALMACÉN ============
const SHAPES = [
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 37 34H3Z" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2 38 20 20 38 2 20Z" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="currentColor"/></svg>',
  '<svg class="sh" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="4" width="32" height="32" rx="3" fill="currentColor"/></svg>',
];
// En verdadero/falso: Verdadero = azul ◆, Falso = rojo ▲
const colorIdx = (i, vf) => (vf ? [1, 0][i] : i);

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const errText = (msg) => I18N[LANG].errors[msg] || msg;
async function api(path, body) {
  let r;
  try {
    r = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body || {}) });
  } catch (e) { throw new Error(t("errors").net || I18N[LANG].errors.net); }
  let data = {};
  try { data = await r.json(); } catch (e) {}
  if (!r.ok) throw new Error(errText(data.error) || I18N[LANG].errors.net);
  return data;
}

// Conexión en tiempo real; se reconecta sola si el móvil se bloquea
function stream(params, handlers) {
  const es = new EventSource("/events?" + new URLSearchParams(params));
  for (const [ev, fn] of Object.entries(handlers)) es.addEventListener(ev, (e) => fn(JSON.parse(e.data || "{}")));
  return es;
}

const store = {
  get(k, s = localStorage) { try { return JSON.parse(s.getItem(k)); } catch (e) { return null; } },
  set(k, v, s = localStorage) { try { s.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k, s = localStorage) { try { s.removeItem(k); } catch (e) {} },
};

const CUP = '<svg class="cup" viewBox="0 0 32 32" aria-hidden="true"><path d="M5 12h18v7a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z" fill="#e39b45"/><path d="M23 14h2.5a3.5 3.5 0 0 1 0 7H23" fill="none" stroke="#e39b45" stroke-width="2.4"/><path class="steam" d="M11 3c-1.5 2 1.5 3 0 6M16 3c-1.5 2 1.5 3 0 6" fill="none" stroke="#f4e7d4" stroke-width="2" stroke-linecap="round"/></svg>';
const LOGO = `<a class="logo" href="/" dir="ltr">${CUP}<span>Hoste<b>Quiz</b></span></a>`;
const CAP = '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 4 1.5 9 12 14l10.5-5z" fill="currentColor"/><path d="M6 11.5v4.2c0 1.5 2.7 3.3 6 3.3s6-1.8 6-3.3v-4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M21 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const LOGO_ESO = `<a class="logo" href="/?curso=eso" dir="ltr">${CAP}<span>Prepara<b>ESO</b></span></a>`;
// Cabecera estándar: logo + (extra) + idioma (en ESO todo va en español, como el examen)
const topbar = (extra = "") => `<div class="top">${CURSO === "eso" ? LOGO_ESO : LOGO}<div class="row tools">${extra}${CURSO === "eso" ? "" : langBtn()}</div></div>`;

// Imagen de la pregunta (si tiene)
const pic = (d, size = "") => (d.img ? `<div class="qimg ${size}"><img src="${esc(d.img)}" alt=""></div>` : "");

// Etiqueta de nivel
const lvTag = (n) => (n ? `<span class="lvl lvl-${n}">${esc(lvName(n))}</span>` : "");

// Anillo de tiempo (SVG)
function ring(id, total, size = 92) {
  const r = 40, c = 2 * Math.PI * r;
  return `<div class="ring ${total >= 100 ? "long" : ""}" style="width:${size}px;height:${size}px"><svg viewBox="0 0 92 92"><circle cx="46" cy="46" r="${r}" class="ring-bg"/><circle cx="46" cy="46" r="${r}" class="ring-fg" id="${id}-arc" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="0"/></svg><span id="${id}">${fmtClock(total)}</span></div>`;
}
function setRing(id, msLeft, totalMs) {
  const arc = document.getElementById(id + "-arc"), num = document.getElementById(id);
  if (!arc || !num) return;
  const c = 2 * Math.PI * 40;
  arc.style.strokeDashoffset = (c * (1 - msLeft / totalMs)).toFixed(1);
  num.textContent = fmtClock(msLeft / 1000);
  arc.classList.toggle("low", msLeft <= 5000);
}

// ============ NOVEDADES (aviso pequeño en el pie) ============
const APP_VERSION = "4.1";
const CHANGELOG = [
  { v: "4.1", date: "17/11/2026", es: ["ESO más claro: página propia (Prepara ESO), tarjetas grandes por materia y todo en español.", "Práctica del ESO con reloj: cada pregunta tiene el tiempo de su materia."], pt: ["ESO mais claro: página própria (Prepara ESO), cartões grandes por matéria e tudo em espanhol.", "Prática do ESO com relógio: cada pergunta tem o tempo da sua matéria."], en: ["Clearer ESO: its own page (Prepara ESO), big subject cards and everything in Spanish.", "ESO practice with a clock: each question gets its subject's time."] },
  { v: "4", date: "16/11/2026", es: ["Nueva sección: Graduado en ESO (Castilla y León) con 270 preguntas de matemáticas, ciencias, lengua, inglés y sociales.", "Cada materia tiene su tiempo por pregunta: Matemáticas 3 minutos."], pt: ["Nova secção: Graduado em ESO (Castilla y León) com 270 perguntas de matemática, ciências, língua, inglês e sociais.", "Cada matéria tem o seu tempo por pergunta: Matemática 3 minutos."], en: ["New section: ESO diploma (Castilla y León) with 270 questions in maths, science, Spanish, English and social studies.", "Each subject has its own time per question: Maths gets 3 minutes."] },
  { v: "3.1", date: "16/11/2026", es: ["Ahora puedes escribir el número de preguntas que quieras (de 1 a 100), por ejemplo 30 por alumno."], pt: ["Agora podes escrever o número de perguntas que quiseres (de 1 a 100), por exemplo 30 por aluno."], en: ["You can now type any number of questions (1 to 100), for example 30 per student."] },
  { v: "3", date: "16/11/2026", es: [
      "Nuevo modo: cada alumno recibe preguntas diferentes en su móvil, a su ritmo.",
      "Casi 470 preguntas nuevas y más difíciles: vinos, coctelería, atención al cliente, alérgenos y más.",
      "Se han quitado las preguntas demasiado fáciles y las respuestas sin sentido.",
      "Idiomas: español, portugués e inglés.",
    ], pt: [
      "Novo modo: cada aluno recebe perguntas diferentes no telemóvel, ao seu ritmo.",
      "Quase 470 perguntas, mais difíceis: vinhos, coquetelaria, atendimento, alergénios e mais.",
      "Foram retiradas as perguntas fáceis demais e as respostas sem sentido.",
      "Idiomas: espanhol, português e inglês.",
    ], en: [
      "New mode: each student gets different questions on their phone, at their own pace.",
      "Almost 470 harder questions: wine, cocktails, customer service, allergens and more.",
      "Removed questions that were too easy and answers that made no sense.",
      "Languages: Spanish, Portuguese and English.",
    ] },
  { v: "2", date: "16/11/2026", es: ["Varios idiomas, cuenta atrás 3-2-1, sonidos, animaciones y confeti."], pt: ["Vários idiomas, contagem 3-2-1, sons, animações e confetes."], en: ["Several languages, 3-2-1 countdown, sounds, animations and confetti."] },
  { v: "1", date: "29/10/2026", es: ["Primera versión: imágenes, niveles y crear quiz con IA."], pt: ["Primeira versão: imagens, níveis e criar quiz com IA."], en: ["First version: images, levels and AI quiz creator."] },
];
function newsLink() {
  return `<button type="button" class="newslink" onclick="openNews()">${t("news")} · ${t("version")} ${APP_VERSION}</button>`;
}
function openNews() {
  document.querySelector(".newsbox")?.remove();
  const box = document.createElement("div");
  box.className = "newsbox";
  box.setAttribute("role", "dialog");
  box.innerHTML = `<div class="newscard"><div class="row" style="justify-content:space-between"><h3>${t("newsTitle")}</h3><button type="button" class="langbtn" aria-label="OK" onclick="this.closest('.newsbox').remove()">✕</button></div>
    ${CHANGELOG.map((c) => `<div class="newsitem"><p class="label">${t("version")} ${c.v} · ${c.date}</p><ul>${(c[LANG] || c.es).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  box.addEventListener("click", (e) => { if (e.target === box) box.remove(); });
  document.body.appendChild(box);
}

// ============ CURSO: Hostelería o Graduado en ESO ============
const COURSES = ["hosteleria", "eso"];
// El curso va siempre en el enlace (?curso=eso), así cada parte tiene su propia dirección
let CURSO = COURSES.includes(new URLSearchParams(location.search).get("curso")) ? new URLSearchParams(location.search).get("curso") : "hosteleria";
function applyCurso() {
  const eso = CURSO === "eso";
  document.documentElement.classList.toggle("eso", eso);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", eso ? "#0e1422" : "#1b120d");
  LANG = eso ? "es" : detectLang();
  applyLang();
  document.title = eso ? document.title.replace("HosteQuiz", "Prepara ESO") : document.title.replace("Prepara ESO", "HosteQuiz");
}
function setCurso(c) { if (COURSES.includes(c)) { CURSO = c; applyCurso(); } }
applyCurso();
// Materias del ESO: símbolo y color de cada una
const SUBJ = {
  matematicas: { s: "x²", c: "var(--c0)" },
  ciencias: { s: "H₂O", c: "var(--c3)" },
  lengua: { s: "Ñ", c: "var(--c2)" },
  ingles: { s: "EN", c: "var(--c1)" },
  social: { s: "🌍", c: "#8a5cd6" },
};
const withCurso = (path) => `${path}?curso=${CURSO}`;
// Tiempo legible: 45 s, 1:30, 3 min
function fmtTime(sec) {
  sec = Math.max(0, Math.ceil(sec));
  if (sec < 60) return sec + " s";
  const m = Math.floor(sec / 60), r = sec % 60;
  return r ? `${m}:${String(r).padStart(2, "0")}` : t("minutes", { n: m });
}
const fmtClock = (sec) => { sec = Math.max(0, Math.ceil(sec)); return sec < 100 ? String(sec) : `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; };
