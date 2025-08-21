import { create } from "zustand";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ERROR_MESSAGES } from "../constants";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
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
      const userObj = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
      set({
        isAuthenticated: true,
        user: userObj,
      });
      return userObj;
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
}));

export default useAuthStore;
