import { UserType } from "@/entities/user.entities";
import { useChatsStore } from "@/stores/chats.store";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../atoms/avatar";
import { CustomButton } from "../atoms/custom-button";

export const UserItem: FC<UserType> = (props) => {
    const { chats, createChat} = useChatsStore()
    const { id, avatar_url, name } = props;

    const goToChat = async () => {
        let chat;
        const findedChatIndex = chats.findIndex(el => el.receiver_id === id);
        if (findedChatIndex === -1) {
            let { data, error } = await createChat({
                receiver_id: id
            })

            if (error) return;
            chat = data;
        }

        if (chat) {
            router.navigate({
                pathname: "/app/chat/[id]",
                params: { id: chat?.id }
            })
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Avatar
                    size={64}
                    url={avatar_url}
                />
                <Text>{name}</Text>
            </View>
            <CustomButton title="Начать чат" onPress={goToChat} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    }
})