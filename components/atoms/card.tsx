import { FC, ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
    children: ReactNode;
    style?: StyleProp<ViewStyle>
}

export const Card: FC<CardProps> = ({children, style}) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#eeeeee",
        width: "100%",
        borderRadius: 16,
        padding: 16
    }
})