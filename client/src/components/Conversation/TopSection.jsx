import React, { useEffect, useState } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { ConversationStore } from "../../store/ConversationStore.js";
import { useAuthStore } from "../../store/AuthStore.js";

function TopSection() {
  const { partner } = ConversationStore();
  const { activeUsers } = useAuthStore();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (activeUsers.includes(partner._id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeUsers, partner._id]);
  return (
    <div className="px-[1rem] h-[12%] border-b border-[#ffffff73] flex justify-between items-center">
      <div className="flex gap-[10px] items-center">
        <img
          src={partner.image}
          className="object-cover h-[45px] w-[45px] rounded-[100%] border border-[#ffffff73]"
        />
        <div className="">
          <p className="font-[500]">{partner.name}</p>
          <p className="mt-[-6px] text-[13px]">
            {isActive ? (
              <span>Active now</span>
            ) : (
              <span>Last seen 10:40 PM</span>
            )}
          </p>
        </div>
      </div>
      <div className="text-[25px] flex gap-[20px] items-center">
        <IoVideocamOutline className="cursor-pointer" />
        <IoCallOutline className="cursor-pointer" />
      </div>
    </div>
  );
}

export default TopSection;
