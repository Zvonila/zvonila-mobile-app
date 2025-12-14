import { useMessagesStore } from "@/stores/messages.store";
import { FC, useEffect, useMemo, useRef } from "react";
import { FlatList } from "react-native";
import { Message } from "../atoms/message";

export const MessagesList: FC<{ id: string }> = ({ id }) => {
    const messages = useMessagesStore(state => state.messages);
    const flatListRef = useRef<FlatList<any> | null>(null)

    const chatMessages = useMemo(() => {
        return messages
            .filter(m => m.chat_id === parseInt(id))
            .sort((a, b) => a.id - b.id)
    }, [messages])

    useEffect(() => {
        if (!flatListRef.current) return;
        if (!chatMessages || chatMessages.length === 0) return;

        // small timeout to allow list layout to update
        const t = setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 50);

        return () => clearTimeout(t);
    }, [chatMessages]);

    return (
        <FlatList
            ref={flatListRef}
            data={chatMessages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Message {...item} />}
            contentContainerStyle={{ padding: 16 }}
        />
    )
}