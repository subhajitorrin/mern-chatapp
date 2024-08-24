import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import FindUserCard from "./FindUserCard";
import { useAuthStore } from "../store/AuthStore.js";
import { LiaUserTimesSolid } from "react-icons/lia";
import { TbUserSearch } from "react-icons/tb";

function Search() {
  const [userDetail, setUserDetail] = useState({});
  const { searchUser, isLoading } = useAuthStore();
  const [toggle, settoggle] = useState(false);
  const [findUser, setFindUser] = useState(null);
  const [user, setuser] = useState("");
  async function findUserByUsername() {
    try {
      const response = await searchUser(user.slice(1));
      if (response.status === 200) {
        setFindUser(true);
        setUserDetail(response.data.user);
      }
      if (response.status === 203) {
        setFindUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function searchUserByName() {}
  useEffect(() => {
    if (user !== "") {
      if (user.startsWith("@")) {
        if (user === "@") setFindUser(null);
        findUserByUsername();
        settoggle(true);
      } else {
        searchUserByName();
      }
    } else {
      settoggle(false);
    }
  }, [user]);
  return (
    <>
      <div className=" h-[7%] items-center flex justify-between px-[1rem] py-[10px] border-b border-[#ffffff73]">
        <input
          value={user}
          onChange={(e) => {
            setuser(e.target.value);
          }}
          type="text"
          className="w-[90%] py-[5px] outline-none bg-transparent"
          placeholder="@ Find username or search name"
        />
        <GoSearch className="text-[20px] cursor-pointer pointer-events-none" />
      </div>
      <div
        style={{ height: toggle ? "110px" : "0" }}
        className={`transition-all ease-linear duration-200 overflow-hidden text-[14px] py-[5px] w-full left-0 top-[100%] z-10   ${
          toggle ? "border-b border-[#ffffff73]" : ""
        }`}
      >
        <p className="text-[#ffffff64] text-center mb-[10px]">
          Find username to start conversation
        </p>
        {findUser === null && (
          <div className="w-full flex justify-center pt-[20px]">
            <p className=" flex items-center gap-[5px] opacity-[.5]">
              <TbUserSearch className="text-[20px]" />
              <span>Search user</span>
            </p>
          </div>
        )}
        {findUser === false && (
          <div className="w-full flex justify-center pt-[20px]">
            <p className=" flex items-center gap-[5px] opacity-[.5]">
              <LiaUserTimesSolid className="text-[20px]" />
              <span>Username not found</span>
            </p>
          </div>
        )}
        {findUser === true && <FindUserCard userDetail={userDetail} />}
      </div>
    </>
  );
}

export default Search;
