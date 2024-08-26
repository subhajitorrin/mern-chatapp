import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import LowerSection from "./LowerSection";
import { ConversationStore } from "../../store/ConversationStore.js";
import { useAuthStore } from "../../store/AuthStore.js";

function Conversation() {
  const [name, setName] = useState("");
  const { user } = useAuthStore();
  const { partner } = ConversationStore();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (partner === null) {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col">
        <p className="text-[30px]">Welcome, {name}</p>
        <p>You're all set to start conversations with your connections.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full">
      <TopSection />
      <MiddleSection />
      <LowerSection />
    </div>
  );
}

export default Conversation;
