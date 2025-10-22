import api from "../Api/api_axios.js";

// ✅ Récupérer les suggestions
export const fetchSuggestions = async () => {
  try {
    const { data } = await api.get('/chat/suggestions'); // <-- correction ici
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des suggestions:', error);
    return [];
  }
};

// ✅ Récupérer les statistiques
export const fetchStats = async () => {
  try {
    const { data } = await api.get('/chat/stats'); // <-- correction ici
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des stats:', error);
    return null;
  }
};

// ✅ Envoyer un message à l'IA
export const sendChatMessage = async (message, history) => {
  try {
    const { data } = await api.post('/chat', {  // <-- correction ici
      message,
      conversationHistory: history.slice(-5),
    });
    return data;
  } catch (error) {
    console.error('Erreur lors de l’envoi du message:', error);
    throw error;
  }
};

// ✅ Réinitialiser la session de chat
export const resetChatSession = async () => {
  try {
    await api.post('/chat/reset'); // <-- correction ici
  } catch (error) {
    console.error('Erreur lors du reset du chat:', error);
  }
};
