import { Avatar } from "@/components/atoms/avatar";
import { CustomButton } from "@/components/atoms/custom-button";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const logoutHandler = async () => {
    await logout()
    router.navigate("/auth/login")
  }

  return (
    <HorizontalContainer>
      <View style={styles.settings}>
        <Avatar size={165} name={user?.name || "User"} url={user?.avatar_url} />
        <Text style={styles.name}>{user?.name}</Text>
        <CustomButton fullWidth title="Настройки" onPress={() => router.navigate("/app/settings")} />
        <CustomButton fullWidth title="Выйти" onPress={logoutHandler} />
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