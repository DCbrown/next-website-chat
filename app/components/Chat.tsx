import React, { useRef, useEffect, useCallback, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { SiteContent } from "../types/SiteContent";
import Vapi from "@vapi-ai/web";
import { createChatAssistant } from "./assistsant/chat.assistant";

// Initialize Vapi outside component to avoid recreating on each render
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_TOKEN!);

type ChatProps = {
  siteContent: SiteContent;
  onClear: () => void;
};

const Chat: React.FC<ChatProps> = ({ siteContent, onClear }) => {
  const [callStatus, setCallStatus] = useState<
    "inactive" | "loading" | "active"
  >("inactive");

  const { user } = useUser();
  const { openSignUp } = useClerk();

  // Vapi voice controls
  const startVoiceChat = async () => {
    if (!user) {
      openSignUp();
      return;
    }
    setCallStatus("loading");
    const assistant = createChatAssistant(siteContent);
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!, assistant);
  };

  const stopVoiceChat = () => {
    setCallStatus("loading");
    vapi.stop();
  };

  const handleClear = () => {
    if (callStatus === "active") {
      vapi.stop();
    }
    onClear();
  };

  useEffect(() => {
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => setCallStatus("inactive"));

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="voice-controls">
        {callStatus === "inactive" && (
          <button
            type="button"
            onClick={startVoiceChat}
            className="voice-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        )}
        {callStatus === "loading" && <div className="loading-spinner"></div>}
        {callStatus === "active" && (
          <button
            type="button"
            onClick={stopVoiceChat}
            className="voice-button active"
          >
            Press To Stop
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleClear}
        className="clear-button"
        disabled={callStatus === "loading"}
        style={{ opacity: callStatus === "loading" ? 0.5 : 1 }}
      >
        Clear Site
      </button>
    </div>
  );
};

export default Chat;
