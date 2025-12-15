import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { ChatItem } from "@/components/molecules/ChatItem";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { useMessagesWebSocket } from "@/hooks/useMessagesWebSocket";
import { useChatsStore } from "@/stores/chats.store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChatsScreen() {
  const { fetchChats } = useChatsStore();
  const chats = useChatsStore(state => state.chats);
  useChatWebSocket();
  useMessagesWebSocket();

  useEffect(() => {
    fetchChats();
  }, [fetchChats])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <HorizontalContainer>
        <Text style={styles.title}>Чаты</Text>
        {chats.filter(el => el.last_message).length === 0 && (
          <Text>Создайте чат через "Ускорялку"</Text>
        )}
        <View style={styles.chat_list}>
          {chats.filter(el => el.last_message).map(chat => (
            <Pressable
              key={chat.id}
              onPress={() => router.push({
                pathname: "/app/chat/[id]",
                params: { id: chat.id }
              })}
            >
              <ChatItem
                user={chat.companion}
                last_message={chat.last_message}
              />
            </Pressable>
          ))}
        </View>
      </HorizontalContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    height: "100%",
  },
  title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    marginBottom: 8,
  },
  chat_list: {
    flexDirection: "column",
    gap: 14
  }
});
