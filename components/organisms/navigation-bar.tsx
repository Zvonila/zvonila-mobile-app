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
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 30,
                }}
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

            <View style={{ paddingVertical: 12 }}>
                <AccelerationModal />
            </View>

            <Pressable
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: 30,
                }}
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
        flexDirection: "row",
        gap: 10,
    },
});
