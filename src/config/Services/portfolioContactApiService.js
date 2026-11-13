import axios from "axios";

const BASE_URL = import.meta.env.VITE_PORTFOLIO_API_URL;

export const portfolioContactApiService = {
  // The sole contact submission path — persisted directly to the backoffice.
  async submit({ name, email, subject, message }) {
    if (!BASE_URL) return false;
    try {
      await axios.post(`${BASE_URL}/portfolio/contact`, { name, email, subject, message });
      return true;
    } catch (error) {
      console.error("Error saving contact message to backend:", error);
      return false;
    }
  },
};
