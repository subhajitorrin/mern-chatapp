import React from "react";
import ProfileCard from "../components/ProfileCard";
import OtherUsers from "../components/OtherUsers";
import Search from "../components/Search";

function Home() {
  return (
    <div className="w-full h-full text-white flex">
      {/* left panel */}
      <div className="h-full border-r border-[#ffffff73] w-[25%]">
        <ProfileCard />
        <Search />
        <OtherUsers />
      </div>

      {/* right panel */}
      <div className="h-full w-[75%]"></div>
    </div>
  );
}

export default Home;
