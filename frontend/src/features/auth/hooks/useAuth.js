import { useContext, useCallback } from "react"
import { AuthContext } from "../auth.context"
import { login, logout, register } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading, handleGetUser } = context;

    const handleLogin = useCallback(async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            setUser(response.user);
            return {
                success: response.success,
                message: response.message
            }
        }
        catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Something went wrong"
            };
        }
        finally {
            setLoading(false);
        }
    }, [setLoading, setUser]);

    const handleRegister = useCallback(async ({ username, email, password }) => {
        setLoading(true);
        try {
            const response = await register({ username, email, password });
            setUser(response.user);
            return { success: response.success, message: response.message }
        }
        catch (error) {
            console.error("Registration failed:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Something went wrong"
            };
        }
        finally {
            setLoading(false);
        }
    }, [setLoading, setUser]);

    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        }
        catch (error) {
            console.error("Logout failed:", error);
            return { success: false, message: "Failed to logout" };
        }
        finally {
            setLoading(false);
        }
    }, [setLoading, setUser]);

    return { 
        user, 
        loading, 
        handleLogin, 
        handleRegister, 
        handleGetUser, 
        handleLogout 
    };
}