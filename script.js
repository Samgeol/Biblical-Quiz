// Importa as funções e objetos necessários do módulo em index.html
import {
  db,
  dbRefRanking, // Referência específica para o ranking
  ref,          // Função ref original
  push,
  onValue,
  set,
  serverTimestamp,
  onDisconnect,
  goOffline,
  firebaseConnected // Status da conexão (pode ser usado diretamente)
} from './firebase-init.js'; // Importa do novo módulo de inicialização

const questions = [
  // ... (mantém a lista de perguntas completa como estava) ...
  {
    question: "Quem foi o profeta que viu o Senhor sentado em um trono elevado?",
    options: ["Isaías", "Ezequiel", "Daniel", "Jeremias"],
    answer: "Isaías"
  }
];

/**
 * Sanitiza o userId para ser seguro como nome de nó no Firebase.
 * Substitui caracteres inválidos por _ e limita a 50 caracteres.
 * @param {string} id
 * @returns {string}
 */
function sanitizeUserId(id) {
  if (typeof id !== 'string') return '';
  return id.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
}

// --- Funções de Utilidade ---

/**
 * Remove caracteres potencialmente perigosos de uma string.
 * Usa textContent para codificar entidades HTML e depois remove aspas.
 * @param {string} input A string a ser sanitizada.
 * @returns {string} A string sanitizada.
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  const temp = document.createElement('div');
  temp.textContent = input; // Codifica <, >, &, etc.
  let sanitized = temp.innerHTML;
  // Remove aspas simples e duplas como precaução extra
  sanitized = sanitized.replace(/'/g, '&#39;').replace(/"/g, '"');
  return sanitized;
}

/**
 * Verifica se a string contém apenas letras (a-z, A-Z), números (0-9) e espaços.
 * @param {string} input A string a ser validada.
 * @returns {boolean} True se a string for válida, false caso contrário.
 */
function isValidInput(input) {
  if (typeof input !== 'string' || input.length === 0) return false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    const code = c.charCodeAt(0);
if (
      !(
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122) || // a-z
        code === 32 || // espaço
        code === 231 || code === 199 || // ç Ç
        (code >= 192 && code <= 255) || // letras acentuadas comuns
        code === 9836 || // ♬
        code === 12484   // ツ
      )
    ) {
      return false;
    }
  }
  return true;
}


// --- Variáveis Globais ---

let currentQuestion = 0;
let correctAnswers = 0;
let startTime;
let timerInterval;
let playerName = "";
let playerComum = "";
let userId = null; // Para o sistema de presença
let userStatusRef = null; // Será criado dentro de tryInitializePresence
let presenceSetupAttempted = false; // Flag para tentar configurar a presença apenas uma vez por sessão
let isGameFinished = false; // Flag para controlar o salvamento da pontuação
let lastStatusUpdateTime = 0; // Timestamp da última atualização de status enviada

// As funções agora são importadas diretamente, não mais via 'window'.

const startModal = document.getElementById('startModal');
const startButton = document.getElementById('startButton');
const playerNameInput = document.getElementById('playerName');
const playerComumInput = document.getElementById('playerComum');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const timerDisplay = document.getElementById('timer');
const rankingBody = document.getElementById('rankingBody');
const settingsButton = document.getElementById('settingsButton');
const settingsMenu = document.getElementById('settingsMenu');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const changeNameButton = document.getElementById('changeNameButton');
const rankingContainer = document.querySelector('.ranking-container'); // Definido aqui
const toggleRankingBtn = document.getElementById('toggleRanking'); // Definido aqui

let isEditingNames = false;

// --- Event Listeners ---

