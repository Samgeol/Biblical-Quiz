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
  }
];

let currentQuestion = 0;
let correctAnswers = 0;
let startTime;
let timerInterval;
let playerName = "";
let playerComum = "";

const startModal = document.getElementById('startModal');
const startButton = document.getElementById('startButton');
const playerNameInput = document.getElementById('playerName');
const playerComumInput = document.getElementById('playerComum');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const timerDisplay = document.getElementById('timer');
const rankingBody = document.getElementById('rankingBody');

startButton.addEventListener('click', () => {
  const name = playerNameInput.value.trim();
  const comum = playerComumInput.value.trim();
  if (!name || !comum) {
    alert('Por favor, preencha seu nome e sua comum.');
    return;
  }
  playerName = name;
  playerComum = comum;

  // Salvar no localStorage
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('playerComum', playerComum);

  startModal.style.display = 'none';
  startGame();
});

// Carregar nome e comum do localStorage
window.addEventListener('load', () => {
  const savedName = localStorage.getItem('playerName');
  const savedComum = localStorage.getItem('playerComum');
  if(savedName && savedComum) {
    playerName = savedName;
    playerComum = savedComum;
    playerNameInput.value = savedName;
    playerComumInput.value = savedComum;
    startModal.style.display = 'none';
    startGame();
  }
});

function startGame() {
  currentQuestion = 0;
  correctAnswers = 0;

  // Selecionar aleatoriamente 10 perguntas
  const shuffled = questions.sort(() => 0.5 - Math.random());
  window.selectedQuestions = shuffled.slice(0, 10);

  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function showQuestion() {
  if (currentQuestion >= window.selectedQuestions.length) {
    endGame();
    return;
  }

  const q = window.selectedQuestions[currentQuestion];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = '';

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const buttons = optionsContainer.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  if (button.textContent === correctAnswer) {
    button.classList.add('correct');
    correctAnswers++;
  } else {
    button.classList.add('wrong');
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  const totalTime = Math.floor((Date.now() - startTime) / 1000);

  // Verificar se já existe pontuação para esse jogador
  window.onValue(window.dbRef, (snapshot) => {
    const data = snapshot.val();
    let existingKey = null;
    let existingScore = -1;
    let existingTime = Infinity;

    for (let key in data) {
      if (data[key].name === playerName && data[key].comum === playerComum) {
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
        const updateRef = ref(window.db, 'ranking/' + existingKey);
        set(updateRef, {
          name: playerName,
          comum: playerComum,
          score: correctAnswers,
          time: totalTime
        });
      } else {
        // Criar nova pontuação
        window.push(window.dbRef, {
          name: playerName,
          comum: playerComum,
          score: correctAnswers,
          time: totalTime
        });
      }
    }

    // Mostrar mensagem de fim de jogo
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('endgameContainer').style.display = 'block';

    // Atualizar ranking
    loadRanking();
  }, { onlyOnce: true });
}

// Botão tentar novamente
document.getElementById('retryButton').addEventListener('click', () => {
  document.getElementById('endgameContainer').style.display = 'none';
  document.getElementById('questionContainer').style.display = 'block';
  startGame();
});

function loadRanking() {
  window.onValue(window.dbRef, (snapshot) => {
    const data = snapshot.val();
    const rankingArray = [];

    for (let key in data) {
      rankingArray.push(data[key]);
    }

    rankingArray.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // mais acertos primeiro
      } else {
        return a.time - b.time; // menor tempo primeiro
      }
    });

    rankingBody.innerHTML = '';
    rankingArray.forEach((player, index) => {
      let medalImg = 'participacao.png';
      if(index === 0) medalImg = 'ouro.png';
      else if(index === 1) medalImg = 'prata.png';
      else if(index === 2) medalImg = 'bronze.png';

      const name = player.name.length > 20 ? player.name.substring(0, 20) + '...' : player.name;
      const comum = player.comum.length > 20 ? player.comum.substring(0, 20) + '...' : player.comum;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${medalImg}" alt="medalha" class="medalha"> ${name}</td>
        <td>${comum}</td>
        <td>${player.score}</td>
        <td>${player.time}</td>
      `;
      rankingBody.appendChild(tr);
    });
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

// Carregar ranking ao abrir
loadRanking();
