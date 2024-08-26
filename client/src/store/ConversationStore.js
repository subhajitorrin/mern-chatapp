import { create } from "zustand"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

axios.defaults.withCredentials = true;

export const ConversationStore = create((set) => ({
    partner: null,
    isLoading:false,
    messages: [],
    tempMsg:null,
    setPartner: async (user) => {
        set({ partner: user, messages: [], isLoading:true })
        if (user) {
            try {
                const response = await axios.get(`${BASE_URL}/receivemessage/${user._id}`)
                if (response.status === 200) {
                    set({ messages: response.data.messages.messages })
                }
            } catch (error) {
                console.log(error);
                throw error;
            }finally{
                set({ isLoading:false })
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
    getLastSeen:async(userid)=>{
        try {
            if(!userid)return
            const response = await axios.get(`${BASE_URL}/getlastseen/${userid}`)
            if(response.status===200){
                return response.data.lastSeen
            }
        } catch (error) {
            throw error;
        }
    },
    setTempMessage:(msg)=>{
        set({tempMsg:msg})
    },
    setPartnerNull:()=>{
        set({partner:null,messages:[],tempMsg:null})
    },
    convertTo12HourFormat: (isoString) => {
        const date = new Date(isoString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
        return formattedTime;
    }
}))

export const useResponsive=create((set)=>({
    isMobile:window.innerWidth>768?false:true,
    setIsMobile:(status)=>{
        set({isMobile:status})
    }
}))