import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { ConversationStore } from "../../store/ConversationStore.js";

function TopSection() {
  const { partner } = ConversationStore();
  return (
    <div className="px-[1rem] h-[12%] border-b border-[#ffffff73] flex justify-between items-center">
      <div className="flex gap-[10px] items-center">
        <img
          src={partner.image}
          className="object-cover h-[45px] w-[45px] rounded-[100%] border border-[#ffffff73]"
        />
        <div className="">
          <p className="font-[500]">{partner.name}</p>
          <p className="mt-[-6px] text-[13px]">Lase seen 3 min ago</p>
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
