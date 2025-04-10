// Script para atualizar entradas antigas do ranking Firebase
import {
  db,
  dbRefRanking,
  ref,
  onValue,
  set
} from './firebase-init.js';

// Função para gerar um ID compatível com todos os navegadores
function generateCompatibleUUID() {
  return 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
}

console.log('Iniciando atualização automática das entradas antigas do ranking...');

onValue(dbRefRanking, (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    console.log('Ranking vazio.');
    return;
  }

  Object.entries(data).forEach(([key, entry]) => {
    let updated = false;

    // Gera valores padrão para campos ausentes ou inválidos
    if (!entry.userId) {
      entry.userId = generateCompatibleUUID();
      updated = true;
    }
    if (!entry.name || typeof entry.name !== 'string' || entry.name.trim() === '') {
      entry.name = 'Jogador Antigo';
      updated = true;
    }
    if (!entry.comum || typeof entry.comum !== 'string' || entry.comum.trim() === '') {
      entry.comum = 'Desconhecido';
      updated = true;
    }
    if (typeof entry.score !== 'number' || isNaN(entry.score)) {
      entry.score = 0;
      updated = true;
    }
    if (typeof entry.time !== 'number' || isNaN(entry.time)) {
      entry.time = 0;
      updated = true;
    }

    if (updated) {
      const updateRef = ref(db, 'ranking/' + key);
      set(updateRef, entry)
        .then(() => console.log(`Entrada ${key} atualizada com sucesso.`))
        .catch((error) => console.error(`Erro ao atualizar entrada ${key}:`, error));
    }
  });

  console.log('Atualização automática concluída.');
}, { onlyOnce: true });
