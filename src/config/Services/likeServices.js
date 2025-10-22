import api from "../Api/api_axios.js";

const likeService = {
  getLike: async (id_comment) => {
    const response = await api.get(`/like/${id_comment}`);
    return response.data;
  },
  createLike: async (likeData) => {
    const response = await api.post('/like', likeData);
    return response.data;
  },
  deleteLike: async (id) => {
    const response = await api.delete(`/like/${id}`);
    return response.data;
  },
}
export default likeService;