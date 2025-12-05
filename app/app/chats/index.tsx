import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { ChatItem } from "@/components/molecules/ChatItem";
import { useAuthStore } from "@/stores/auth.store";
import { useChatsStore } from "@/stores/chats.store";
import { Link } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChatsScreen() {
  const {user  } = useAuthStore();
  const { chats, fetchChats } = useChatsStore();

  useEffect(() => {
    if (chats.length === 0) {
      fetchChats();
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <HorizontalContainer>
        <CustomInput placeholder="Поиск" />
      </HorizontalContainer>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <HorizontalContainer>
          {chats.map(chat => (
            <Link
              href={{
                pathname: "/app/chat/[id]",
                params: { id: chat.id }
              }}
              key={chat.id}
            >
              <ChatItem
                user_id={ 
                  chat.initiator_id === user?.id ? chat.receiver_id : chat.initiator_id
                }
              />
            </Link>
          ))}

          <View>
            <Text>Ой, а это безопасная зона!</Text>
          </View>
        </HorizontalContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 0
  },
});
