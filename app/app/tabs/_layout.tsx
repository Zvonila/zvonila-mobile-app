import { NavigationBar } from "@/components/organisms/navigation-bar";
import { useCallWebSocket } from "@/hooks/useCallWebSocket";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabsLayout() {
  useCallWebSocket();
  
  return (
    <View style={styles.container}>
      <Stack screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor: "#F5F5F5" }
      }} />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stack: {
    flex: 1,
  },
});
