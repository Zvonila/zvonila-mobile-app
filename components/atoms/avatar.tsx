import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

interface AvatarProps {
    url?: string;
    size?: number;
}

export const Avatar: FC<AvatarProps> = ({ url, size = 48 }) => {
    return (
        <View style={[styles.image_container, { width: size, height: size, borderRadius: size / 2 }]}>
            <Image
                source={{
                    uri: url,
                }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image_container: {
        overflow: "hidden",
        backgroundColor: "#E4E4E4",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
