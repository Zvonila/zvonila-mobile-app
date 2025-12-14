import ChevronLeftIcon from "@/assets/icons/chevron-left";
import PhoneIcon from "@/assets/icons/phone";
import { UserType } from "@/entities/user.entities";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "../atoms/avatar";

interface ChatHeaderProps {
    user: UserType;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ user }) => {
    return (
        <View style={styles.header}>
            <View style={styles.row}>
                <Pressable
                    style={styles.back_button}
                    onPress={() => router.back()}
                >
                    <ChevronLeftIcon pathStroke="black" />
                </Pressable>

                <View style={styles.user}>
                    <Avatar
                        size={48}
                        name={user.name || "User"}
                        url={user.avatar_url}
                    />
                    <Text style={styles.username}>{user.name}</Text>
                </View>
            </View>

            <Pressable
                style={styles.call_button}
            >
                <PhoneIcon pathStroke="black" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    back_button: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 14,
        flex: 1,
    },
    username: {
        fontFamily: "MontserratBold",
        fontSize: 16,
    },
    call_button: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    }
})