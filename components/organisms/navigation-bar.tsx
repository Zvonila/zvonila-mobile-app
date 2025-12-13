import ChatCircleIcon from "@/assets/icons/chat-circle";
import SettingsIcon from "@/assets/icons/settings";
import { Href, router, usePathname } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AccelerationModal } from "./acceleration-modal";

const navigationConfig: { id: number, name: string, link: Href, icon: string }[] = [
    { id: 0, name: "Чаты", link: "/app/tabs/chats", icon: "chat" },
    { id: 1, name: "Звонки", link: "/app/tabs/calls", icon: "call" },
    { id: 2, name: "Пользователи", link: "/app/tabs/users", icon: "people" },
    { id: 3, name: "Профиль", link: "/app/tabs/profile", icon: "person" },
]

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
                <SettingsIcon
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
