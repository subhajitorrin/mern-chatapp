import React from "react";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import LowerSection from "./LowerSection";

function Conversation() {
  return (
    <div className="h-full w-full">
      <TopSection />
      <MiddleSection />
      <LowerSection />
    </div>
  );
}

export default Conversation;
