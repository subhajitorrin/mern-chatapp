import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { ConversationStore } from "../store/ConversationStore.js";
import { useAuthStore } from "../store/AuthStore.js";

function UserCard({ othuser, lastMsg }) {
  const { activeUsers, user } = useAuthStore();
  const [isActive, setIsActive] = useState(false);
  const { setPartner } = ConversationStore();
  const { convertTo12HourFormat } = ConversationStore();

  function handleSetPartner() {
    if (othuser) {
      setPartner(othuser);
    }
  }

  useEffect(() => {
    if (activeUsers.includes(user._id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeUsers, othuser._id]);

  return (
    <div
      onClick={handleSetPartner}
      className="hover:bg-[#ffffff1e] relative text-[#ffffff4e] transition-all ease-linear duration-200 cursor-pointer px-[1rem] border-b border-[#ffffff24] flex justify-between items-center py-[14px]"
    >
      <div className="flex items-center gap-[10px]">
        <span className="relative">
          {isActive && (
            <GoDotFill className="text-[#00ff00] text-[18px] absolute right-[-3px] top-[-3px]" />
          )}
          <img
            src={othuser.image}
            className="h-[40px] object-cover w-[40px] rounded-[100%]"
          />
        </span>
        <div className="">
          <p className="text-[#ffffffdc]">{othuser.name}</p>
          <p className="text-[#ffffff84] text-[12px] top-[-4px] relative">
            {lastMsg.message}
          </p>
        </div>
      </div>
      <div className="">{convertTo12HourFormat(lastMsg.updatedAt)}</div>
    </div>
  );
}

export default UserCard;
