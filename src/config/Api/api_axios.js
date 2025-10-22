import axios from 'axios';

// 🌐 Base URL dynamique (pour dev et prod)
const rawBase = import.meta.env.VITE_API_URL ;
const baseURL = rawBase.endsWith('/api')
  ? rawBase
  : `${rawBase.replace(/\/+$/, '')}/api`;

// ⚙️ Configuration Axios
const api = axios.create({
  baseURL,
  timeout: 20000, // 20 secondes
  withCredentials: true, // permet les cookies si nécessaires
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🧩 Intercepteur — Avant chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Erreur lors de la préparation de la requête:', error);
    return Promise.reject(error);
  }
);

// ⚠️ Intercepteur — Après la réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('❌ Le serveur ne répond pas.');
      return Promise.reject(new Error('Erreur réseau ou serveur inaccessible.'));
    }

    const status = error.response.status;
    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      error.message ||
      'Erreur inconnue du serveur.';

    // 🔐 Si token expiré ou non valide
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirige vers la page de connexion
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
