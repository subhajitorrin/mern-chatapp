import axios from "axios";
import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import toast from "../utils/toast.js";

function ProfileCard() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="px-[1rem] border-b border-[#ffffff73] flex justify-between items-center py-[1rem]">
      <div className="flex gap-[10px] items-center">
        <img
          src=""
          className="border border-white h-[50px] w-[50px] rounded-[100%]"
        />
        <p className="text-[17px] font-[500]">Subhajit Ghosh</p>
      </div>
      <div className="flex gap-[10px]">
        <CiLogout
          className="text-[20px] cursor-pointer"
          onClick={handleLogout}
        />
        <CiMenuFries className="text-[20px] cursor-pointer" />
      </div>
    </div>
  );
}

export default ProfileCard;
