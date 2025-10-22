import api from "../Api/api_axios.js";

const socialLinkService = {
  getSocialLink: async () => {
    const response = await api.get('/social-Links');
    return response.data;
  },
  getSocialLinkById: async (id) => {
    const response = await api.get(`/social-Links/${id}`);
    return response.data;
  },
  createSocialLink: async (socialLinkData) => {
    const response = await api.post('/social-Links', socialLinkData);
    return response.data;
  },
  updateSocialLink: async (id, socialLinkData) => {
    const response = await api.put(`/social-Links/${id}`, socialLinkData);
    return response.data;
  },
  deleteSocialLink: async (id) => {
    const response = await api.delete(`/social-Links/${id}`);
    return response.data;
  },
}
export default socialLinkService;