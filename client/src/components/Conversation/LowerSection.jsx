import React from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { BsSend } from "react-icons/bs";

function LowerSection() {
  return (
    <div className="h-[8%] flex w-full items-center px-[1rem] justify-between">
      <div className="flex gap-[20px]">
        <MdOutlineEmojiEmotions className="text-[22px] cursor-pointer " />
        <GrAttachment className="text-[22px] cursor-pointer " />
      </div>
      <input
        placeholder="Type your text here..."
        type="text"
        className="bg-transparent w-[88%] px-[20px] outline-none"
      />
      <BsSend className="text-[22px] cursor-pointer w-[5%] " />
    </div>
  );
}

export default LowerSection;
