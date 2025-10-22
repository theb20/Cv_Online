import api from "../Api/api_axios.js";

const catService = {
  getCat: async () => {
    const response = await api.get('/cat');
    return response.data;
  },
  getCatById: async (id) => {
    const response = await api.get(`/cat/${id}`);
    return response.data;
  },
  createCat: async (catData) => {
    const response = await api.post('/cat', catData);
    return response.data;
  },
  updateCat: async (id, catData) => {
    const response = await api.put(`/cat/${id}`, catData);
    return response.data;
  },
  deleteCat: async (id) => {
    const response = await api.delete(`/cat/${id}`);
    return response.data;
  },
}
export default catService;