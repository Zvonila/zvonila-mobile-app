import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { Href, Link, usePathname } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

const navigationConfig: { id: number, name: string, link: Href, icon: string }[] = [
    { id: 0, name: "Чаты", link: "/app/chats", icon: "chat" },
    { id: 1, name: "Звонки", link: "/app/calls", icon: "call" },
    { id: 2, name: "Пользователи", link: "/app/users", icon: "people" },
    { id: 3, name: "Профиль", link: "/app/profile", icon: "person" },
]

export const NavigationBar: FC = () => {
    const pathname = usePathname();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {navigationConfig.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <Link
                            href={item.link}
                            key={item.id}
                            style={[styles.link, isActive && styles.activeLink]}
                        >
                            <View style={styles.itemContent}>
                                <MaterialIcons
                                    name={item.icon as any}
                                    size={24}
                                    color={isActive ? "#fff" : "#FE4F18"}
                                />
                            </View>
                        </Link>
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
        backgroundColor: "rgba(254, 79, 24, 0.05)",
        borderRadius: 24,
        padding: 8,
    },
    link: {
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 4,
    },
    activeLink: {
        backgroundColor: "#FE4F18",
        paddingHorizontal: 32
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
