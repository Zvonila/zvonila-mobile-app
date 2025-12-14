import { MessageType } from "@/entities/messsages.entities";
import { useAuthStore } from "@/stores/auth.store";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

export const Message: FC<MessageType> = (props) => {
    const { user } = useAuthStore()

    const isMine = props.sender_id === user?.id;

    return (
        <View
            style={[
                styles.message,
                isMine ? styles.myMessage : styles.alienMessage
            ]}
        >
            <Text
                style={[
                    styles.messageText,
                    isMine ? styles.myMessageText : {}
                ]}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
        borderRadius: 14,
        maxWidth: "80%",
        marginBottom: 8,
    },
    messageText: {
        fontFamily: "Montserrat", 
        fontSize: 16,
    },
    alienMessage: { alignSelf: "flex-start" },
    myMessage: {
        backgroundColor: "#FE4F18",
        alignSelf: "flex-end",
    },
    myMessageText: {
        color: "#fff",
    },
})