startButton.addEventListener('click', () => {
  let nameInput = playerNameInput.value.trim();
  let comumInput = playerComumInput.value.trim();

  // 1. Validação de preenchimento
  if (!nameInput || !comumInput) {
    alert('Por favor, preencha seu nome e sua comum.');
    return;
  }

  // 2. Validação de caracteres permitidos
  if (!isValidInput(nameInput) || !isValidInput(comumInput)) {
    // Usando template literal para melhor formatação da mensagem
    alert(`Nome e Comum devem conter apenas letras (a-z, A-Z), números (0-9) e espaços. Caracteres acentuados comuns (á, é, ç, etc.) são permitidos.`);
    return;
  }

  // 3. Validação de tamanho (após validar caracteres)
  if (nameInput.length > 12 || comumInput.length > 20) {
    alert('O nome deve ter no máximo 12 caracteres e a comum no máximo 20.');
    return;
  }

  // 4. Sanitização (mantida como defesa adicional)
  const sanitizedName = sanitizeInput(nameInput);
  const sanitizedComum = sanitizeInput(comumInput);

  // Se após sanitizar ficar vazio (ex: só tinha caracteres perigosos)
  if (!sanitizedName || !sanitizedComum) {
      alert('Nome ou comum inválidos após sanitização. Use caracteres padrão.');
      // Limpa os inputs para evitar loop se o usuário clicar de novo
      playerNameInput.value = '';
      playerComumInput.value = '';
      return;
  }

  // Guarda nomes antigos apenas se estiver editando
  const oldName = isEditingNames ? window.oldPlayerName : null;
  const oldComum = isEditingNames ? window.oldPlayerComum : null;

  // Atribui valores sanitizados às variáveis globais
  playerName = sanitizedName;
  playerComum = sanitizedComum;

  // Gera ou recupera userId de forma compatível com todos os navegadores
  let savedUserId = null;
  try {
    savedUserId = localStorage.getItem('userId');
  } catch (e) {
    savedUserId = null;
  }

  if (!savedUserId) {
    savedUserId = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
  }

  // Sanitiza o userId para garantir compatibilidade com as regras e nomes de nós
  savedUserId = sanitizeUserId(savedUserId);

  try {
    localStorage.setItem('userId', savedUserId);
  } catch (e) {
    // Ignora erro, segue com userId gerado
  }

  userId = savedUserId;

  // Salva nomes SANITIZADOS no localStorage
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('playerComum', playerComum);

  startModal.style.display = 'none';

  tryInitializePresence();

if (isEditingNames) {
    isEditingNames = false;
    startButton.textContent = 'Começar';

    // Atualiza a saudação imediatamente após salvar o novo nome
    const questionH2 = document.getElementById('questionText');
    if (questionH2) {
        questionH2.textContent = `Que bom te ver, ${playerName}!`;
    }

    // Atualizar o ranking antigo para os novos nomes
    onValue(dbRefRanking, (snapshot) => { // Usa onValue e dbRefRanking importados
      const data = snapshot.val();
      for (let key in data) {
        if (data[key] && data[key].userId === userId) { // Verifica se data[key] existe
          const updateRef = ref(db, 'ranking/' + key); // Usa ref e db importados
          // Usa os nomes JÁ SANITIZADOS das variáveis globais
          set(updateRef, { // Usa set importado
            userId: userId,
            name: playerName, // Já sanitizado
            comum: playerComum, // Já sanitizado
            score: data[key].score,
            time: data[key].time
          }).then(() => {
            // A atualização visual será feita por handleRankingVisibility/startRankingListener
          }).catch((error) => {
            console.error("Erro ao atualizar nome no ranking:", error); // Mantém log dev
            alert("Ocorreu um erro ao atualizar seu nome no ranking. Tente novamente."); // Mensagem genérica
          });
          break; // Sai do loop após encontrar e tentar atualizar
        }
      }
      // Garante que o ranking seja carregado/atualizado após a tentativa
      if (window.innerWidth >= 769 && firebaseConnected) {
        startRankingListener();
      }
    }, { onlyOnce: true });

    return; // Não inicia o jogo nem mostra o infoModal
  }

  // Fluxo normal de início do jogo
  if (!localStorage.getItem('infoShown')) {
    document.getElementById('infoModal').style.display = 'flex';
  } else {
    timerDisplay.style.display = 'block';
    startGame();
  }
});

