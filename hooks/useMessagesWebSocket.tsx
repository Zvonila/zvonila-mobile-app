import { MessageType } from "@/entities/messsages.entities";
import { useChatsStore } from "@/stores/chats.store";
import { useMessagesStore } from "@/stores/messages.store";
import { useWebSocket } from "@/utils/websockets";
import { useEffect } from "react";

export const useMessagesWebSocket = () => {
    const { addMessage, removeMessage } = useMessagesStore()
    const { updateLastChatMessage } = useChatsStore();
    const { lastMessage } = useWebSocket()

    useEffect(() => {
        if (!lastMessage) return;
        if (lastMessage.type === "message") {
            const data = JSON.parse(lastMessage.data) as MessageType
            updateLastChatMessage(data.chat_id, data)
            addMessage(data);
        }

        if (lastMessage.type === "deleted_message") {
            const data = JSON.parse(lastMessage.data)
            if (parseInt(data.message_id)) {
                removeMessage(parseInt(data.message_id))
            }
        }

    }, [lastMessage])
}