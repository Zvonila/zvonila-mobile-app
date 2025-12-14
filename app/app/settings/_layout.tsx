import { BackButtonArea } from "@/components/molecules/BackButtonArea";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SettingsLayout() {  
  return (
    <View style={styles.container}>
      <Stack screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: { backgroundColor: "#F5F5F5" }
      }} />
      <BackButtonArea />
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
