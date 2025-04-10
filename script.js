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
  {
    question: "Qual o primeiro livro da Bíblia?",
    options: ["Êxodo", "Gênesis", "Levítico", "Salmos"],
    answer: "Gênesis"
  },
  {
    question: "Quem construiu a arca?",
    options: ["Moisés", "Abraão", "Noé", "Davi"],
    answer: "Noé"
  },
  {
    question: "Qual o nome da mãe de Jesus?",
    options: ["Maria", "Marta", "Elisabeth", "Ana"],
    answer: "Maria"
  },
  {
    question: "Quem foi lançado na cova dos leões?",
    options: ["Daniel", "José", "Jonas", "Elias"],
    answer: "Daniel"
  },
  {
    question: "Quem traiu Jesus?",
    options: ["Pedro", "Judas", "João", "Tomé"],
    answer: "Judas"
  },
  {
    question: "Qual o último livro da Bíblia?",
    options: ["Apocalipse", "Atos", "Romanos", "João"],
    answer: "Apocalipse"
  },
  {
    question: "Quem foi o homem mais forte da Bíblia?",
    options: ["Golias", "Sansão", "Saul", "Davi"],
    answer: "Sansão"
  },
  {
    question: "Quem foi engolido por um grande peixe?",
    options: ["Jonas", "Pedro", "Paulo", "Elias"],
    answer: "Jonas"
  },
  {
    question: "Quem recebeu as tábuas da lei?",
    options: ["Moisés", "Abraão", "Isaac", "Jacó"],
    answer: "Moisés"
  },
  {
    question: "Quem foi o primeiro rei de Israel?",
    options: ["Davi", "Saul", "Salomão", "Josias"],
    answer: "Saul"
  },
  {
    question: "Qual era o nome original de Abraão?",
    options: ["Abrão", "Ismael", "Isaac", "Ló"],
    answer: "Abrão"
  },
  {
    question: "Quem foi o pai de Isaque?",
    options: ["Abraão", "Jacó", "Esaú", "Ló"],
    answer: "Abraão"
  },
  {
    question: "Qual era o nome da esposa de Isaque?",
    options: ["Rebeca", "Sara", "Raquel", "Lia"],
    answer: "Rebeca"
  },
  {
    question: "Quem interpretou os sonhos do Faraó?",
    options: ["José", "Daniel", "Moisés", "Samuel"],
    answer: "José"
  },
  {
    question: "Quem foi a primeira mulher criada por Deus?",
    options: ["Eva", "Sara", "Maria", "Rebeca"],
    answer: "Eva"
  },
  {
    question: "Qual era o nome do irmão de Moisés?",
    options: ["Arão", "Josué", "Calebe", "Faraó"],
    answer: "Arão"
  },
  {
    question: "Quem sucedeu Moisés como líder de Israel?",
    options: ["Josué", "Calebe", "Arão", "Gideão"],
    answer: "Josué"
  },
  {
    question: "Qual era o nome da esposa de Davi que o ajudou a escapar de Saul?",
    options: ["Mical", "Abigail", "Bate-Seba", "Tamar"],
    answer: "Mical"
  },
  {
    question: "Quem matou Golias?",
    options: ["Davi", "Saul", "Sansão", "Jônatas"],
    answer: "Davi"
  },
  {
    question: "Qual era o nome do melhor amigo de Davi?",
    options: ["Jônatas", "Saul", "Absalão", "Joabe"],
    answer: "Jônatas"
  },
  {
    question: "Quem foi o rei mais sábio de Israel?",
    options: ["Salomão", "Davi", "Saul", "Josias"],
    answer: "Salomão"
  },
  {
    question: "Qual era o nome da rainha que visitou Salomão?",
    options: ["Rainha de Sabá", "Ester", "Bate-Seba", "Jezebel"],
    answer: "Rainha de Sabá"
  },
  {
    question: "Quem foi o profeta que enfrentou os profetas de Baal no Monte Carmelo?",
    options: ["Elias", "Eliseu", "Isaías", "Jeremias"],
    answer: "Elias"
  },
  {
    question: "Quem foi o sucessor de Elias como profeta?",
    options: ["Eliseu", "Isaías", "Jeremias", "Ezequiel"],
    answer: "Eliseu"
  },
  {
    question: "Qual era o nome da esposa de Acabe?",
    options: ["Jezebel", "Ester", "Débora", "Raquel"],
    answer: "Jezebel"
  },
  {
    question: "Quem foi a juíza de Israel mencionada no livro de Juízes?",
    options: ["Débora", "Ester", "Rute", "Sara"],
    answer: "Débora"
  },
  {
    question: "Quem foi o avô de Davi?",
    options: ["Jessé", "Obede", "Boaz", "Salmon"],
    answer: "Obede"
  },
  {
    question: "Qual era o nome da cidade onde Jesus nasceu?",
    options: ["Belém", "Nazaré", "Jerusalém", "Jericó"],
    answer: "Belém"
  },
  {
    question: "Quem anunciou o nascimento de Jesus aos pastores?",
    options: ["Anjos", "Maria", "José", "Herodes"],
    answer: "Anjos"
  },
  {
    question: "Qual era o nome do rei que tentou matar Jesus quando bebê?",
    options: ["Herodes", "Pilatos", "César", "Nero"],
    answer: "Herodes"
  },
  {
    question: "Quem batizou Jesus?",
    options: ["João Batista", "Pedro", "Tiago", "André"],
    answer: "João Batista"
  },
  {
    question: "Qual era o nome do discípulo que negou Jesus três vezes?",
    options: ["Pedro", "Judas", "Tiago", "João"],
    answer: "Pedro"
  },
  {
    question: "Quem foi o apóstolo que duvidou da ressurreição de Jesus?",
    options: ["Tomé", "Pedro", "João", "Mateus"],
    answer: "Tomé"
  },
  {
    question: "Qual era o nome da cidade onde Jesus foi crucificado?",
    options: ["Jerusalém", "Belém", "Nazaré", "Jericó"],
    answer: "Jerusalém"
  },
  {
    question: "Quem escreveu a maior parte do Novo Testamento?",
    options: ["Paulo", "Pedro", "João", "Lucas"],
    answer: "Paulo"
  },
  {
    question: "Qual era o nome original de Paulo antes de sua conversão?",
    options: ["Saulo", "Simão", "Barnabé", "Silas"],
    answer: "Saulo"
  },
  {
    question: "Quem foi o primeiro mártir cristão mencionado na Bíblia?",
    options: ["Estêvão", "Tiago", "Pedro", "Paulo"],
    answer: "Estêvão"
  },
  {
    question: "Qual era o nome da mulher que foi salva da prostituição por Jesus?",
    options: ["Maria Madalena", "Marta", "Lídia", "Febe"],
    answer: "Maria Madalena"
  },
  {
    question: "Quem escreveu o livro de Atos dos Apóstolos?",
    options: ["Lucas", "Paulo", "Pedro", "João"],
    answer: "Lucas"
  },
  {
    question: "Qual era o nome do casal que mentiu sobre a oferta e morreu?",
    options: ["Ananias e Safira", "Aquila e Priscila", "José e Maria", "Zacarias e Isabel"],
    answer: "Ananias e Safira"
  },
  {
    question: "Quem foi o profeta que previu a vinda do Messias em Belém?",
    options: ["Miquéias", "Isaías", "Jeremias", "Ezequiel"],
    answer: "Miquéias"
  },
  {
    question: "Qual era o nome do rio onde Jesus foi batizado?",
    options: ["Jordão", "Nilo", "Eufrates", "Tigre"],
    answer: "Jordão"
  },
  {
    question: "Quem foi o pai de João Batista?",
    options: ["Zacarias", "José", "Eli", "Simeão"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome da mãe de João Batista?",
    options: ["Isabel", "Maria", "Ana", "Sara"],
    answer: "Isabel"
  },
  {
    question: "Quem foi o rei de Judá que encontrou o Livro da Lei?",
    options: ["Josias", "Ezequias", "Manassés", "Acaz"],
    answer: "Josias"
  },
  {
    question: "Qual era o nome do profeta que casou com uma prostituta por ordem de Deus?",
    options: ["Oséias", "Joel", "Amós", "Obadias"],
    answer: "Oséias"
  },
  {
    question: "Quem foi o profeta que viu uma visão de ossos secos?",
    options: ["Ezequiel", "Daniel", "Isaías", "Jeremias"],
    answer: "Ezequiel"
  },
  {
    question: "Qual era o nome da cidade onde Rute e Noemi foram morar?",
    options: ["Belém", "Moabe", "Jerusalém", "Hebrom"],
    answer: "Belém"
  },
  {
    question: "Quem foi o esposo de Rute?",
    options: ["Boaz", "Obede", "Jessé", "Elimeleque"],
    answer: "Boaz"
  },
  {
    question: "Qual era o nome da rainha que salvou os judeus do extermínio?",
    options: ["Ester", "Débora", "Sara", "Raquel"],
    answer: "Ester"
  },
  {
    question: "Quem foi o primo de Ester que a ajudou a salvar os judeus?",
    options: ["Mardoqueu", "Haman", "Assuero", "Esdras"],
    answer: "Mardoqueu"
  },
  {
    question: "Qual era o nome do rei persa que se casou com Ester?",
    options: ["Assuero", "Ciro", "Dario", "Xerxes"],
    answer: "Assuero"
  },
  {
    question: "Quem foi o profeta que foi levado ao céu em um redemoinho?",
    options: ["Elias", "Eliseu", "Enoque", "Moisés"],
    answer: "Elias"
  },
  {
    question: "Quem foi o homem que andou com Deus e foi levado sem morrer?",
    options: ["Enoque", "Elias", "Moisés", "Noé"],
    answer: "Enoque"
  },
  {
    question: "Qual era o nome do filho de Saul que foi amigo de Davi?",
    options: ["Jônatas", "Isbosete", "Mefibosete", "Abinadabe"],
    answer: "Jônatas"
  },
  {
    question: "Quem foi o rei que construiu o primeiro templo em Jerusalém?",
    options: ["Salomão", "Davi", "Saul", "Roboão"],
    answer: "Salomão"
  },
  {
    question: "Qual era o nome do profeta que repreendeu Davi por seu pecado com Bate-Seba?",
    options: ["Natã", "Samuel", "Gade", "Aias"],
    answer: "Natã"
  },
  {
    question: "Quem foi o juiz que fez um voto e sacrificou sua filha?",
    options: ["Jefté", "Gideão", "Sansão", "Eli"],
    answer: "Jefté"
  },
  {
    question: "Qual era o nome da mulher que matou Sísera com uma estaca?",
    options: ["Jael", "Débora", "Rute", "Ester"],
    answer: "Jael"
  },
  {
    question: "Quem foi o profeta que viu a glória de Deus em uma visão?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    answer: "Isaías"
  },
  {
    question: "Qual era o nome do rei de Judá que foi levado cativo para a Babilônia?",
    options: ["Zedequias", "Jeoaquim", "Joaquim", "Manassés"],
    answer: "Zedequias"
  },
  {
    question: "Quem foi o profeta que anunciou a destruição de Nínive?",
    options: ["Naum", "Jonas", "Habacuque", "Sofonias"],
    answer: "Naum"
  },
  {
    question: "Qual era o nome do anjo que anunciou o nascimento de Jesus a Maria?",
    options: ["Gabriel", "Miguel", "Rafael", "Uriel"],
    answer: "Gabriel"
  },
  {
    question: "Quem foi o discípulo que Jesus amava, segundo o Evangelho de João?",
    options: ["João", "Pedro", "Tiago", "André"],
    answer: "João"
  },
  {
    question: "Qual era o nome do homem que ajudou Jesus a carregar a cruz?",
    options: ["Simão de Cirene", "José de Arimateia", "Nicodemos", "Barrabás"],
    answer: "Simão de Cirene"
  },
  {
    question: "Quem foi o governador romano que julgou Jesus?",
    options: ["Pôncio Pilatos", "Herodes", "César Augusto", "Félix"],
    answer: "Pôncio Pilatos"
  },
  {
    question: "Qual era o nome da ilha onde João recebeu a visão do Apocalipse?",
    options: ["Patmos", "Creta", "Chipre", "Rodes"],
    answer: "Patmos"
  },
  {
    question: "Quem foi o rei de Israel que caiu doente por cobiçar a vinha de Nabote?",
    options: ["Acabe", "Jeroboão", "Jeú", "Omri"],
    answer: "Acabe"
  },
  {
    question: "Qual era o nome do profeta que ungiu Saul como rei?",
    options: ["Samuel", "Natã", "Gade", "Aias"],
    answer: "Samuel"
  },
  {
    question: "Quem foi o rei que dividiu o reino de Israel após Salomão?",
    options: ["Roboão", "Jeroboão", "Abias", "Asa"],
    answer: "Roboão"
  },
  {
    question: "Qual era o nome do servo de Eliseu que ficou leproso por cobiça?",
    options: ["Geazi", "Naamã", "Hazael", "Ben-Hadade"],
    answer: "Geazi"
  },
  {
    question: "Quem foi o profeta que previu a seca em Israel?",
    options: ["Elias", "Eliseu", "Amós", "Oséias"],
    answer: "Elias"
  },
  {
    question: "Qual era o nome da mulher que escondeu os espiões em Jericó?",
    options: ["Raabe", "Tamar", "Rute", "Bate-Seba"],
    answer: "Raabe"
  },
  {
    question: "Quem foi o rei que queimou o rolo escrito por Jeremias?",
    options: ["Joaquim", "Zedequias", "Jeoaquim", "Manassés"],
    answer: "Jeoaquim"
  },
  {
    question: "Qual era o nome do profeta que casou com a viúva de um profeta?",
    options: ["Eliseu", "Elias", "Isaías", "Jeremias"],
    answer: "Eliseu"
  },
  {
    question: "Quem foi o sacerdote que reconstruiu o templo após o exílio?",
    options: ["Esdras", "Neemias", "Zorobabel", "Josué"],
    answer: "Esdras"
  },
  {
    question: "Qual era o nome do governador que reconstruiu os muros de Jerusalém?",
    options: ["Neemias", "Esdras", "Zorobabel", "Dario"],
    answer: "Neemias"
  },
  {
    question: "Quem foi o profeta que falou sobre o 'Dia do Senhor'?",
    options: ["Joel", "Amós", "Obadias", "Miquéias"],
    answer: "Joel"
  },
  {
    question: "Qual era o nome do rei que libertou os judeus do exílio?",
    options: ["Ciro", "Dario", "Assuero", "Nabucodonosor"],
    answer: "Ciro"
  },
  {
    question: "Quem foi o profeta que viu quatro ferreiros em uma visão?",
    options: ["Zacarias", "Ageu", "Malaquias", "Daniel"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do profeta que repreendeu o povo por negligenciar o templo?",
    options: ["Ageu", "Zacarias", "Malaquias", "Joel"],
    answer: "Ageu"
  },
  {
    question: "Quem foi o último profeta do Antigo Testamento?",
    options: ["Malaquias", "Zacarias", "Ageu", "Joel"],
    answer: "Malaquias"
  },
  {
    question: "Qual era o nome do homem rico que perguntou a Jesus sobre a vida eterna?",
    options: ["Jovem rico", "Zaqueu", "Nicodemos", "Lázaro"],
    answer: "Jovem rico"
  },
  {
    question: "Quem foi o publicano que subiu em uma árvore para ver Jesus?",
    options: ["Zaqueu", "Mateus", "Levi", "Judas"],
    answer: "Zaqueu"
  },
  {
    question: "Qual era o nome do cego que Jesus curou em Jericó?",
    options: ["Bartimeu", "Lázaro", "Malco", "Simão"],
    answer: "Bartimeu"
  },
  {
    question: "Quem foi o homem que Jesus ressuscitou em Betânia?",
    options: ["Lázaro", "Jairo", "Bartimeu", "Malco"],
    answer: "Lázaro"
  },
  {
    question: "Qual era o nome da irmã de Lázaro que ungiu os pés de Jesus?",
    options: ["Maria", "Marta", "Salomé", "Joana"],
    answer: "Maria"
  },
  {
    question: "Quem foi o discípulo que cortou a orelha do servo do sumo sacerdote?",
    options: ["Pedro", "João", "Tiago", "Judas"],
    answer: "Pedro"
  },
  {
    question: "Qual era o nome do servo cuja orelha foi cortada?",
    options: ["Malco", "Bartimeu", "Simão", "Lázaro"],
    answer: "Malco"
  },
  {
    question: "Quem foi o apóstolo que pregou no Pentecostes?",
    options: ["Pedro", "Paulo", "João", "Tiago"],
    answer: "Pedro"
  },
  {
    question: "Qual era o nome da viúva que deu tudo o que tinha no templo?",
    options: ["Viúva pobre", "Ana", "Tabita", "Lídia"],
    answer: "Viúva pobre"
  },
  {
    question: "Quem foi a mulher que ajudou Paulo e foi chamada de diaconisa?",
    options: ["Febe", "Lídia", "Priscila", "Dorcas"],
    answer: "Febe"
  },
  {
    question: "Qual era o nome da mulher que vendia púrpura e ajudou Paulo?",
    options: ["Lídia", "Febe", "Priscila", "Dorcas"],
    answer: "Lídia"
  },
  {
    question: "Quem foi a mulher ressuscitada por Pedro em Jope?",
    options: ["Tabita", "Lídia", "Febe", "Priscila"],
    answer: "Tabita"
  },
  {
    question: "Qual era o nome do centurião que se converteu em Cesareia?",
    options: ["Cornélio", "Júlio", "Félix", "Festo"],
    answer: "Cornélio"
  },
  {
    question: "Quem foi o rei que ouviu Paulo e quase se converteu?",
    options: ["Agripa", "Herodes", "Pilatos", "Félix"],
    answer: "Agripa"
  },
  {
    question: "Qual era o nome do carcereiro que se converteu após o terremoto?",
    options: ["Carcereiro de Filipos", "Cornélio", "Júlio", "Félix"],
    answer: "Carcereiro de Filipos"
  },
  // Início das 100 novas perguntas de nível difícil e muito difícil
  {
    question: "Qual era o nome do sacerdote que abençoou Abraão após a batalha dos reis?",
    options: ["Melquisedeque", "Arão", "Eli", "Fineias"],
    answer: "Melquisedeque"
  },
  {
    question: "Quem foi o filho de Davi que se rebelou contra ele e morreu pendurado em uma árvore?",
    options: ["Absalão", "Salomão", "Adonias", "Amnom"],
    answer: "Absalão"
  },
  {
    question: "Qual era o nome do gigante filisteu que tinha irmãos também gigantes?",
    options: ["Golias", "Isbi-Benobe", "Laquis", "Sama"],
    answer: "Golias"
  },
  {
    question: "Quem foi o profeta que previu que um rei chamado Josias queimaria ossos sobre o altar?",
    options: ["Homem de Deus de Judá", "Elias", "Eliseu", "Samuel"],
    answer: "Homem de Deus de Judá"
  },
  {
    question: "Qual era o nome do rei de Israel que foi ferido por uma flecha perdida em Ramote-Gileade?",
    options: ["Acabe", "Jeú", "Jeroboão", "Omri"],
    answer: "Acabe"
  },
  {
    question: "Quem foi o rei de Judá que teve seus olhos arrancados após ver seus filhos mortos?",
    options: ["Zedequias", "Jeoaquim", "Joaquim", "Manassés"],
    answer: "Zedequias"
  },
  {
    question: "Qual era o nome do profeta que foi jogado em uma cisterna por ordem do rei Zedequias?",
    options: ["Jeremias", "Isaías", "Ezequiel", "Daniel"],
    answer: "Jeremias"
  },
  {
    question: "Quem foi o escriba que leu o Livro da Lei ao povo na praça após o exílio?",
    options: ["Esdras", "Neemias", "Baruque", "Zorobabel"],
    answer: "Esdras"
  },
  {
    question: "Qual era o nome do rei assírio que conquistou o Reino do Norte de Israel?",
    options: ["Salmanasar", "Senaqueribe", "Tiglate-Pileser", "Nabucodonosor"],
    answer: "Salmanasar"
  },
  {
    question: "Quem foi o rei babilônico que destruiu Jerusalém e o templo de Salomão?",
    options: ["Nabucodonosor", "Belsazar", "Dario", "Ciro"],
    answer: "Nabucodonosor"
  },
  {
    question: "Qual era o nome do eunuco que resgatou Jeremias da cisterna?",
    options: ["Ebede-Meleque", "Baruque", "Gedalias", "Seraías"],
    answer: "Ebede-Meleque"
  },
  {
    question: "Quem foi o profeta que escreveu lamentações após a destruição de Jerusalém?",
    options: ["Jeremias", "Ezequiel", "Daniel", "Isaías"],
    answer: "Jeremias"
  },
  {
    question: "Qual era o nome do rei persa que permitiu a reconstrução do templo em Jerusalém?",
    options: ["Dario", "Ciro", "Assuero", "Artaxerxes"],
    answer: "Dario"
  },
  {
    question: "Quem foi o profeta que desafiou os sacerdotes de Baal e Asherah em Samaria?",
    options: ["Elias", "Eliseu", "Oséias", "Miquéias"],
    answer: "Elias"
  },
  {
    question: "Qual era o nome do general sírio curado da lepra por Eliseu?",
    options: ["Naamã", "Hazael", "Ben-Hadade", "Geazi"],
    answer: "Naamã"
  },
  {
    question: "Quem foi o rei de Israel que matou Acabe e Jezabel cumprindo a profecia?",
    options: ["Jeú", "Jeroboão", "Baasa", "Omri"],
    answer: "Jeú"
  },
  {
    question: "Qual era o nome do filho de Saul que reinou por dois anos em Israel?",
    options: ["Isbosete", "Jônatas", "Mefibosete", "Abinadabe"],
    answer: "Isbosete"
  },
  {
    question: "Quem foi o neto de Saul que Davi poupou por amor a Jônatas?",
    options: ["Mefibosete", "Isbosete", "Abinadabe", "Malquisua"],
    answer: "Mefibosete"
  },
  {
    question: "Qual era o nome do sacerdote que serviu no tabernáculo em Siló?",
    options: ["Eli", "Samuel", "Fineias", "Hofni"],
    answer: "Eli"
  },
  {
    question: "Quem foi o juiz de Israel que derrotou os midianitas com 300 homens?",
    options: ["Gideão", "Sansão", "Jefté", "Barak"],
    answer: "Gideão"
  },
  {
    question: "Qual era o nome do rei moabita que sacrificou seu filho na muralha?",
    options: ["Mesa", "Eglom", "Balac", "Seom"],
    answer: "Mesa"
  },
  {
    question: "Quem foi o profeta que viu uma visão do trono de Deus com quatro seres viventes?",
    options: ["Ezequiel", "Isaías", "Daniel", "João"],
    answer: "Ezequiel"
  },
  {
    question: "Qual era o nome do rei edomita que recusou passagem aos israelitas no deserto?",
    options: ["Hadade", "Seom", "Ogue", "Balac"],
    answer: "Hadade"
  },
  {
    question: "Quem foi o rei de Judá que removeu os altares pagãos e foi elogiado por Deus?",
    options: ["Ezequias", "Josias", "Asa", "Joás"],
    answer: "Ezequias"
  },
  {
    question: "Qual era o nome do profeta que confrontou Acabe por roubar a vinha de Nabote?",
    options: ["Elias", "Eliseu", "Miquéias", "Natã"],
    answer: "Elias"
  },
  {
    question: "Quem foi o rei de Israel que construiu Samaria como capital?",
    options: ["Omri", "Acabe", "Jeroboão", "Baasa"],
    answer: "Omri"
  },
  {
    question: "Qual era o nome do sacerdote que coroou Joás como rei de Judá?",
    options: ["Joiada", "Zadoque", "Abiatar", "Esdras"],
    answer: "Joiada"
  },
  {
    question: "Quem foi o profeta que previu a queda de Jerusalém para os caldeus?",
    options: ["Jeremias", "Ezequiel", "Isaías", "Daniel"],
    answer: "Jeremias"
  },
  {
    question: "Qual era o nome do rei de Judá que foi morto por seus servos em conspiração?",
    options: ["Amom", "Manassés", "Acaz", "Jotão"],
    answer: "Amom"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um rolo voador?",
    options: ["Zacarias", "Ezequiel", "Daniel", "Isaías"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do rei persa que ordenou a reconstrução de Jerusalém?",
    options: ["Artaxerxes", "Ciro", "Dario", "Assuero"],
    answer: "Artaxerxes"
  },
  {
    question: "Quem foi o profeta que previu a destruição de Edom?",
    options: ["Obadias", "Naum", "Habacuque", "Sofonias"],
    answer: "Obadias"
  },
  {
    question: "Qual era o nome do rei de Judá que fez aliança com o Egito contra a Babilônia?",
    options: ["Joaquim", "Zedequias", "Jeoaquim", "Josias"],
    answer: "Joaquim"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um cesto de frutos maduros?",
    options: ["Amós", "Oséias", "Joel", "Miquéias"],
    answer: "Amós"
  },
  {
    question: "Qual era o nome do rei de Israel que caiu de uma janela e morreu?",
    options: ["Acazias", "Jeorão", "Jeroboão", "Baasa"],
    answer: "Acazias"
  },
  {
    question: "Quem foi o profeta que repreendeu Davi por contar o povo?",
    options: ["Gade", "Natã", "Samuel", "Aias"],
    answer: "Gade"
  },
  {
    question: "Qual era o nome do rei filisteu que abrigou Davi em Ziclague?",
    options: ["Aquis", "Abimeleque", "Aitofel", "Ainã"],
    answer: "Aquis"
  },
  {
    question: "Quem foi o rei de Judá que foi levado para a Babilônia com ganchos?",
    options: ["Jeoaquim", "Zedequias", "Joaquim", "Manassés"],
    answer: "Jeoaquim"
  },
  {
    question: "Qual era o nome do profeta que anunciou a vinda de um precursor do Messias?",
    options: ["Malaquias", "Isaías", "Jeremias", "Zacarias"],
    answer: "Malaquias"
  },
  {
    question: "Quem foi o rei de Israel que instalou bezerros de ouro em Betel e Dã?",
    options: ["Jeroboão", "Acabe", "Omri", "Jeú"],
    answer: "Jeroboão"
  },
  {
    question: "Qual era o nome do servo de Abraão que buscou uma esposa para Isaque?",
    options: ["Eliézer", "Ló", "Ismael", "Zicri"],
    answer: "Eliézer"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um homem montado em um cavalo vermelho?",
    options: ["Zacarias", "Ageu", "Daniel", "Ezequiel"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do rei de Judá que foi curado de uma doença mortal por Deus?",
    options: ["Ezequias", "Josias", "Asa", "Jotão"],
    answer: "Ezequias"
  },
  {
    question: "Quem foi o profeta que previu o nascimento de uma criança chamada Emanuel?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    answer: "Isaías"
  },
  {
    question: "Qual era o nome do rei moabita que contratou Balaão para amaldiçoar Israel?",
    options: ["Balac", "Eglom", "Mesa", "Seom"],
    answer: "Balac"
  },
  {
    question: "Quem foi o profeta que foi apedrejado por ordem de Joiakim?",
    options: ["Urias", "Jeremias", "Habacuque", "Sofonias"],
    answer: "Urias"
  },
  {
    question: "Qual era o nome do rei de Judá que reinou por apenas três meses antes do exílio?",
    options: ["Jeconias", "Zedequias", "Joaquim", "Jeoaquim"],
    answer: "Jeconias"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um candelabro de ouro?",
    options: ["Zacarias", "Ezequiel", "Daniel", "Isaías"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do rei de Judá que foi assassinado por seus oficiais?",
    options: ["Joás", "Amazias", "Uzias", "Jotão"],
    answer: "Joás"
  },
  {
    question: "Quem foi o profeta que viu uma visão de uma mulher em um cesto?",
    options: ["Zacarias", "Ezequiel", "Amós", "Oséias"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do rei de Israel que foi devorado por cães, cumprindo a profecia?",
    options: ["Jeroboão II", "Acabe", "Jeorão", "Omri"],
    answer: "Jeorão"
  },
  {
    question: "Quem foi o profeta que viu uma visão de quatro chifres e quatro ferreiros?",
    options: ["Zacarias", "Daniel", "Ezequiel", "Isaías"],
    answer: "Zacarias"
  },
  {
    question: "Qual era o nome do sacerdote que foi morto por ordem de Saul em Nobe?",
    options: ["Aimeleque", "Abiatar", "Zadoque", "Eli"],
    answer: "Aimeleque"
  },
  {
    question: "Quem foi o profeta que anunciou a destruição de Tiro e Sidom?",
    options: ["Ezequiel", "Isaías", "Jeremias", "Amós"],
    answer: "Ezequiel"
  },
  {
    question: "Qual era o nome do rei de Judá que ficou leproso por queimar incenso no templo?",
    options: ["Uzias", "Jotão", "Acaz", "Ezequias"],
    answer: "Uzias"
  },
  {
    question: "Quem foi o profeta que viu uma visão de uma estátua de quatro metais?",
    options: ["Daniel", "Ezequiel", "Isaías", "Jeremias"],
    answer: "Daniel"
  },
  {
    question: "Qual era o nome do rei de Judá que foi levado ao Egito como prisioneiro?",
    options: ["Oséias", "Jeoacaz", "Jeoaquim", "Zedequias"],
    answer: "Jeoacaz"
  },
  {
    question: "Quem foi o profeta que interpretou a escrita na parede para Belsazar?",
    options: ["Daniel", "Ezequiel", "Jeremias", "Isaías"],
    answer: "Daniel"
  },
  {
    question: "Qual era o nome do rei de Judá que se escondeu em cavernas do rei Saul?",
    options: ["Davi", "Salomão", "Saul", "Roboão"],
    answer: "Davi"
  },
  {
    question: "Quem foi o profeta que previu o exílio de Judá por 70 anos?",
    options: ["Jeremias", "Isaías", "Ezequiel", "Daniel"],
    answer: "Jeremias"
  },
  {
    question: "Qual era o nome do rei de Israel que foi amaldiçoado por consultar a feiticeira de En-Dor?",
    options: ["Saul", "Jeroboão", "Acabe", "Jeú"],
    answer: "Saul"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um vale de ossos secos?",
    options: ["Ezequiel", "Daniel", "Isaías", "Jeremias"],
    answer: "Ezequiel"
  },
  {
    question: "Qual era o nome do rei de Judá que foi poupado por Nabucodonosor em seu primeiro cerco?",
    options: ["Joaquim", "Zedequias", "Jeoaquim", "Jeconias"],
    answer: "Joaquim"
  },
  {
    question: "Quem foi o profeta que anunciou o julgamento de Damasco, Gaza e Tiro?",
    options: ["Amós", "Oséias", "Joel", "Miquéias"],
    answer: "Amós"
  },
  {
    question: "Qual era o nome do rei de Israel que reinou por apenas sete dias?",
    options: ["Zinri", "Omri", "Baasa", "Elá"],
    answer: "Zinri"
  },
  {
    question: "Quem foi o profeta que viu uma visão de sete candelabros no Apocalipse?",
    options: ["João", "Daniel", "Ezequiel", "Isaías"],
    answer: "João"
  },
  {
    question: "Qual era o nome do rei de Judá que foi morto pelos egípcios em Megido?",
    options: ["Josias", "Ezequias", "Joás", "Amazias"],
    answer: "Josias"
  },
  {
    question: "Quem foi o profeta que anunciou o julgamento contra Moabe e Amom?",
    options: ["Jeremias", "Ezequiel", "Isaías", "Amós"],
    answer: "Jeremias"
  },
  {
    question: "Qual era o nome do rei de Judá que viu o sol retroceder como sinal de Deus?",
    options: ["Ezequias", "Josias", "Asa", "Joás"],
    answer: "Ezequias"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um livro selado com sete selos?",
    options: ["João", "Daniel", "Ezequiel", "Isaías"],
    answer: "João"
  },
  {
    question: "Qual era o nome do rei de Israel que foi morto por seu servo Zinri?",
    options: ["Elá", "Baasa", "Omri", "Tibni"],
    answer: "Elá"
  },
  {
    question: "Quem foi o profeta que anunciou o julgamento contra a casa de Acabe?",
    options: ["Elias", "Eliseu", "Miquéias", "Natã"],
    answer: "Elias"
  },
  {
    question: "Qual era o nome do rei de Judá que foi ferido em batalha contra os sírios?",
    options: ["Jeorão", "Acazias", "Joás", "Amazias"],
    answer: "Jeorão"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um chifre pequeno em Daniel?",
    options: ["Daniel", "Ezequiel", "Isaías", "Jeremias"],
    answer: "Daniel"
  },
  {
    question: "Qual era o nome do rei de Judá que foi morto por Jeú junto com Acazias?",
    options: ["Jeorão", "Acaz", "Jotão", "Amazias"],
    answer: "Jeorão"
  },
  {
    question: "Quem foi o profeta que anunciou o julgamento contra Judá por seus pecados?",
    options: ["Miquéias", "Oséias", "Joel", "Amós"],
    answer: "Miquéias"
  },
  {
    question: "Qual era o nome do rei de Israel que foi sucedido por seu filho Acazias?",
    options: ["Acabe", "Jeroboão", "Omri", "Jeú"],
    answer: "Acabe"
  },
  {
    question: "Quem foi o profeta que viu uma visão de um novo templo em Jerusalém?",
    options: ["Ezequiel", "Daniel", "Isaías", "Jeremias"],
    answer: "Ezequiel"
  },
  {
    question: "Qual era o nome do rei de Judá que foi capturado por faraó Neco?",
    options: ["Jeoacaz", "Josias", "Joaquim", "Zedequias"],
    answer: "Jeoacaz"
  },
  {
    question: "Quem foi o profeta que anunciou a destruição de Samaria?",
    options: ["Oséias", "Amós", "Miquéias", "Joel"],
    answer: "Oséias"
  },
  {
    question: "Qual era o nome do rei de Judá que viu a destruição do templo em seu reinado?",
    options: ["Zedequias", "Joaquim", "Jeoaquim", "Jeconias"],
    answer: "Zedequias"
  },
  {
    question: "Quem foi o profeta que anunciou o julgamento contra os filisteus?",
    options: ["Jeremias", "Ezequiel", "Isaías", "Amós"],
    answer: "Jeremias"
  },

  {
      question: "Qual era o nome do monte onde Moisés recebeu os Dez Mandamentos?",
      options: ["Sinai", "Horebe", "Moriá", "Nebo"],
      answer: "Sinai"
    },
    {
      question: "Quem foi o pai de Jacó e Esaú?",
      options: ["Isaque", "Abraão", "Ló", "Labão"],
      answer: "Isaque"
    },
    {
      question: "Qual era o nome da esposa de Jacó que ele mais amava?",
      options: ["Raquel", "Lia", "Bila", "Zilpa"],
      answer: "Raquel"
    },
    {
      question: "Quem foi o filho de Davi que sucedeu ao trono de Israel?",
      options: ["Salomão", "Absalão", "Adonias", "Amnom"],
      answer: "Salomão"
    },
    {
      question: "Qual era o nome do rio que os israelitas atravessaram para entrar em Canaã?",
      options: ["Jordão", "Nilo", "Eufrates", "Tigre"],
      answer: "Jordão"
    },
    {
      question: "Quem foi o juiz que destruiu o templo de Dagom ao derrubar suas colunas?",
      options: ["Sansão", "Gideão", "Jefté", "Barak"],
      answer: "Sansão"
    },
    {
      question: "Qual era o nome da cidade que caiu quando os israelitas marcharam ao seu redor?",
      options: ["Jericó", "Ai", "Hebron", "Betel"],
      answer: "Jericó"
    },
    {
      question: "Quem foi o profeta que ungiu Davi como rei de Israel?",
      options: ["Samuel", "Natã", "Gade", "Elias"],
      answer: "Samuel"
    },
    {
      question: "Qual era o nome da mulher que se tornou rainha após Vasti ser deposta?",
      options: ["Ester", "Débora", "Rute", "Abigail"],
      answer: "Ester"
    },
    {
      question: "Quem foi o discípulo que substituiu Judas Iscariotes entre os apóstolos?",
      options: ["Matias", "Barnabé", "Silas", "Estevão"],
      answer: "Matias"
    },
    {
      question: "Qual era o nome do monte onde Jesus foi transfigurado?",
      options: ["Tabor", "Sinai", "Carmelo", "das Oliveiras"],
      answer: "Tabor"
    },
    {
      question: "Quem foi o apóstolo que escreveu o livro de Apocalipse?",
      options: ["João", "Paulo", "Pedro", "Tiago"],
      answer: "João"
    },
    {
      question: "Qual era o nome do homem que ofereceu seu túmulo para sepultar Jesus?",
      options: ["José de Arimateia", "Nicodemos", "Simão", "Zaqueu"],
      answer: "José de Arimateia"
    },
    {
      question: "Quem foi o profeta que predisse que Jesus nasceria de uma virgem?",
      options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
      answer: "Isaías"
    },
    {
      question: "Qual era o nome da cidade onde Jonas pregou após sair do peixe?",
      options: ["Nínive", "Társis", "Jope", "Damasco"],
      answer: "Nínive"
    },
    {
      question: "Quem foi o rei de Israel que dançou diante da Arca da Aliança?",
      options: ["Davi", "Saul", "Salomão", "Roboão"],
      answer: "Davi"
    },
    {
      question: "Qual era o nome da mãe de Samuel, que o dedicou ao Senhor?",
      options: ["Ana", "Penina", "Miriã", "Débora"],
      answer: "Ana"
    },
    {
      question: "Quem foi o irmão de José que o reconheceu no Egito?",
      options: ["Judá", "Rúben", "Simeão", "Levi"],
      answer: "Judá"
    },
    {
      question: "Qual era o nome do monte onde Abraão quase sacrificou Isaque?",
      options: ["Moriá", "Sinai", "Horebe", "Nebo"],
      answer: "Moriá"
    },
    {
      question: "Quem foi a mulher que deu à luz Sansão?",
      options: ["Manoá", "Dalila", "Jael", "Débora"],
      answer: "Manoá"
    },
    {
      question: "Qual era o nome do profeta que predisse a morte de Acabe em batalha?",
      options: ["Miquéias", "Elias", "Eliseu", "Natã"],
      answer: "Miquéias"
    },
    {
      question: "Quem foi o rei de Judá que reparou o templo com a ajuda de Joiada?",
      options: ["Joás", "Ezequias", "Josias", "Asa"],
      answer: "Joás"
    },
    {
      question: "Qual era o nome da cidade onde Paulo foi preso após um tumulto?",
      options: ["Jerusalém", "Éfeso", "Filipas", "Antioquia"],
      answer: "Jerusalém"
    },
    {
      question: "Quem foi o apóstolo que acompanhou Paulo em muitas de suas viagens?",
      options: ["Barnabé", "Pedro", "Tiago", "André"],
      answer: "Barnabé"
    },
    {
      question: "Qual era o nome da mãe de Ismael, serva de Sara?",
      options: ["Agar", "Rebeca", "Quetura", "Zilpa"],
      answer: "Agar"
    },
    {
      question: "Quem foi o profeta que chamou fogo do céu para consumir um sacrifício?",
      options: ["Elias", "Eliseu", "Isaías", "Jeremias"],
      answer: "Elias"
    },
    {
      question: "Qual era o nome do rei que pediu sabedoria a Deus em um sonho?",
      options: ["Salomão", "Davi", "Saul", "Josias"],
      answer: "Salomão"
    },
    {
      question: "Quem foi o homem que liderou os israelitas na conquista de Canaã?",
      options: ["Josué", "Moisés", "Calebe", "Arão"],
      answer: "Josué"
    },
    {
      question: "Qual era o nome da cidade natal de Davi?",
      options: ["Belém", "Jerusalém", "Hebron", "Siquém"],
      answer: "Belém"
    },
    {
      question: "Quem foi a mulher que ofereceu água a Davi e seus homens?",
      options: ["Abigail", "Mical", "Bate-Seba", "Tamar"],
      answer: "Abigail"
    },
    {
      question: "Qual era o nome do profeta que foi contemporâneo de Jeremias no exílio?",
      options: ["Ezequiel", "Daniel", "Isaías", "Oséias"],
      answer: "Ezequiel"
    },
    {
      question: "Quem foi o rei de Judá que enfrentou Senaqueribe da Assíria?",
      options: ["Ezequias", "Josias", "Manassés", "Acaz"],
      answer: "Ezequias"
    },
    {
      question: "Qual era o nome do irmão de Miriã e Moisés?",
      options: ["Arão", "Josué", "Calebe", "Hur"],
      answer: "Arão"
    },
    {
      question: "Quem foi o profeta que repreendeu Israel por adorar ídolos em Betel?",
      options: ["Amós", "Oséias", "Joel", "Miquéias"],
      answer: "Amós"
    },
    {
      question: "Qual era o nome do rei que ofereceu presentes a Jesus ao nascer?",
      options: ["Herodes", "Magos", "Pilatos", "César"],
      answer: "Magos"
    },
    {
      question: "Quem foi o discípulo que perguntou a Jesus sobre o fim dos tempos?",
      options: ["Pedro", "João", "Tiago", "André"],
      answer: "Pedro"
    },
    {
      question: "Qual era o nome da cidade onde Jesus transformou água em vinho?",
      options: ["Caná", "Nazaré", "Cafarnaum", "Betânia"],
      answer: "Caná"
    },
    {
      question: "Quem foi o profeta que anunciou a reconstrução de Jerusalém?",
      options: ["Ageu", "Zacarias", "Malaquias", "Joel"],
      answer: "Ageu"
    },
    {
      question: "Qual era o nome do filho de Abraão com Quetura?",
      options: ["Midiã", "Ismael", "Isaque", "Zinri"],
      answer: "Midiã"
    },
    {
      question: "Quem foi o juiz que derrotou os filisteus com uma queixada de jumento?",
      options: ["Sansão", "Gideão", "Jefté", "Otniel"],
      answer: "Sansão"
    },
    {
      question: "Qual era o nome da cidade onde Elias ressuscitou o filho de uma viúva?",
      options: ["Sarepta", "Nínive", "Jericó", "Betel"],
      answer: "Sarepta"
    },
    {
      question: "Quem foi o apóstolo que escreveu epístolas às igrejas de Corinto?",
      options: ["Paulo", "Pedro", "João", "Tiago"],
      answer: "Paulo"
    },
    {
      question: "Qual era o nome do monte onde Jesus orou antes de ser preso?",
      options: ["Getsêmani", "Tabor", "Sinai", "Carmelo"],
      answer: "Getsêmani"
    },
    {
      question: "Quem foi o profeta que predisse a vinda de João Batista?",
      options: ["Malaquias", "Isaías", "Jeremias", "Ezequiel"],
      answer: "Malaquias"
    },
    {
      question: "Qual era o nome da esposa de Elcana que rivalizava com Ana?",
      options: ["Penina", "Miriã", "Débora", "Raquel"],
      answer: "Penina"
    },
    {
      question: "Quem foi o rei de Judá que enfrentou o faraó Neco em Megido?",
      options: ["Josias", "Ezequias", "Joás", "Asa"],
      answer: "Josias"
    },
    {
      question: "Qual era o nome do rio onde Naamã foi curado da lepra?",
      options: ["Jordão", "Nilo", "Eufrates", "Abana"],
      answer: "Jordão"
    },
    {
      question: "Quem foi o discípulo que Jesus chamou de 'pedra'?",
      options: ["Pedro", "Tiago", "João", "André"],
      answer: "Pedro"
    },
    {
      question: "Qual era o nome da cidade onde Paulo pregou sobre o 'Deus Desconhecido'?",
      options: ["Atenas", "Corinto", "Éfeso", "Roma"],
      answer: "Atenas"
    },
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
  // Remove a normalização
  // const normalized = input.normalize('NFC'); // Linha removida
  // Usa regex com Unicode Property Escapes e a flag 'u'
  const allowedCharsRegex = /^[\p{L}0-9 ]+$/u;
  // Testa diretamente o input original
  return allowedCharsRegex.test(input);
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
  if (nameInput.length > 50 || comumInput.length > 50) {
    alert('O nome e a comum devem ter no máximo 50 caracteres.');
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
        if (data[key].userId === userId) {
          const updateRef = ref(db, 'ranking/' + key); // Usa ref e db importados
          // Usa os nomes JÁ SANITIZADOS das variáveis globais
          set(updateRef, { // Usa set importado
            userId: userId,
            name: playerName, // Já sanitizado
            comum: playerComum, // Já sanitizado
            score: data[key].score,
            time: data[key].time
          }).then(() => {
            loadRanking();
          }).catch((error) => {
            console.error("Erro ao atualizar nome no ranking:", error); // Mantém log dev
            alert("Ocorreu um erro ao atualizar seu nome no ranking. Tente novamente."); // Mensagem genérica
            loadRanking(); // Tenta carregar mesmo com erro
          });
          break; // Sai do loop após encontrar e tentar atualizar
        }
      }
      // Se não encontrou a entrada (pode acontecer se for a primeira vez ou erro),
      // o loadRanking() chamado no .then() ou .catch() cuidará da atualização visual.
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
  isGameFinished = false; // Reseta a flag no início de cada jogo

  // 1. Validação da Pontuação no Frontend ANTES de salvar
  if (correctAnswers < 0 || correctAnswers > 10 || totalTime < 0) {
      console.error("Tentativa de salvar pontuação inválida:", { correctAnswers, totalTime });
      alert("Ocorreu um erro ao calcular sua pontuação. Tente novamente.");
      // Ainda mostra o modal de fim de jogo, mas sem salvar
      document.getElementById('questionContainer').style.display = 'none';
      document.getElementById('endgameContainer').style.display = 'block';
      loadRanking(); // Atualiza o ranking mesmo assim
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
      if (data[key].userId === userId) {
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

    // Mostrar mensagem de fim de jogo
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('endgameContainer').style.display = 'block';

    // Atualizar ranking visualmente
    loadRanking();
  }, { onlyOnce: true }); // Executa a consulta apenas uma vez
}

// Botão tentar novamente
document.getElementById('retryButton').addEventListener('click', () => {
  document.getElementById('endgameContainer').style.display = 'none';
  // Não chama startGame diretamente, volta para a saudação se aplicável
  window.location.reload(); // Recarrega a página para reiniciar o fluxo
});

function loadRanking() {
  onValue(dbRefRanking, (snapshot) => { // Usa onValue e dbRefRanking importados
    const data = snapshot.val();
    const rankingArray = [];

    for (let key in data) {
      // Adiciona a chave do Firebase ao objeto para referência, se necessário
      // Adiciona a chave do Firebase e garante que os campos essenciais existam
      if (data[key] && data[key].name && data[key].comum && data[key].userId !== undefined && data[key].score !== undefined && data[key].time !== undefined) {
          rankingArray.push({ ...data[key], firebaseKey: key });
      } else {
          console.warn("Entrada de ranking inválida ou incompleta ignorada:", key, data[key]);
      }
    }

    rankingArray.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // mais acertos primeiro
      } else {
        return a.time - b.time; // menor tempo primeiro
      }
    });

    // Obter posição anterior e timestamp do localStorage
    let previousInfo = JSON.parse(localStorage.getItem('playerRankingInfo') || '{}');
    const now = Date.now();

    // Encontrar posição atual do jogador pelo userId
    let currentPlayerIndex = -1;
    if (userId) { // Busca pelo userId se ele existir
        currentPlayerIndex = rankingArray.findIndex(
            p => p.userId === userId
        );
    }


    let showArrow = false;

    if (currentPlayerIndex !== -1) {
      // Compara com a posição anterior salva para o userId atual
      if (previousInfo.userId === userId) {
        // Se passou mais de 1 hora, não mostrar seta (ou outra lógica de tempo)
        if (now - previousInfo.timestamp < 3600000) {
          if (currentPlayerIndex < previousInfo.position) {
            showArrow = true;
          }
        }
      }
      // Atualizar info no localStorage com userId
      localStorage.setItem('playerRankingInfo', JSON.stringify({
        userId: userId, // Salva userId para comparação futura
        position: currentPlayerIndex,
        timestamp: now
      }));
    }

    rankingBody.innerHTML = '';
    rankingArray.forEach((player, index) => {
      let medalImg = 'participacao.png';
      if(index === 0) medalImg = 'ouro.png';
      else if(index === 1) medalImg = 'prata.png';
      else if(index === 2) medalImg = 'bronze.png';

      // Verifica se 'name' e 'comum' existem antes de tentar acessar 'length'
      // Sanitiza os nomes ANTES de exibi-los
      const sanitizedName = sanitizeInput(player.name || '');
      const sanitizedComum = sanitizeInput(player.comum || '');

      // Trunca nomes longos APÓS sanitizar
      const displayName = sanitizedName.length > 20 ? sanitizedName.substring(0, 20) + '...' : sanitizedName || 'Nome inválido';
      const displayComum = sanitizedComum.length > 20 ? sanitizedComum.substring(0, 20) + '...' : sanitizedComum || 'Comum inválida';

      const arrow = (showArrow && index === currentPlayerIndex) ? ' <span style="color:green;">▲</span>' : ''; // Usando ▲ para seta

      const tr = document.createElement('tr');

      // Cria células usando textContent para segurança
      const tdRank = document.createElement('td');
      const img = document.createElement('img');
      img.src = medalImg;
      img.alt = 'medalha';
      img.className = 'medalha';
      tdRank.appendChild(img);
      // Adiciona o nome e a seta (a seta é HTML seguro)
      tdRank.innerHTML += ` ${displayName}${arrow}`; // innerHTML seguro aqui pois displayName é sanitizado e arrow é controlado

      const tdComum = document.createElement('td');
      tdComum.textContent = displayComum; // Usa textContent

      const tdScore = document.createElement('td');
      tdScore.textContent = player.score !== undefined ? player.score : '-'; // Usa textContent

      const tdTime = document.createElement('td');
      tdTime.textContent = player.time !== undefined ? player.time : '-'; // Usa textContent

      tr.appendChild(tdRank);
      tr.appendChild(tdComum);
      tr.appendChild(tdScore);
      tr.appendChild(tdTime);

      rankingBody.appendChild(tr);
    });
  }, (error) => {
      console.error("Erro ao carregar ranking:", error);
      alert("Não foi possível carregar o ranking. Verifique sua conexão.");
  });
}

const toggleRankingBtn = document.getElementById('toggleRanking');
const rankingContainer = document.querySelector('.ranking-container');

toggleRankingBtn.addEventListener('click', () => {
  if (rankingContainer.style.display === 'none' || rankingContainer.style.display === '') {
    rankingContainer.style.display = 'block';
    toggleRankingBtn.textContent = 'Esconder Ranking';
  } else {
    rankingContainer.style.display = 'none';
    toggleRankingBtn.textContent = 'Mostrar Ranking';
  }
});

// Evento do botão "Começar" da saudação personalizada
// (Removido pois não existe mais modal)

// Carregar ranking ao abrir
loadRanking();


// --- Listener para o evento de conexão do Firebase ---
// Ouve a mudança de estado da conexão disparada pelo index.html
window.addEventListener('firebaseconnectionchange', (event) => {
    // A variável firebaseConnected importada reflete o estado atual
    // Mas podemos usar o detalhe do evento se precisarmos de lógica específica aqui.
    // const isConnected = event.detail.connected;
    // console.log(`Script.js notificado: Conexão Firebase ${isConnected ? 'estabelecida' : 'perdida'}.`);

    // Tenta inicializar a presença SE conectado
    if (firebaseConnected) {
        tryInitializePresence();
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
            window.onDisconnect(userStatusRef).set(offlineStatus).catch((err) => {
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
