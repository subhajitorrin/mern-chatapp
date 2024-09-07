import React, { useEffect, useState } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import {
  ConversationStore,
  useResponsive
} from "../../store/ConversationStore.js";
import { useAuthStore } from "../../store/AuthStore.js";

function TopSection() {
  const { partner, convertTo12HourFormat, getLastSeen, setPartnerNull } =
    ConversationStore();
  const { socket } = useAuthStore();
  const { isMobile } = useResponsive();
  const { activeUsers } = useAuthStore();
  const [isActive, setIsActive] = useState(null);
  const [lastSeen, setLastSeen] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    async function fetchActiveStatus() {
      if (activeUsers.includes(partner._id)) {
        setIsActive(true);
      } else {
        const response = await getLastSeen(partner._id);
        setLastSeen(convertTo12HourFormat(response));
        setIsActive(false);
      }
    }
    fetchActiveStatus();
  }, [activeUsers, partner._id]);

  function handleBack() {
    if (setPartnerNull) {
      setPartnerNull();
    }
  }

  useEffect(() => {
    let typingTimeout;
    function handleTyping(data) {
      if (partner._id !== data.senderId) return;
      setIsTyping(true);
      if (typingTimeout) {
        clearInterval(typingTimeout);
      }
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 500);
    }
    if (socket !== null) {
      socket.on("receiveTyping", handleTyping);
    }

    return () => {
      if (socket !== null) {
        socket.off("receiveTyping", handleTyping);
      }
    };
  }, [socket, partner]);

  return (
    <div className="px-[1rem] py-[10px] border-b border-[#ffffff73] flex justify-between items-center">
      <div className="flex gap-[10px] items-center">
        {isMobile && (
          <IoIosArrowBack
            onClick={handleBack}
            className="text-[20px] cursor-pointer relative top-[-2px]"
          />
        )}
        <img
          src={partner.image}
          className="object-cover h-[45px] w-[45px] rounded-[100%] border border-[#ffffff73]"
        />
        <div className="">
          <p className="font-[500]">{partner.name}</p>
          <p className="mt-[-6px] text-[13px]">
            {isActive === null && <span>&nbsp;</span>}
            {isActive && <span>{isTyping ? "typing..." : "Active now"}</span>}
            {isActive === false && <span>Last seen {lastSeen}</span>}
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
