import React, { createContext, useState, useContext, useCallback } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();

  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
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
      setIsAuthenticated(true);
      setUser(userObj);
      return userObj;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      logout,
    }),
    [isAuthenticated, user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
