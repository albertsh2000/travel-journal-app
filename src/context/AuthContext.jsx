import React, {
  createContext,
  useState,
  useContext,
  useCallback,
} from "react";
import { LOCAL_STORAGE_USER_KEY } from "../constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY));
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(storedUser));
  const [user, setUser] = useState(storedUser);

  const login = useCallback((username, password) => {
    if (username && password) {
      const userObj = { username };
      setIsAuthenticated(true);
      setUser(userObj);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userObj));
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
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
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
