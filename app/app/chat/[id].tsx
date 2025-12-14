import { ChatHeader } from "@/components/organisms/chat-header";
import { ChatInputArea } from "@/components/organisms/chat-input-area";
import { MessagesList } from "@/components/organisms/messges-list";
import { useChatPartner } from "@/hooks/useChatPartner";
import { useMessagesWebSocket } from "@/hooks/useMessagesWebSocket";
import { useAuthStore } from "@/stores/auth.store";
import { useChatsStore } from "@/stores/chats.store";
import { useMessagesStore } from "@/stores/messages.store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { Text, View } from "react-native";

export default function ChatPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const chatId = Number(id);

    useMessagesWebSocket();

    const user = useAuthStore(state => state.user)
    const chats = useChatsStore(state => state.chats)
    const fetchMessages = useMessagesStore(state => state.fetchMessages)

    const chat = useMemo(
        () => chats.find(c => c.id === chatId),
        [chats, chatId]
    );

    const {
        partner,
        loading: partnerLoading,
        error: partnerError,
    } = useChatPartner(chat, user?.id);

    useEffect(() => {
        if (!chatId) return;
        fetchMessages({ chat_id: chatId, offset: 0, limit: 100 });
    }, [fetchMessages, chatId]);


    if (!user) {
        return <Text>Пользователь не авторизован</Text>;
    }

    if (!chat) {
        return <Text>Чат не найден</Text>;
    }

    if (partnerLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (partnerError || !partner) {
        return <Text>Не удалось загрузить собеседника</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <ChatHeader user={partner} />

            <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
                <MessagesList id={id} />
            </View>

            <ChatInputArea id={id} />
        </View>
    );
}