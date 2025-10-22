import api from '../Api/api_axios.js';

const authService = {

    getAuth: async () => {
      const response = await api.get('/auth');
      return response.data;
    },

    getUserById: async (id) => {
      const response = await api.get(`/auth/${id}`);
      return response.data;
    },

    logout: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },

    login: async (credentials) => {
    const response = await api.post('/auth/', credentials);
    return response.data;
    },

    updateUser: async (id, userData) => {
      const response = await api.put(`/auth/${id}`, userData);
      return response.data;
    },

    deleteUser: async (id) => {
      const response = await api.delete(`/auth/${id}`);
      return response.data;
    },

    register: async (userData) => {
    const response = await api.post('/auth', userData);
    return response.data;
    },
};
export default authService;