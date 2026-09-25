import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

export async function register({userName,email,password}) {
    try{
        const response = await api.post("/api/auth/register", {
            userName,
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.log("Registration failed:", error.response.data);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password,
        });
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Response:", error.response?.data);

        throw error;
    }
}

export async function logout() {
    try{
        const response = await api.get("/api/auth/logout",{
            withCredentials: true
        })
        return response.data;
    }
    catch (error) {
        console.log("Logout failed:", error.response.data);
        throw error;
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");

        return response.data;

    } catch (error) {
        console.log(
            "Get user failed:",
            error.response?.data || error.message
        );

        throw error;
    }
}