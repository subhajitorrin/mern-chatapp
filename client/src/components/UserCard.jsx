import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ConversationStore } from "../store/ConversationStore.js";

function UserCard({ item }) {
  const [isActive, setIsActive] = useState(false);
  const { setPartner } = ConversationStore();

  function handleSetPartner() {
    if (item) {
      setPartner(item);
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
            src={item.image}
            className="h-[40px] object-cover w-[40px] rounded-[100%]"
          />
        </span>
        <p>{item.name}</p>
      </div>
      <div className="">03:40 PM</div>
    </div>
  );
}

export default UserCard;
