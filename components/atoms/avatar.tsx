import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface AvatarProps {
    url?: string;
    name: string;
    size?: number;
}

export const Avatar: FC<AvatarProps> = ({ url, name, size = 48 }) => {
    return (
        <View style={[styles.image_container, { width: size, height: size, borderRadius: size / 2 }]}>
            {url ? (
                <Image
                    source={{
                        uri: url,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Text style={styles.text}>{name[0]}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    image_container: {
        overflow: "hidden",
        backgroundColor: "#E4E4E4",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    text: {
        fontFamily: "MontserratBold",
        fontSize: 14
    }
});
