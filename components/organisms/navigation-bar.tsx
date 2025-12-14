import ChatCircleIcon from "@/assets/icons/chat-circle";
import UserIcon from "@/assets/icons/user";
import { router, usePathname } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AccelerationModal } from "./acceleration-modal";

export const NavigationBar: FC = () => {
    const pathname = usePathname();

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.push("/app/tabs/chats")}
            >
                <ChatCircleIcon
                    pathStroke={
                        pathname === "/app/tabs/chats" ?
                            "black" :
                            "gray"
                    }
                    strokeWidth={2}
                />
            </Pressable>

            <AccelerationModal />

            <Pressable
                onPress={() => router.push("/app/tabs/settings")}
            >
                <UserIcon
                    pathStroke={
                        pathname === "/app/tabs/settings" ?
                            "black" :
                            "gray"
                    }
                    strokeWidth={2}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 40
    },
});
