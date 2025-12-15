import ChevronLeftIcon from "@/assets/icons/chevron-left";
import { UserType } from "@/entities/user.entities";
import { useChatsStore } from "@/stores/chats.store";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "../atoms/avatar";

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
        <Pressable style={styles.card} onPress={goToChat}>
            <View style={styles.row}>
                <Avatar
                    size={48}
                    name={name}
                    url={avatar_url}
                />
                <Text>{name}</Text>
            </View>
            <ChevronLeftIcon 
                style={{ 
                    transform: [{ rotate: '180deg' }],
                }}
                pathStroke="black"
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    }
})