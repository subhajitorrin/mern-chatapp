import React from "react";

function ChatLeft({ message }) {
  return (
    <div className="mb-[10px] py-[2px] px-[10px] max-w-[500px] w-fit border border-[#ffffff73] rounded-r-lg rounded-l-[5px]">
      <p className="pr-[50px]">{message}</p>
      <p className="text-[10px] mt-[-6px] text-end">07:51 PM</p>
    </div>
  );
}

export default ChatLeft;
