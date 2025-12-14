import AttechmentIcon from "@/assets/icons/attechment";
import PaperPlaneIcon from "@/assets/icons/paper-plane";
import { useMessagesStore } from "@/stores/messages.store";
import { FC, useState } from "react";
import { Pressable, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface ChatInputAreaProps {
    id: string;
}

export const ChatInputArea: FC<ChatInputAreaProps> = ({ id }) => {
    const { createMessage } = useMessagesStore()

    const [input, setInput] = useState<string>("");

    const sendMessage = () => {
        if (!input.trim()) return;

        createMessage({
            chat_id: parseInt(id),
            text: input
        })
        setInput("");
    };

    return (
        <View style={styles.inputRow}>
            <Pressable style={styles.attechment}>
                <AttechmentIcon pathStroke="black" />
            </Pressable>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Написать сообщение..."
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <PaperPlaneIcon pathStroke="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        fontSize: 14,
        paddingHorizontal: 14,
        fontFamily: "Montserrat",
    },
    sendBtn: {
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    attechment: {
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center"
    }
})