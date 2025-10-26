import api from '../Api/api_axios.js';

const requestService = {
  // Pour les demandes normales (JSON)
  createRequest: async (data) => {
    const response = await api.post('/request', data);
    return response.data;
  },

  // Pour les demandes qui peuvent renvoyer un PDF
  createRequestWithPDF: async (data) => {
    const response = await api.post('/request', data, { responseType: 'blob' });
    return response;
  },

  getAllRequests: async () => {
    const response = await api.get('/request');
    return response.data;
  },
};

export default requestService;
