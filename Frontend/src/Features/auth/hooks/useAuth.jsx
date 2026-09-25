import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context.jsx";
import {
    register,
    login,
    logout,
    getMe
} from "../services/auth.api.jsx";

export const useAuth = () => {

    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;


    // =========================
    // LOGIN
    // =========================
    const handleLogin = async ({ email, password }) => {

        setLoading(true);

        try {
            const data = await login({
                email,
                password
            });

            console.log("Login response:", data);

            setUser(data.user);

            return data;

        } catch (error) {

            console.error(
                "Login error:",
                error.response?.data || error.message
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // REGISTER
    // =========================
    const handleRegister = async ({
        userName,
        email,
        password
    }) => {

        setLoading(true);

        try {

            const data = await register({
                userName,
                email,
                password
            });

            console.log("Register response:", data);

            setUser(data.user);

            return data;

        } catch (error) {

            console.error(
                "Register error:",
                error.response?.data || error.message
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOGOUT
    // =========================
    const handleLogout = async () => {

        setLoading(true);

        try {

            const data = await logout();

            setUser(null);

            return data;

        } catch (error) {

            console.error(
                "Logout error:",
                error.response?.data || error.message
            );

            throw error;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // GET CURRENT USER
    // =========================
    const handleGetMe = async () => {

        setLoading(true);

        try {

            const data = await getMe();

            setUser(data.user);

            return data;

        } catch (error) {

            console.error(
                "GetMe error:",
                error.response?.data || error.message
            );

            setUser(null);

            throw error;

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // CHECK AUTH ON APP START
    // =========================
    useEffect(() => {

        const getAndFetchUser = async () => {

            try {

                const data = await getMe();

                console.log("Current user:", data);

                setUser(data.user);

            } catch (error) {

                // 401 is normal when user isn't logged in
                console.log(
                    "No authenticated user:",
                    error.response?.data || error.message
                );

                setUser(null);

            } finally {

                // ⭐ VERY IMPORTANT
                setLoading(false);
            }
        };

        getAndFetchUser();

    }, [setUser, setLoading]);


    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    };
};