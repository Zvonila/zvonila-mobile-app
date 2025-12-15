import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { FC, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { UserItem } from "../molecules/UserItem";

interface UsersListProps {
    search?: string;
    onClose?: () => void;
}

export const UsersList: FC<UsersListProps> = ({ search, onClose }) => {
    const { user } = useAuthStore();
    const { users, fetchUsers } = useUsersStore();

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const filteredUsers = useMemo(() => {
        return users
            .filter(u => u.id !== user?.id)
            .filter(u =>
                search
                    ? u.name.toLowerCase().includes(search.toLowerCase())
                    : true
            );
    }, [users, user?.id, search]);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {filteredUsers.map(user => (
                <UserItem 
                    key={user.id} 
                    {...user} 
                    onClose={onClose}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 250,
    },
    content: {
        paddingVertical: 8,
        gap: 14,
        alignItems: "center",
    },
})