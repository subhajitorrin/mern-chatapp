import { create } from "zustand"
import axios from "axios";
import toast from "../utils/toast.js";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: true,
    register: async (formData) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${BASE_URL}/register`, formData)
            if (response.status === 201) {
                toast("User register successfull")
            }
            console.log(response);
        } catch (error) {
            error.response ? toast(error.response.data.msg) : console.log(error);
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
}))