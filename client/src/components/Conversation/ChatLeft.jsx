import React from "react";
import { ConversationStore } from "../../store/ConversationStore.js";

function ChatLeft({ msg }) {
  const { convertTo12HourFormat } = ConversationStore();
  return (
    <div className="mb-[10px] py-[2px] px-[10px] max-w-[500px] w-fit border border-[#ffffff73] rounded-r-lg rounded-l-[5px]">
      <p className="pr-[50px]">{msg.message}</p>
      <p className="text-[10px] mt-[-6px] text-end">
        {convertTo12HourFormat(msg.createdAt)}
      </p>
    </div>
  );
}

export default ChatLeft;
