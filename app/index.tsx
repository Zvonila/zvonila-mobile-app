import { useAuthStore } from "@/stores/auth.store";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function Index() {
  const { user, isAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuth(); // асинхронная проверка
      setAuthenticated(result);
      setAuthChecked(true);
    };
    checkAuth();
  }, [isAuth]);

  if (!authChecked) {
    return <Text>Loading...</Text>; // или спиннер
  }

  return authenticated ? (
    <Redirect href="/app/tabs/chats" />
  ) : (
    <Redirect href="/auth/login" />
  );
}

