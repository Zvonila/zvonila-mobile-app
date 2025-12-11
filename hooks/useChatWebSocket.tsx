import { useChatsStore } from "@/stores/chats.store";
import { useWebSocket } from "@/utils/websockets";
import { useEffect } from "react";

export const useChatWebSocket = () => {
    const { addChat, removeChat } = useChatsStore();
    const { lastMessage } = useWebSocket();

    useEffect(() => {
        if (!lastMessage) return;
        if (lastMessage.type === "created_chat") {
            addChat(JSON.parse(lastMessage.data));
        }

        if (lastMessage.type === "deleted_chat") {
            const data = JSON.parse(lastMessage.data)
            if (parseInt(data.chat_id)) {
                removeChat(parseInt(data.chat_id))
            }
        }

    }, [lastMessage])

}