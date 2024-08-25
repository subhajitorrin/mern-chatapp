import { create } from "zustand"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

axios.defaults.withCredentials = true;

export const ConversationStore = create((set) => ({
    partner: null,
    messages: [],
    setPartner: async (user) => {
        set({ partner: user, messages: [] })
        if (user) {
            try {
                const response = await axios.get(`${BASE_URL}/receivemessage/${user._id}`)
                if (response.status === 200) {
                    set({ messages: response.data.messages.messages })
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        } else {
            set({ messages: [] })
        }
    },
    sendMessage: async (message, partnerId) => {
        try {
            if (!partnerId) {
                throw new Error("Partner ID is missing");
            }
            const response = await axios.post(`${BASE_URL}/sendmessage/${partnerId}`, { message });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    convertTo12HourFormat: (isoString) => {
        const date = new Date(isoString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours
            .toString()
            .padStart(2, "0")}:${minutes} ${ampm}`;
        return formattedTime;
    }
}))