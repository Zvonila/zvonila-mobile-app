import { UserType } from "@/entities/user.entities";
import { getUser } from "@/infrastructure/users.api";
import { getToken } from "@/utils/access-token.utils";
import { useWebSocket } from "@/utils/websockets";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { lastMessage, sendMessage: wsSend } = useWebSocket();
    const [user, setUser] = useState<UserType | null>(null)
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, input]);
        setInput("");
    };

    useEffect(() => {
        const load = async () => {
            const token = await getToken() || "";
            const res = await getUser({ id: Number(id), access_token: token })
            if (res.error) return;
            if (res.data) {
                setUser(res.data)
            }
        }
        load()
    }, [])

    useEffect(() => {
        if (!lastMessage) return;

        // Если сообщение — текст
        if (typeof lastMessage === "string") {
            setMessages(prev => [...prev, lastMessage]);
        }
        // Если JSON
        else if (typeof lastMessage === "object") {
            if (lastMessage.type === "message") {
                setMessages(prev => [...prev, lastMessage.text]);
            }
        }
    }, [lastMessage]);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: user?.avatar_url,
                        }}
                    />
                    <Text style={styles.userName}>{user?.name}</Text>
                </View>

                {/* Пустой блок для симметрии */}
                <Link
                    href={{
                        pathname: "/app/call/[id]",
                        params: { id: "321" }
                    }}
                    style={{ width: 30 }}
                >
                    <MaterialIcons
                        name="call"
                        size={24}
                    />
                </Link>
            </View>

            {/* Список сообщений */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text style={styles.messageText}>{item}</Text>
                    </View>
                )}
                contentContainerStyle={{ padding: 16 }}
            />

            {/* Поле ввода */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Написать сообщение..."
                />
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <Text style={styles.sendBtnText}>→</Text>
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

    /* Ввод */
    inputRow: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    sendBtn: {
        marginLeft: 10,
        backgroundColor: "#007AFF",
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 10,
    },
    sendBtnText: {
        color: "#fff",
        fontSize: 18,
    },
});
