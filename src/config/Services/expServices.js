import api from "../Api/api_axios.js";

const expService = {
  getExp: async () => {
    const response = await api.get('/exp');
    return response.data;
  },
  getExpById: async (id) => {
    const response = await api.get(`/exp/${id}`);
    return response.data;
  },
  createExp: async (expData) => {
    const response = await api.post('/exp', expData);
    return response.data;
  },
  updateExp: async (id, expData) => {
    const response = await api.put(`/exp/${id}`, expData);
    return response.data;
  },
  deleteExp: async (id) => {
    const response = await api.delete(`/exp/${id}`);
    return response.data;
  },
}
export default expService;