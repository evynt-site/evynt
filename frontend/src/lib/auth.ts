import api from "./axios"; // Ensure this points to your axios instance

export const auth = {
  getCsrfToken: async () => {
    await api.get("/sanctum/csrf-cookie");
  },

  login: async (email: string, password: string) => {
    await auth.getCsrfToken();
    return api.post("/login", { email, password });
  },

  register: async (name: string, email: string, password: string) => {
    await auth.getCsrfToken();
    return api.post("/register", { name, email, password });
  },

  getUser: async () => {
    try {
      const response = await api.get("/user");
      return response.data;
    } catch {
      return null;
    }
  },

  logout: async () => {
    return api.post("/logout");
  },
};
