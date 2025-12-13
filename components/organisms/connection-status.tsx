import { useWebSocket } from "@/utils/websockets";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "../atoms/spinner";

export const ConnectionStatus: FC = () => {
  const { ready } = useWebSocket();

  if (ready) return null;

  return (
    <View style={styles.container}>
      <Spinner />
      <Text style={styles.text}>Переподключение</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFF4E5",
  },

  text: {
    fontSize: 14,
    color: "#8E8E93",
    fontFamily: "MontserratMedium",
  },
});
