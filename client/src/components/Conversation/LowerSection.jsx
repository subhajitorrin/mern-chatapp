import React, { useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { ConversationStore } from "../../store/ConversationStore";
import { useAuthStore } from "../../store/AuthStore.js";

function LowerSection() {
  const { socket } = useAuthStore();
  const [text, settext] = useState("");
  const { sendMessage, partner } = ConversationStore();
  async function handleSendMessage() {
    if (text === "" && partner !== null) {
      return;
    }
    socket.emit("message", { receiverId: partner._id, msg: text });
    try {
      await sendMessage(text, partner._id);
      settext("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-[8%] flex w-full items-center px-[1rem] justify-between">
      <div className="flex gap-[20px]">
        <MdOutlineEmojiEmotions className="text-[22px] cursor-pointer " />
        <GrAttachment className="text-[22px] cursor-pointer " />
      </div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            handleSendMessage();
          }
        }}
        value={text}
        onChange={(e) => {
          settext(e.target.value);
        }}
        placeholder="Type your text here..."
        type="text"
        className="bg-transparent w-[88%] px-[20px] outline-none"
      />
      <BsSend
        className="text-[22px] cursor-pointer w-[5%] "
        onClick={handleSendMessage}
      />
    </div>
  );
}

export default LowerSection;