// Evento do botão "Começar" do pop-up explicativo
document.getElementById('infoStartButton').addEventListener('click', () => {
  localStorage.setItem('infoShown', 'true'); // Marca que o pop-up foi mostrado
  document.getElementById('infoModal').style.display = 'none';
  timerDisplay.style.display = 'block'; // Mostrar o timer só quando iniciar o quiz
  startGame();
});

// Carregar nome e comum do localStorage
window.addEventListener('load', () => {
  timerDisplay.style.display = 'none'; // Oculta o timer inicialmente

  // Declara as variáveis uma vez
  let savedName = localStorage.getItem('playerName');
  let savedComum = localStorage.getItem('playerComum');

  // Verifica se existem dados salvos
  if(savedName && savedComum) {
    // Sanitiza os dados carregados do localStorage ANTES de usá-los
    playerName = sanitizeInput(savedName);
    playerComum = sanitizeInput(savedComum);

    // Se após sanitizar ficou vazio, trata como se não houvesse dados salvos
    if (!playerName || !playerComum) {
        console.warn("Dados inválidos encontrados no localStorage após sanitização.");
        localStorage.removeItem('playerName'); // Remove dados inválidos
        localStorage.removeItem('playerComum');
        // Força a exibição do modal inicial limpando as variáveis
        savedName = null;
        savedComum = null;
        playerName = "";
        playerComum = "";
        startModal.style.display = 'flex'; // Mostra o modal
    } else {
        // Dados válidos e sanitizados, continua o fluxo normal
        userId = localStorage.getItem('userId'); // Carrega o ID
        // Se não houver userId no localStorage, cria um novo
        if (!userId) {
        // Tenta gerar UUID, senão usa fallback
        try {
          userId = crypto.randomUUID();
        } catch (e) {
          userId = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
        }
            localStorage.setItem('userId', userId);
        }

        // Preenche os inputs com os dados JÁ SANITIZADOS
        playerNameInput.value = playerName;
        playerComumInput.value = playerComum;

        startModal.style.display = 'none';

    // Tenta inicializar a presença agora que temos userId
    tryInitializePresence();

    // Saudação dentro da área das perguntas, mantendo a estrutura
    const container = document.getElementById('questionContainer');
    const questionH2 = document.getElementById('questionText');
    const optionsDiv = document.getElementById('optionsContainer');

    // Usa textContent para a saudação com o nome JÁ SANITIZADO
    questionH2.textContent = `Que bom te ver, ${playerName}!`;
    optionsDiv.innerHTML = ''; // Limpa opções anteriores
    optionsDiv.style.display = 'none'; // Esconde área de opções

    // Cria e adiciona o botão "Começar"
    const resumeButton = document.createElement('button');
    resumeButton.textContent = 'Começar';
    resumeButton.id = 'resumeStartButton'; // Usa o ID já estilizado
    container.appendChild(resumeButton);

    resumeButton.addEventListener('click', () => {
      container.removeChild(resumeButton); // Remove o botão
      questionH2.textContent = ''; // Limpa a saudação
      optionsDiv.style.display = 'flex'; // Mostra área de opções
      timerDisplay.style.display = 'block'; // Mostra o timer
      startGame(); // Inicia o jogo
    });
   } // Fim do else (dados válidos e sanitizados)
  } else {
      // Se não tem nome/comum salvo OU foram invalidados pela sanitização
      startModal.style.display = 'flex';
  }

  // Chama a função para ajustar a visibilidade inicial dos elementos do ranking
  handleRankingVisibility();

  // **NOVO:** Chama startRankingListener se a tela for grande e o Firebase já estiver conectado
  if (window.innerWidth >= 769 && firebaseConnected) {
    startRankingListener();
  }
});

// --- Funções do Jogo ---

