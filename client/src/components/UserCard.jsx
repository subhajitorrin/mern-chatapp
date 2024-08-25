import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ConversationStore } from "../store/ConversationStore.js";

function UserCard({ user,lastMsg }) {
  const [isActive, setIsActive] = useState(false);
  const { setPartner } = ConversationStore();
  const { convertTo12HourFormat } = ConversationStore();

  function handleSetPartner() {
    if (user) {
      setPartner(user);
    }
  }

  return (
    <div
      onClick={handleSetPartner}
      className="hover:bg-[#ffffff1e] cursor-pointer px-[1rem] border-b border-[#ffffff24] flex justify-between items-center py-[14px]"
    >
      <div className="flex items-center gap-[10px]">
        <span className="relative">
          {isActive && (
            <GoDotFill className="text-[#00ff00] text-[18px] absolute right-[-3px] top-[-3px]" />
          )}
          <img
            src={user.image}
            className="h-[40px] object-cover w-[40px] rounded-[100%]"
          />
        </span>
        <p>{user.name}</p>
      </div>
      <div className="">{convertTo12HourFormat(lastMsg)}</div>
    </div>
  );
}

export default UserCard;
