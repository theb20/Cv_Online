import api from "../Api/api_axios.js";

const eduService = {
  getEdu: async () => {
    const response = await api.get('/edu');
    return response.data;
  },
  getEduById: async (id) => {
    const response = await api.get(`/edu/${id}`);
    return response.data;
  },
  createEdu: async (eduData) => {
    const response = await api.post('/edu', eduData);
    return response.data;
  },
  updateEdu: async (id, eduData) => {
    const response = await api.put(`/edu/${id}`, eduData);
    return response.data;
  },
  deleteEdu: async (id) => {
    const response = await api.delete(`/edu/${id}`);
    return response.data;
  },
}
export default eduService;