function startGame() {
  currentQuestion = 0;
  correctAnswers = 0;
  isGameFinished = false; // Reseta a flag no início de cada jogo

  // Selecionar aleatoriamente 10 perguntas com cópia profunda para evitar efeitos colaterais
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  window.selectedQuestions = shuffled.slice(0, 10).map(q => ({
    question: q.question,
    options: [...q.options],
    answer: q.answer
  }));

  // Garante que o container de perguntas esteja visível (caso tenha sido ocultado no fim do jogo)
  document.getElementById('questionContainer').style.display = 'block';
  // Garante que a área de opções esteja visível
  document.getElementById('optionsContainer').style.display = 'flex';
  // Garante que o texto da pergunta esteja limpo (caso tenha a saudação)
  document.getElementById('questionText').textContent = '';

  startTime = Date.now();
  // Limpa intervalo anterior, se existir
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion(); // Mostra a primeira pergunta
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showQuestion() {
  if (currentQuestion >= window.selectedQuestions.length) {
    endGame();
    return;
  }

  const q = window.selectedQuestions[currentQuestion];
  questionText.textContent = q.question; // Define o texto da pergunta
  optionsContainer.innerHTML = ''; // Limpa botões de opção anteriores

  const shuffledOptions = shuffleArray(q.options);

  shuffledOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  const questionContainer = document.getElementById('questionContainer');

  if (button.textContent === correctAnswer) {
    button.classList.add('correct');
    correctAnswers++;
    questionContainer.classList.add('correct-container');
  } else {
    button.classList.add('wrong');
    questionContainer.classList.add('wrong-container');
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  setTimeout(() => {
    // Remover classes de cor do container para próxima pergunta
    questionContainer.classList.remove('correct-container', 'wrong-container');
    currentQuestion++;
    showQuestion();
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  isGameFinished = true; // Marca que o jogo terminou ANTES de tentar salvar

  // 1. Validação da Pontuação no Frontend ANTES de salvar
  if (correctAnswers < 0 || correctAnswers > 10 || totalTime < 0) {
      console.error("Tentativa de salvar pontuação inválida:", { correctAnswers, totalTime });
      alert("Ocorreu um erro ao calcular sua pontuação. Tente novamente.");
      // Ainda mostra o modal de fim de jogo, mas sem salvar
      document.getElementById('questionContainer').style.display = 'none';
      document.getElementById('endgameContainer').style.display = 'block';
      // Não chama loadRanking() aqui, deixa o listener cuidar
      return; // Impede o salvamento
  }

  // 2. Salvar no Firebase (apenas se a pontuação for válida)
  // Verificar se já existe pontuação para esse jogador usando userId
  onValue(dbRefRanking, (snapshot) => { // Usa onValue e dbRefRanking importados
    const data = snapshot.val();
    let existingKey = null;
    let existingScore = -1;
    let existingTime = Infinity;

    for (let key in data) {
      // Verifica se data[key] existe e tem a propriedade userId antes de acessá-la
      if (data[key] && data[key].userId === userId) {
        existingKey = key;
        existingScore = data[key].score;
        existingTime = data[key].time;
        break;
      }
    }

    // Se não existe ou a nova pontuação é melhor, sobrescreve
    if (
      existingKey === null ||
      correctAnswers > existingScore ||
      (correctAnswers === existingScore && totalTime < existingTime)
    ) {
      if (existingKey) {
        // Atualizar pontuação existente
        const updateRef = ref(db, 'ranking/' + existingKey); // Usa ref e db importados
        set(updateRef, { // Usa set importado
          userId: userId, // Garante que o userId esteja presente
          name: playerName, // Já sanitizado
          comum: playerComum, // Já sanitizado
          score: correctAnswers,
          time: totalTime
        }).catch((error) => {
            console.error("Erro ao ATUALIZAR pontuação no Firebase:", error);
            alert("Ocorreu um erro ao salvar sua pontuação. Verifique sua conexão e tente novamente.");
        });
      } else {
        // Criar nova pontuação
        push(dbRefRanking, { // Usa push e dbRefRanking importados
          userId: userId, // Adiciona userId ao criar nova entrada
          name: playerName, // Já sanitizado
          comum: playerComum, // Já sanitizado
          score: correctAnswers,
          time: totalTime
        }).catch((error) => {
            console.error("Erro ao CRIAR pontuação no Firebase:", error);
            alert("Ocorreu um erro ao salvar sua pontuação. Verifique sua conexão e tente novamente.");
        });
      }
    } // Fim do if de comparação de pontuação

    // Mostrar mensagem de fim de jogo (sempre mostra, mesmo se não salvou por ser pontuação menor)
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('endgameContainer').style.display = 'block';

    // O ranking será atualizado automaticamente pelo listener onValue se ele estiver ativo

  }, { onlyOnce: true }); // Executa a consulta apenas uma vez
}

// Botão tentar novamente
document.getElementById('retryButton').addEventListener('click', () => {
  document.getElementById('endgameContainer').style.display = 'none';
  // Não chama startGame diretamente, volta para a saudação se aplicável
  window.location.reload(); // Recarrega a página para reiniciar o fluxo
});

let rankingUnsubscribe = null;

function startRankingListener() {
  if (rankingUnsubscribe) return; // já está ouvindo
  console.log("Iniciando listener do ranking..."); // Log para depuração

  rankingUnsubscribe = onValue(dbRefRanking, (snapshot) => {
    console.log("Dados do ranking recebidos:", snapshot.val()); // Log para depuração
    const data = snapshot.val();
    const rankingArray = [];

    for (let key in data) {
      if (data[key] && data[key].name && data[key].comum && data[key].userId !== undefined && data[key].score !== undefined && data[key].time !== undefined) {
        rankingArray.push({ ...data[key], firebaseKey: key });
      } else {
        console.warn("Entrada de ranking inválida ou incompleta ignorada:", key, data[key]);
      }
    }

    rankingArray.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      } else {
        return a.time - b.time;
      }
    });

    let previousInfo = JSON.parse(localStorage.getItem('playerRankingInfo') || '{}');
    const now = Date.now();

    let currentPlayerIndex = -1;
    if (userId) {
      currentPlayerIndex = rankingArray.findIndex(p => p.userId === userId);
    }

    let showArrow = false;

    if (currentPlayerIndex !== -1) {
      if (previousInfo.userId === userId) {
        if (now - previousInfo.timestamp < 3600000) { // 1 hora
          if (currentPlayerIndex < previousInfo.position) {
            showArrow = true;
          }
        }
      }
      localStorage.setItem('playerRankingInfo', JSON.stringify({
        userId: userId,
        position: currentPlayerIndex,
        timestamp: now
      }));
    }

    rankingBody.innerHTML = ''; // Limpa o corpo da tabela
    if (rankingArray.length === 0) {
        console.log("Nenhum dado válido no ranking para exibir."); // Log
    }
    rankingArray.forEach((player, index) => {
      let medalImg = 'participacao.png';
      if (index === 0) medalImg = 'ouro.png';
      else if (index === 1) medalImg = 'prata.png';
      else if (index === 2) medalImg = 'bronze.png';

      const sanitizedName = sanitizeInput(player.name || '');
      const sanitizedComum = sanitizeInput(player.comum || '');

      const displayName = sanitizedName.length > 20 ? sanitizedName.substring(0, 20) + '...' : sanitizedName || 'Nome inválido';
      const displayComum = sanitizedComum.length > 20 ? sanitizedComum.substring(0, 20) + '...' : sanitizedComum || 'Comum inválida';

      const arrow = (showArrow && index === currentPlayerIndex) ? ' <span style="color:green;">▲</span>' : '';

      const tr = document.createElement('tr');

      const tdRank = document.createElement('td');
      const img = document.createElement('img');
      img.src = medalImg;
      img.alt = 'medalha';
      img.className = 'medalha';
      tdRank.appendChild(img);
      tdRank.innerHTML += ` ${displayName}${arrow}`;

      const tdComum = document.createElement('td');
      tdComum.textContent = displayComum;

      const tdScore = document.createElement('td');
      tdScore.textContent = player.score !== undefined ? player.score : '-';

      const tdTime = document.createElement('td');
      tdTime.textContent = player.time !== undefined ? player.time : '-';

      tr.appendChild(tdRank);
      tr.appendChild(tdComum);
      tr.appendChild(tdScore);
      tr.appendChild(tdTime);

      rankingBody.appendChild(tr);
    });
  }, (error) => {
    console.error("Erro ao carregar ranking:", error);
    alert("Não foi possível carregar o ranking. Verifique sua conexão.");
    stopRankingListener(); // Para o listener em caso de erro
  });
}

function stopRankingListener() {
  if (rankingUnsubscribe) {
    console.log("Parando listener do ranking."); // Log para depuração
    rankingUnsubscribe();
    rankingUnsubscribe = null;
  }
}

// --- Lógica de Visibilidade Responsiva do Ranking (AJUSTADA) ---

function handleRankingVisibility() {
  const isLargeScreen = window.innerWidth >= 769;

  if (isLargeScreen) {
    // Tela grande: Ranking visível, botão toggle escondido
    rankingContainer.style.display = 'block';
    toggleRankingBtn.style.display = 'none';
    // O carregamento dos dados (startRankingListener) é feito no 'load' ou 'firebaseconnectionchange'
  } else {
    // Tela pequena: Botão toggle visível
    toggleRankingBtn.style.display = 'block';
    // A visibilidade do ranking é controlada pelo CSS ou pelo botão toggle
    // Se o ranking NÃO estiver visível, garante que o listener esteja parado
    if (rankingContainer.style.display !== 'block') {
        stopRankingListener();
    }
  }
}

// Listener para o botão toggle (agora só funciona em telas pequenas)
toggleRankingBtn.addEventListener('click', () => {
  // Só executa a lógica se a tela for pequena
  if (window.innerWidth < 769) {
    if (rankingContainer.style.display === 'none' || rankingContainer.style.display === '') {
      rankingContainer.style.display = 'block';
      toggleRankingBtn.textContent = 'Esconder Ranking';
      startRankingListener(); // Inicia listener ao mostrar
    } else {
      rankingContainer.style.display = 'none';
      toggleRankingBtn.textContent = 'Mostrar Ranking';
      stopRankingListener(); // Para listener ao esconder
    }
  }
});

// Listener para redimensionamento da janela
window.addEventListener('resize', () => {
    handleRankingVisibility();
    // **NOVO:** Garante que o listener seja iniciado se a tela ficar grande
    if (window.innerWidth >= 769 && firebaseConnected) {
        startRankingListener();
    }
});

// --- Listener para o evento de conexão do Firebase ---
// Ouve a mudança de estado da conexão disparada pelo firebase-init.js
window.addEventListener('firebaseconnectionchange', (event) => {
    // Tenta inicializar a presença SE conectado
    if (firebaseConnected) {
        tryInitializePresence();
        // **NOVO:** Inicia o listener do ranking se a tela for grande
        if (window.innerWidth >= 769) {
            startRankingListener();
        }
    } else {
        // Se desconectado, para o listener do ranking
        stopRankingListener();
        // Poderia adicionar lógica para mostrar mensagem de desconexão no ranking, se desejado
        rankingBody.innerHTML = '<tr><td colspan="4">Desconectado. Tentando reconectar...</td></tr>';
    }
});


// --- Sistema de Presença Firebase ---

// Função wrapper que verifica todas as condições antes de configurar a presença
function tryInitializePresence() {
    // Só executa uma vez por carregamento de página
    if (presenceSetupAttempted) return;

    // Verifica se temos conexão (importada) E um usuário identificado
    if (firebaseConnected && userId) {
        presenceSetupAttempted = true; // Marca que vamos tentar configurar

        // Verifica disponibilidade das funções importadas (redundante se a importação funcionou, mas seguro)
        if (!db || !ref || !set || !onDisconnect || !serverTimestamp) {
             console.error("Erro Crítico: Funções essenciais do Firebase não importadas corretamente.");
             presenceSetupAttempted = false; // Permite nova tentativa se falhar aqui
             return; // Não pode continuar
        }

        // Tenta criar a referência do usuário AGORA usando funções importadas
        try {
            userStatusRef = ref(db, `status/${userId}`); // Usa ref e db importados
        } catch (e) {
            console.error("Erro ao criar userStatusRef em tryInitializePresence:", e);
            userStatusRef = null;
            presenceSetupAttempted = false; // Permite nova tentativa se falhar aqui
            return; // Não pode continuar sem a referência
        }

        // Se chegou aqui, temos conexão, userId e userStatusRef

        // --- Lógica Principal da Presença ---
        // Adiciona userId aos objetos de status para cumprir as regras do Firebase
        const onlineStatus = {
            online: true,
            last_seen: serverTimestamp(), // Usa serverTimestamp importado
            name: playerName, // Já sanitizado
            comum: playerComum, // Já sanitizado
            userId: userId // Adicionado para validação nas regras
        };
        const offlineStatus = {
            online: false,
            last_seen: serverTimestamp(), // Usa serverTimestamp importado
            name: playerName, // Mantém para referência
            comum: playerComum, // Mantém para referência
            userId: userId // Adicionado para validação nas regras
        };

        // Define o status online imediatamente, mas com rate limiting
        const now = Date.now();
        if (now - lastStatusUpdateTime < 60000) { // 60000 ms = 1 minuto
            console.log('Atualização de status online pulada (limite de 1/min)');
            // Mesmo pulando o SET inicial, ainda configura o onDisconnect,
            // pois ele só será acionado na desconexão real.
            onDisconnect(userStatusRef).set(offlineStatus).catch((err) => { // Usa onDisconnect importado
                 console.error("Erro ao configurar onDisconnect (após pular set inicial):", err);
                 // Não precisa de alert aqui, pois o status principal não foi alterado
            });
            return; // Pula o set inicial
        }

        // Se passou tempo suficiente, atualiza o status e o timestamp
        lastStatusUpdateTime = now; // Atualiza o timestamp ANTES de tentar o set
        set(userStatusRef, onlineStatus).then(() => { // Usa set importado
            // Configura o onDisconnect SOMENTE após definir o status online com sucesso
            return onDisconnect(userStatusRef).set(offlineStatus); // Usa onDisconnect importado
        }).then(() => {
            // Handler onDisconnect configurado com sucesso (log removido)
        }).catch((err) => {
            console.error("Erro ao configurar presença ou onDisconnect:", err); // Mantém log dev
            console.warn("Ocorreu um erro ao atualizar seu status online. Funcionalidades de presença podem não funcionar corretamente."); // Mensagem genérica
            presenceSetupAttempted = false; // Permite nova tentativa se falhar
            lastStatusUpdateTime = 0; // Reseta o timestamp em caso de erro para permitir nova tentativa imediata
        });
        // --- Fim da Lógica Principal ---

    } else {
        // Ainda não pronto para inicializar presença (aguardando conexão ou dados do usuário) - log removido
    }
}


// --- Função setupPresenceSystem removida/substituída por tryInitializePresence ---

// Tenta desconectar graciosamente ao fechar a aba/navegador
// Nota: Isso nem sempre funciona de forma confiável, onDisconnect é mais robusto.
window.addEventListener('beforeunload', () => {
  // Verifica se a função goOffline e db foram importadas/existem
  if (goOffline && db) {
    // Não definimos o status aqui, pois o onDisconnect deve lidar com isso.
    // Apenas instruímos o SDK a se desconectar.
    goOffline(db); // Usa goOffline e db importados
  } else {
     console.warn("Função goOffline ou db não disponíveis no beforeunload.");
  }
});


// --- Lógica do Menu de Configurações ---

// Abrir menu
settingsButton.addEventListener('click', () => {
  settingsMenu.classList.add('visible');
});

// Fechar menu
closeSettingsButton.addEventListener('click', () => {
  settingsMenu.classList.remove('visible');
});

// Botão para alterar nome/comum
changeNameButton.addEventListener('click', () => {
  // Guarda os nomes antigos para referência na atualização do ranking
  window.oldPlayerName = playerName;
  window.oldPlayerComum = playerComum;

  playerNameInput.value = playerName;
  playerComumInput.value = playerComum;
  startModal.style.display = 'flex';
  isEditingNames = true;
  startButton.textContent = 'Salvar nomes';
  settingsMenu.classList.remove('visible');
});
