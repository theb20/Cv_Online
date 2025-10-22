import api from "../Api/api_axios.js";

const certService = {
  getCert: async () => {
    const response = await api.get('/cert');
    return response.data;
  },
  getCertById: async (id) => {
    const response = await api.get(`/cert/${id}`);
    return response.data;
  },
  createCert: async (certData) => {
    const response = await api.post('/cert', certData);
    return response.data;
  },
  updateCert: async (id, certData) => {
    const response = await api.put(`/cert/${id}`, certData);
    return response.data;
  },
  deleteCert: async (id) => {
    const response = await api.delete(`/cert/${id}`);
    return response.data;
  },
}
export default certService;