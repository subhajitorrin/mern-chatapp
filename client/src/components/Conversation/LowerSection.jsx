import React, { useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { ConversationStore } from "../../store/ConversationStore";
import { useAuthStore } from "../../store/AuthStore.js";

function LowerSection() {
  const { socket, user } = useAuthStore();
  const [text, settext] = useState("");
  const { sendMessage, partner, setTempMessage } = ConversationStore();
  async function handleSendMessage() {
    if (text === "" && partner !== null) {
      return;
    }
    socket.emit("message", { receiverId: partner._id, msg: text });
    setTempMessage({ message: text, sender: user._id, createdAt: new Date() });
    try {
      const temp = text;
      settext("");
      await sendMessage(temp, partner._id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="py-[15px]  flex w-full items-center px-[1rem] justify-between">
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
