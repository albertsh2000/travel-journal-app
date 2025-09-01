import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiService from "../apiService";
import { ERROR_MESSAGES, MOCK_API_USERS_URL } from "../constants";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthReady: true,
      user: null,

      login: async (email, password) => {
        if (!email || !password) {
          throw new Error(ERROR_MESSAGES.AUTH_REQUIRED_FIELDS);
        }

        const users = await apiService.get(MOCK_API_USERS_URL);

        const matchedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (!matchedUser) {
          throw new Error("Invalid email or password");
        }

        set({
          isAuthenticated: true,
          user: {
            id: matchedUser.id,
            email: matchedUser.email,
          },
        });

        return matchedUser;
      },

      logout: async () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
