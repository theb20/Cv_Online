import api from "../Api/api_axios.js";

const messageService = {
  getMessage: async () => {
    const response = await api.get('/message');
    return response.data;
  },
  getMessageById: async (id) => {
    const response = await api.get(`/message/${id}`);
    return response.data;
  },
  createMessage: async (messageData) => {
    const response = await api.post('/message', messageData);
    return response.data;
  },
  deleteMessage: async (id) => {
    const response = await api.delete(`/message/${id}`);
    return response.data;
  },
}
export default messageService;