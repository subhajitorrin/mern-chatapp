import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useAuthStore } from "../store/AuthStore.js";

function OtherUsers() {
  const [connectionList, setConnectionList] = useState([]);
  const {
    connections,
    getConnections,
    user,
    socket,
    checkAndUpdateConnection
  } = useAuthStore();
  const [pendingMsg, setPendingMsg] = useState(null);

  useEffect(() => {
    if (user) {
      getConnections();
    }
  }, [getConnections, user]);

  useEffect(() => {
    if (connections.length > 0) {
      setConnectionList(connections);
    } else {
      setConnectionList([]);
    }
  }, [connections]);

  useEffect(() => {
    if (!socket) return;
    async function handleReceiveSocketMsg(data) {
      checkAndUpdateConnection(data, data.user, true);
      setPendingMsg(data);
    }

    socket.on("receiveSocketMsg", handleReceiveSocketMsg);

    return () => {
      socket.off("receiveSocketMsg", handleReceiveSocketMsg);
    };
  }, [socket]);

  useEffect(() => {
    if (pendingMsg !== null) {
      const userToUpdate = connectionList.find(
        (item) => item.user._id === pendingMsg.sender
      );
      if (!userToUpdate || !userToUpdate.lastMessage) return;
      userToUpdate.lastMessage = pendingMsg;
      const updatedList = connectionList.filter(
        (item) => item.user._id !== pendingMsg.sender
      );
      setConnectionList([userToUpdate, ...updatedList]);
    }
  }, [pendingMsg]);

  return (
    <div className="scrollNone flex flex-col h-[80%] overflow-y-auto">
      {connectionList.map((item, index) => {
        return (
          <UserCard
            key={index}
            othuser={item.user}
            lastMsg={item.lastMessage}
          />
        );
      })}
    </div>
  );
}

export default OtherUsers;
