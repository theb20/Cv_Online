import api from '../Api/api_axios.js';

const requestService = {
  createRequest: async (data) => {
    const response = await api.post('/request', data);
    return response.data;
  },
  getAllRequests: async () => {
    const response = await api.get('/request');
    return response.data;
  },
};

export default requestService;