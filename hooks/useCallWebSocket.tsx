import { useCallStore } from "@/stores/call.store";
import { useWebSocket } from "@/utils/websockets";
import { router } from "expo-router";
import { useEffect } from "react";

export const useCallWebSocket = () => {
  const { lastMessage } = useWebSocket();
  const {
    setCurrentCall,
    setIncomingOffer,
    setAnswer,
    addIceCandidate,
  } = useCallStore();

  useEffect(() => {
    if (!lastMessage) return;

    const { type, data } = lastMessage;

    if (type === "call_room") {
      const call = JSON.parse(data);

      setCurrentCall(call);
      router.push(`/app/incoming/${call.id}`);
    }

    if (type === "call_offer") {
      setIncomingOffer(JSON.parse(data));
    }

    if (type === "call_answer") {
      setAnswer(JSON.parse(data));
    }

    if (type === "ice_candidate") {
      addIceCandidate(JSON.parse(data));
    }
  }, [lastMessage]);
};
