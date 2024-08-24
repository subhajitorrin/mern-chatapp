import React from "react";

function FindUserCard({ userDetail }) {
  return (
    <div className="w-full flex justify-between py-[10px] items-center hover:bg-[#ffffff1f] px-[1rem]">
      <div className="flex gap-[10px] items-center">
        <img
          src={userDetail.image}
          className="object-cover h-[40px] w-[40px] border border-white rounded-[100%]"
        />
        <div className="flex flex-col">
          <p className="">{userDetail.name}</p>
          <p className="mt-[-6px]">@{userDetail.username}</p>
        </div>
      </div>
      <button className="text-[13px] bg-[#ffffff1f] text-white h-[30px] rounded-[5px] hover:bg-[#ffffff4d] transition duration-300 px-[1rem]">
        Add
      </button>
    </div>
  );
}

export default FindUserCard;
