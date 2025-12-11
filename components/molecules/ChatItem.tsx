import { MessageType } from "@/entities/messsages.entities";
import { UserType } from "@/entities/user.entities";
import { formatMessageTime } from "@/utils/format-message-time";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../atoms/avatar";

interface ChatItemProps {
    user: UserType;
    last_message?: MessageType;
}

export const ChatItem: FC<ChatItemProps> = ({ user, last_message }) => {
    return (
        <View style={styles.card}>
            {/* Аватар */}
            <Avatar
                size={48}
                name={user.name}
                url={user.avatar_url}
            />

            {/* Основной контент */}
            <View style={styles.info}>
                <View style={styles.info_row}>
                    <Text style={styles.name}>{user.name}</Text>
                    {last_message && (
                        <Text style={styles.time}>
                            {formatMessageTime(last_message.created_at)}
                        </Text>
                    )}
                </View>

                {last_message && (
                    <View style={styles.info_row}>
                        <Text
                            style={styles.message}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {last_message.text}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        height: "auto",
        gap: 8,
    },
    info: {
        flex: 1,
        flexDirection: "column",
    },
    info_row: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },
    name: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        marginBottom: -5,
        flex: 1,
    },
    message: {
        fontFamily: "MontserratMedium",
        fontSize: 14,
        color: "#000000",
        opacity: 0.5,
        flex: 1,
    },
    timeContainer: {
        marginLeft: 8,
        alignSelf: "flex-start",
        width: 40,
        alignItems: "flex-end",
    },
    time: {
        fontSize: 12,
        color: "#888",
    },
});
