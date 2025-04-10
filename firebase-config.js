// firebase-config.js

// ========================================================================
// IMPORTANTE: Substitua as strings abaixo pelas suas credenciais REAIS
// ========================================================================
const apiKey = "AIzaSyA4Q-OqazZr2k5riI2wS8fIzypsf9ZYaxQ";
const authDomain = "biblical-questions-a55db.firebaseapp.com";
const databaseURL = "https://biblical-questions-a55db-default-rtdb.firebaseio.com";
const projectId = "biblical-questions-a55db";
const storageBucket = "biblical-questions-a55db.appspot.com";
const messagingSenderId = "1045554441948";
const appId = "1:1045554441948:web:6f2d7b45b039da8c994e19";
// ========================================================================

/**
 * Retorna o objeto de configuração do Firebase.
 * @returns {object} Objeto de configuração do Firebase.
 */
function getFirebaseConfig() {
  const config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };

  // Verifica se algum valor essencial está faltando
  if (!config.apiKey || !config.databaseURL || !config.projectId) {
    console.error("Valores essenciais da configuração do Firebase estão faltando.");
    alert("Erro crítico na configuração do aplicativo. O aplicativo pode não funcionar corretamente.");
    return {};
  }

  return config;
}

export { getFirebaseConfig };
