import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useAuthStore } from "../store/AuthStore.js";

function OtherUsers() {
  const [connectionList, setConnectionList] = useState([]);
  const { connections, getConnections, user } = useAuthStore();
  useEffect(() => {
    if (user) {
      getConnections();
    }
  }, [getConnections, user]);

  useEffect(() => {
    if (connections.length > 0) {
      setConnectionList(connections);
    }
  }, [connections]);

  return (
    <div className="scrollNone flex flex-col h-[80%] overflow-y-auto">
      {connectionList.map((item, index) => {
        return <UserCard key={index} user={item.user} lastMsg = {item.updatedAt} />;
      })}
    </div>
  );
}

export default OtherUsers;
