import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.js";
import UpdateUser from "./UpdateUser.jsx";

function ProfileCard() {
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image);
      setUsername(user.username);
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
    <>
      <div className="h-[12%] px-[1rem] border-b border-[#ffffff73] flex justify-between items-center py-[1rem]">
        <div className="flex gap-[10px] items-center">
          <img
            src={image}
            className="border border-[#ffffff73] object-cover h-[50px] w-[50px] rounded-[100%]"
          />
          <div className="">
            <p className="text-[17px] font-[500]">{name}</p>
            <p className="text-[13px] mt-[-6px]">@{username}</p>
          </div>
        </div>
        <div className="flex gap-[15px]">
          <CiLogout
            className="text-[20px] cursor-pointer"
            onClick={handleLogout}
          />
          <CiMenuFries
            className="text-[20px] cursor-pointer"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          />
        </div>
      </div>
      <div
        style={{
          height: toggle ? "280px" : "0px"
        }}
        className={`border-[#ffffff73] overflow-hidden transition-all ease-linear duration-200 ${
          toggle ? "border-b" : ""
        }`}
      >
        <UpdateUser />
      </div>
    </>
  );
}

export default ProfileCard;
