import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { ChatItem } from "@/components/molecules/ChatItem";
import { useChatWebSocket } from "@/hooks/useChatWebSocket";
import { useMessagesWebSocket } from "@/hooks/useMessagesWebSocket";
import { useChatsStore } from "@/stores/chats.store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function ChatsScreen() {
  const { fetchChats } = useChatsStore();
  const chats = useChatsStore(state => state.chats);
  useChatWebSocket();
  useMessagesWebSocket();

  useEffect(() => {
    fetchChats();
  }, [fetchChats])

  return (
    <View style={styles.container}>
      <HorizontalContainer>
        <CustomInput placeholder="Поиск" />
      </HorizontalContainer>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          height: "100%"
        }}
      >
        {chats.map(chat => (
          <HorizontalContainer key={chat.id}>
            <Pressable
              
              onPress={() => router.push({
                pathname: "/app/chat/[id]",
                params: { id: chat.id }
              })}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
            >
              <ChatItem
                user={chat.companion}
                last_message={chat.last_message}
              />
            </Pressable>
          </HorizontalContainer>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 8
  },
  buttonPressed: {
    backgroundColor: "#cfcfcf59",
    padding: 8,
    borderRadius: 14
  }
});
