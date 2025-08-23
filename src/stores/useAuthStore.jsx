import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { ERROR_MESSAGES } from "../constants";

const useAuthStore = create((set) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      set({
        isAuthenticated: true,
        user: {
          uid: user.uid,
          email: user.email,
        },
        isAuthReady: true,
      });
    } else {
      set({
        isAuthenticated: false,
        user: null,
        isAuthReady: true,
      });
    }
  });

  return {
    isAuthenticated: false,
    isAuthReady: false,
    user: null,

    login: async (email, password) => {
      if (!email || !password) {
        throw new Error(ERROR_MESSAGES.AUTH_REQUIRED_FIELDS);
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        set({
          isAuthenticated: true,
          user: {
            uid: user.uid,
            email: user.email,
          },
        });
        return user;
      } catch (error) {
        throw error;
      }
    },

    logout: async () => {
      await signOut(auth);
      set({
        isAuthenticated: false,
        user: null,
      });
    },
  };
});

export default useAuthStore;
