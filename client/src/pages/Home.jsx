import React, { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import OtherUsers from "../components/OtherUsers";
import Search from "../components/Search";
import Conversation from "../components/Conversation/Conversation";
import io from "socket.io-client";
import { useAuthStore } from "../store/AuthStore.js";

function Home() {
  const { user, setSocket, setActiveUsers } = useAuthStore();

  useEffect(() => {
    if (user) {
      const socket = io(`${import.meta.env.VITE_BACKEND_BASE_URL}`, {
        query: {
          userId: user._id
        }
      });
      setSocket(socket);
      socket.on("GET_ONLINE_USERS", (activeUsersMap) => {
        setActiveUsers(activeUsersMap);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <div className="w-full h-full text-white flex overflow-hidden ">
      {/* left panel */}
      <div className="h-full border-r border-[#ffffff73] w-[25%]">
        <ProfileCard />
        <Search />
        <OtherUsers />
      </div>
      {/* right panel */}
      <div className="h-full w-[75%]">
        <Conversation />
      </div>
    </div>
  );
}

export default Home;
