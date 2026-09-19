import { useContext,useEffect } from "react";
import { AuthContext } from "../services/auth.context.jsx";
import { register, login, logout, getMe } from "../services/auth.api.jsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            console.log(data);
            setUser(data.user);
        } catch (error) {
            console.error(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({userName, email, password}) => {
        setLoading(true);
        try {
            const data = await register({userName, email, password});
            setUser(data.user);
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () => {
        setLoading(true);
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            console.error("GetMe error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getAndFetchUser = async() => {
            const data = await getMe();
            setUser(data.user);
            setLoading(false);
        }
        getAndFetchUser();
    },[])

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    }
}