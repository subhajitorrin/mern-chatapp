import React from "react";
import { ConversationStore } from "../../store/ConversationStore.js";

function ChatRight({ msg }) {
  const { convertTo12HourFormat } = ConversationStore();
  return (
    <div className="flex justify-end">
      <div className="mb-[10px] py-[2px] px-[10px] max-w-[500px] w-fit border border-[#ffffff73] rounded-l-lg rounded-r-[5px]">
        <p className="pr-[50px]">{msg.message}</p>
        <p className="text-[10px] mt-[-6px] text-end">
          {convertTo12HourFormat(msg.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default ChatRight;
