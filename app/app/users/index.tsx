import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { UserItem } from "@/components/molecules/UserItem";
import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function UsersScreen() {
    const { user } = useAuthStore();
    const { users, fetchUsers } = useUsersStore();

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <HorizontalContainer>
            <View style={styles.settings}>
                {users.filter(el => el.id !== user?.id).map(user => (
                    <UserItem {...user} />
                ))}
            </View>
        </HorizontalContainer>
    );
}

const styles = StyleSheet.create({
    settings: {
        flexDirection: "column",
        gap: 14,
        alignItems: "center"
    },
    name: {
        fontFamily: "MontserratBold",
        fontSize: 24,
        color: "#000000"
    }
})