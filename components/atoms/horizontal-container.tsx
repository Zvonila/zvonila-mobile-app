import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface HorizontalContainerProps {
    children: ReactNode;
}

export const HorizontalContainer: FC<HorizontalContainerProps> = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
});
