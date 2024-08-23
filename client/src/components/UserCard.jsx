import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";

function UserCard() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="hover:bg-[#ffffff1e] cursor-pointer px-[1rem] border-b border-[#ffffff24] flex justify-between items-center py-[14px]">
      <div className="flex items-center gap-[10px]">
        <span className="relative">
          {isActive && (
            <GoDotFill className="text-[#00ff00] text-[18px] absolute right-[-3px] top-[-3px]" />
          )}
          <img
            src=""
            className="h-[40px] w-[40px] rounded-[100%] border border-white"
          />
        </span>
        <p>Santanu Dutta</p>
      </div>
      <div className="">03:40 PM</div>
    </div>
  );
}

export default UserCard;
