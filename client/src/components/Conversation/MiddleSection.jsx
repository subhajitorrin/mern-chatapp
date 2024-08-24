import React, { useEffect, useRef } from "react";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";


function MiddleSection() {
  
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [conversationRef.current]);

  return (
    <div
      ref={conversationRef}
      className="scrollNone p-[1rem] h-[80%] border-b border-[#ffffff73] overflow-y-auto "
    >
      <ChatLeft />
      <ChatRight />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatRight />
      <ChatRight />
      <ChatLeft />
      <ChatLeft />
      <ChatLeft />
      <ChatRight />
      <ChatLeft />
      <ChatRight />
    </div>
  );
}

export default MiddleSection;
