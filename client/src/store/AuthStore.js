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
    connections: [],
    register: async (formData) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${BASE_URL}/register`, formData)
            if (response.status === 201) {
                toast("Register successfull")
            }
            console.log(response);
        } catch (error) {
            error.response ? toast(error.response.data.msg) : console.log(error);
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    login: async (username, password) => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${BASE_URL}/login`, { username, password })
            if (response.status === 200) {
                toast("Login successfull")
            }
            set({ user: response.data.user, isAuthenticated: true, connections: [] })
        } catch (error) {
            error.response ? toast(error.response.data.msg) : console.log(error);
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    logout: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.post(`${BASE_URL}/logout`)

            if (response.status === 200) {
                toast("Logout successfull")
            }
            set({ user: null, isAuthenticated: false, connections: [] })
        } catch (error) {
            console.log(error.message);
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getUser: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/getuser`)
            if (response.status === 200) {
                set({ user: response.data.user, isAuthenticated: true })
            }
        } catch (error) {
            set({ isAuthenticated: false })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    update: async (formData) => {
        set({ isLoading: true })
        try {
            const response = await axios.put(`${BASE_URL}/updateuser`, formData)
            if (response.status === 200) {
                toast("User updated successfully")
                set({ user: response.data.user })
            }
        } catch (error) {
            error.response ? toast(error.response.data.msg) : console.log(error);
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    searchUser: async (username) => {
        set({ isLoading: true })
        try {
            const response = await axios.get(`${BASE_URL}/searchuser/${username}`)
            return response
        } catch (error) {
            throw error
        } finally {
            set({ isLoading: false })
        }
    },
    getConnections: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get(`${BASE_URL}/getconnections`)
            if (response.status === 200) {
                set({ connections: response.data.connections })
            }
        } catch (error) {
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
}))