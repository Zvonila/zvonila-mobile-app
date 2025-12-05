import { NavigationBar } from "@/components/organisms/navigation-bar";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function CallsLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}/>
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
