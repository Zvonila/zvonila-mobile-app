import { BACKEND_URL } from "@/constants";
import { getToken } from "@/utils/access-token.utils";
import { WebSocketProvider } from "@/utils/websockets";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const t = await getToken();
      setToken(t);
    };
    load();
  }, []);

  // Пока токен загружается — просто рендерим загрузку
  if (!token) return null;

  const wsUrl = `${BACKEND_URL}/ws/${token}`;

  return (
    <WebSocketProvider url={wsUrl}>
      <SafeAreaView style={styles.page}>
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </SafeAreaView>
    </WebSocketProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
