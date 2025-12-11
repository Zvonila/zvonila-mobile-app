import { MaterialIcons } from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";

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
            <View style={styles.content}>
                {navigationConfig.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <Pressable
                            key={item.id}
                            onPress={() => router.push(item.link)}
                            style={[styles.link, isActive && styles.activeLink]}
                        >
                            <View style={styles.itemContent}>
                                <MaterialIcons
                                    name={item.icon as any}
                                    size={24}
                                    color={isActive ? "#fff" : "#000000"}
                                />
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    link: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 20,
    },
    activeLink: {
        backgroundColor: "#FE4F18",
    },
    itemContent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    activeTitle: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
});
