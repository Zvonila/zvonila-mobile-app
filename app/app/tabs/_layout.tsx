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
        contentStyle: { backgroundColor: "#ffffff" }
      }} />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    flex: 1,
  },
  stack: {
    flex: 1,
  },
});
