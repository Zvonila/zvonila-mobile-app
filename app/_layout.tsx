import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useAuthStore } from "@/stores/auth.store";
import { getToken } from "@/utils/access-token.utils";
import { Fragment, useEffect, useState } from 'react';
import { Text } from "react-native";

export default function RootLayout() {
  useFonts({
    MontserratBlack: require("../assets/fonts/Montserrat-Black.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontserratExtraLight: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratThin: require("../assets/fonts/Montserrat-Thin.ttf"),
  });

  const { isAuth, verify } = useAuthStore()
  const [authChecked, setAuthChecked] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        await verify();
      }
      const authResult = await isAuth();
      setAuth(authResult);
      setAuthChecked(true);
    };
    checkAuth();
  }, [isAuth, verify]);

  if (!authChecked) {
    return <Text>loading</Text>; // или спиннер
  }

  return (
    <Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {auth ? (
          <Stack.Screen name="app" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        )}
      </Stack>
      <StatusBar style="auto" />
    </Fragment>
  );
}