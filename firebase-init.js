// firebase-init.js

// Importações do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
  serverTimestamp,
  onDisconnect,
  goOffline
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Importa a função para obter a configuração decodificada
import { getFirebaseConfig } from './firebase-config.js';

// Obtém a configuração decodificada e inicializa o app
const app = initializeApp(getFirebaseConfig());

// Exporta as funções e objetos necessários para outros módulos
const db = getDatabase(app);
const dbRefRanking = ref(db, 'ranking'); // Referência específica do ranking
let firebaseConnected = false; // Mantém o status localmente

// Listener para verificar status da conexão e definir a flag local
const connectedRef = ref(db, '.info/connected');
onValue(connectedRef, (snap) => {
  const isConnected = snap.val() === true;
  if (isConnected !== firebaseConnected) { // Atualiza apenas na mudança de estado
      firebaseConnected = isConnected; // Atualiza a variável local exportada
      console.log(firebaseConnected ? "Conectado ao Firebase Realtime Database." : "Desconectado do Firebase Realtime Database.");
      // Dispara um evento customizado para notificar outros scripts (como script.js)
      window.dispatchEvent(new CustomEvent('firebaseconnectionchange', { detail: { connected: firebaseConnected } }));
  }
});

console.log("Firebase SDK inicializado em firebase-init.js");

// Exporta tudo que script.js precisa
export {
  db,
  dbRefRanking, // Exporta a referência específica do ranking
  ref,          // Exporta a função ref original
  push,
  onValue,
  set,
  serverTimestamp,
  onDisconnect,
  goOffline,
  firebaseConnected // Exporta o status da conexão
};
