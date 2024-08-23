import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";

function ProfileCard() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image);
    }
  }, [user]);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="h-[12%] px-[1rem] border-b border-[#ffffff73] flex justify-between items-center py-[1rem]">
      <div className="flex gap-[10px] items-center">
        <img
          src={image}
          className="border border-[#ffffff73] object-cover h-[50px] w-[50px] rounded-[100%]"
        />
        <p className="text-[17px] font-[500]">{name}</p>
      </div>
      <div className="flex gap-[15px]">
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
