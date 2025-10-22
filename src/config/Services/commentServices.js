import api from "../Api/api_axios.js";

const commentService = {
  getComment: async () => {
    const response = await api.get('/comment');
    return response.data;
  },
  getCommentById: async (id) => {
    const response = await api.get(`/comment/${id}`);
    return response.data;
  },
  createComment: async (commentData) => {
    const response = await api.post('/comment', commentData);
    return response.data;
  },
  updateComment: async (id, commentData) => {
    const response = await api.put(`/comment/${id}`, commentData);
    return response.data;
  },
  deleteComment: async (id) => {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  },
}
export default commentService;