import { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

export const Spinner: FC = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View style={[styles.loader, { transform: [{ rotate: rotation }] }]} />
    );
};

const styles = StyleSheet.create({
    loader: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#FFF",
        borderBottomColor: "transparent",
        borderRadius: 100,
    }
});
