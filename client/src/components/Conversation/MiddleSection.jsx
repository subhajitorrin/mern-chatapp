import React, { useEffect, useRef, useState } from "react";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import { ConversationStore } from "../../store/ConversationStore";
import { useAuthStore } from "../../store/AuthStore.js";

function MiddleSection() {
  const [messageList, setMessagesList] = useState([]);
  const { messages } = ConversationStore();
  const { user } = useAuthStore();
  const conversationRef = useRef(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [conversationRef.current]);

  useEffect(() => {
    if (messages) {
      setMessagesList(messages);
    }
  }, [messages]);

  return (
    <div
      ref={conversationRef}
      className="scrollNone p-[1rem] h-[80%] border-b border-[#ffffff73] overflow-y-auto "
    >
      {messageList.map((msg, index) =>
        msg.sender === user._id ? (
          <ChatRight key={index} message={msg.message} />
        ) : (
          <ChatLeft key={index} message={msg.message} />
        )
      )}
    </div>
  );
}

export default MiddleSection;
