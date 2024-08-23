import React from "react";
import { GoSearch } from "react-icons/go";

function Search() {
  return (
    <div className="h-[7%] items-center flex justify-between px-[1rem] py-[10px] border-b border-[#ffffff73]">
      <input
        type="text"
        className="w-[90%] py-[5px] outline-none bg-transparent"
        placeholder="Search user"
      />
      <GoSearch className="text-[20px] cursor-pointer" />
    </div>
  );
}

export default Search;
