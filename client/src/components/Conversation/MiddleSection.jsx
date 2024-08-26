import React, { useEffect, useRef, useState } from "react";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import { ConversationStore } from "../../store/ConversationStore";
import { useAuthStore } from "../../store/AuthStore.js";
import { BeatLoader } from "react-spinners";

function MiddleSection() {
  const [messageList, setMessagesList] = useState([]);
  const { messages, isLoading, tempMsg } = ConversationStore();
  const { user, socket } = useAuthStore();
  const conversationRef = useRef(null);

  useEffect(() => {
    if (tempMsg !== null) {
      setMessagesList((prev) => [...prev, tempMsg]);
    }
  }, [tempMsg]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveSocketMsg", (data) => {
        setMessagesList((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTo({
        top: conversationRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [conversationRef.current, messageList]);

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
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <BeatLoader color="#ffffff" size={7} />
        </div>
      ) : (
        messageList.map((msg, index) =>
          msg.sender === user._id ? (
            <ChatRight key={index} msg={msg} />
          ) : (
            <ChatLeft key={index} msg={msg} />
          )
        )
      )}
    </div>
  );
}

export default MiddleSection;
