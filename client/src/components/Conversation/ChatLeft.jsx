import React from "react";

function ChatLeft({ msg }) {
  function convertTo12HourFormat(isoString) {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours
      .toString()
      .padStart(2, "0")}:${minutes} ${ampm}`;
    return formattedTime;
  }

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
