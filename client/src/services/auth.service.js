import axios from "axios";
import { getLocalStorageValue } from "src/utils/localStorage.util"

const api = axios.create({
    baseURL: "http://localhost:5000/auth",
    headers: { "Content-Type": "application/json" }
})

export const register = (email, password) => {
    try {
        const response = api.post("/register", { email, password });
        return response.data;
    } catch (error) {
        console.log("Error: Service => Register");
        console.log(error.message);
    }
}

export const login = (email, password) => {
    try {
        const response = api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.log("Error: Service => Login");
        console.log(error.message);
    }
}

export const isLogin = async () => {
    try {
        const token = getLocalStorageValue("token");
        if (!token) return false;
        const response = await api.post("/isLogin", { token });
        return response.data;
    } catch (error) {
        console.log("Error: Service => isLogin");
        console.log(error.message);
    }
}