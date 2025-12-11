import { Avatar } from "@/components/atoms/avatar";
import { UserType } from "@/entities/user.entities";
import { useCallManager } from "@/hooks/useCallManager";
import { useMessagesWebSocket } from "@/hooks/useMessagesWebSocket";
import { getUser } from "@/infrastructure/users.api";
import { useAuthStore } from "@/stores/auth.store";
import { useChatsStore } from "@/stores/chats.store";
import { useMessagesStore } from "@/stores/messages.store";
import { getToken } from "@/utils/access-token.utils";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { createCall } = useCallManager();
    const { messages, createMessage, fetchMessages } = useMessagesStore()
    const { user: userProfile } = useAuthStore()
    const [user, setUser] = useState<UserType | null>(null)
    const [input, setInput] = useState("");
    const { chats } = useChatsStore()
    const flatListRef = useRef<FlatList<any> | null>(null)
    useMessagesWebSocket();

    const chat = chats.find(el => el.id === parseInt(id))

    const chatMessages = messages
        .filter(m => m.chat_id === parseInt(id))
        .sort((a, b) => a.id - b.id)

    const sendMessage = () => {
        if (!input.trim()) return;

        createMessage({
            chat_id: parseInt(id),
            text: input
        })
        setInput("");
    };
    
     const createCallHandler = async () => {
        if (!user) return;
        await createCall(user.id);
    };
    

    useEffect(() => {
        const load = async () => {
            if (!chat) return;
            const token = await getToken() || "";
            const userId = chat.initiator_id === userProfile?.id ? chat.receiver_id : chat.initiator_id;
            if (!userId) return;
            const res = await getUser({
                id: userId,
                access_token: token
            })
            if (res.error) return;
            if (res.data) {
                setUser(res.data)
            }
        }
        load()
    }, [chat, userProfile?.id])

    useEffect(() => {
        fetchMessages({ chat_id: parseInt(id), offset: 0, limit: 10000 });
    }, [fetchMessages, id])

    // Auto-scroll to bottom when new messages arrive for this chat
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
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Avatar
                        size={24}
                        name={user?.name || "User"}
                        url={user?.avatar_url}
                    />
                    <Text style={styles.userName}>
                        {user?.name}
                    </Text>
                </View>

                {/* Пустой блок для симметрии */}
                <MaterialIcons
                    name="call"
                    size={24}
                    onPress={createCallHandler}
                />
            </View>

            {/* Список сообщений */}
            <View style={{
                backgroundColor: "#e2e2e2",
                flex: 1
            }}>
                <FlatList
                    ref={flatListRef}
                    data={chatMessages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const isMine = item.sender_id === userProfile?.id;
                        return (
                            <View
                                key={item.id}
                                style={[
                                    styles.message,
                                    isMine ? styles.myMessage : styles.alienMessage
                                ]}
                            >
                                <Text style={[styles.messageText, isMine ? styles.myMessageText : {}]}>{item.text}</Text>
                            </View>
                        )
                    }}
                    contentContainerStyle={{
                        padding: 16,
                    }}
                />
            </View>

            {/* Поле ввода */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Написать сообщение..."
                />
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <MaterialIcons
                        name="send"
                        style={styles.sendBtnIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    /* HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
        justifyContent: "space-between",
    },
    backButton: {
        fontSize: 26,
        paddingRight: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: "600",
    },

    /* Сообщения */
    message: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#EDEDED",
        borderRadius: 10,
        alignSelf: "flex-start",
        maxWidth: "80%",
    },
    messageText: { fontSize: 16 },
    myMessage: {
        backgroundColor: "#FE4F18",
        alignSelf: "flex-end",
    },
    alienMessage: {
        backgroundColor: "#EDEDED",
        alignSelf: "flex-start",
    },
    myMessageText: {
        color: "#fff",
    },

    /* Ввод */
    inputRow: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        paddingHorizontal: 24,
        padding: 14,
        borderWidth: 0,
        borderRadius: 10,
    },
    sendBtn: {
        marginLeft: 10,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 10,
    },
    sendBtnIcon: {
        fontSize: 24,
        color: "#FE4F18",
    },
});
