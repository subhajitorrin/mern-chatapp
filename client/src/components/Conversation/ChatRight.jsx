import React from "react";

function ChatRight({ message }) {
  return (
    <div className="flex justify-end">
      <div className="mb-[10px] py-[2px] px-[10px] max-w-[500px] w-fit border border-[#ffffff73] rounded-l-lg rounded-r-[5px]">
        <p className="pr-[50px]">{message}</p>
        <p className="text-[10px] mt-[-6px] text-end">07:53 PM</p>
      </div>
    </div>
  );
}

export default ChatRight;
