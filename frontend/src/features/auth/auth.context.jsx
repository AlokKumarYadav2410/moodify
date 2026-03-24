import { createContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCurrentUser();
      setUser(response.user);
      return { success: response.success, message: response.message };
    } catch (error) {
      console.error("Failed to get user:", error);
      return { success: false, message: "Failed to get user" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Hydrate user on initial app load ONLY ONCE
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, handleGetUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
