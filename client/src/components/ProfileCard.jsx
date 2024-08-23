import React from "react";
import { CiMenuFries } from "react-icons/ci";

function ProfileCard() {
  return (
    <div className="px-[1rem] border-b border-[#ffffff73] flex justify-between items-center py-[1rem]">
      <div className="flex gap-[10px] items-center">
        <img
          src=""
          className="border border-white h-[50px] w-[50px] rounded-[100%]"
        />
        <p className="text-[17px] font-[500]">Subhajit Ghosh</p>
      </div>
      <CiMenuFries className="text-[20px] cursor-pointer" />
    </div>
  );
}

export default ProfileCard;
