import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const songApi = {
  getSong: async (mood) => {
    const response = await api.get(`/songs?mood=${mood}`);
    return response.data;
  },
};

export const historyApi = {
  getHistory: async () => {
    const response = await api.get("/history");
    return response.data;
  },

  addHistory: async (songId, mood) => {
    const response = await api.post("/history", { songId, mood });
    return response.data;
  },

  deleteHistory: async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  },

  clearHistory: async () => {
    const response = await api.delete("/history");
    return response.data;
  },
};

export const favoriteApi = {
  getFavorites: async () => {
    const response = await api.get("/favorites");
    return response.data;
  },

  toggleFavorite: async (songId) => {
    const response = await api.post(`/favorites/${songId}`);
    return response.data;
  },
};
