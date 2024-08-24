import { create } from "zustand"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

axios.defaults.withCredentials = true;

export const ConversationStore = create((set) => ({
    partner: null,
    setPartner: (user) => {
        set({ partner: user })
    }
}))