import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface CallManageBarProps {
    toggleFacing: () => void;
}

export const CallManageBar: FC<CallManageBarProps> = (props) => {
    return (
        <View style={styles.bar}>
            <MaterialIcons
                name="call-end"
                size={24}
            />
            <MaterialIcons
                name="mic"
                size={24}
            />
            <MaterialIcons
                name="camera-alt"
                size={24}
            />
            <MaterialIcons
                name="volume-up"
                size={24}
            />
            <MaterialIcons
                name="switch-video"
                size={24}
                onPress={props.toggleFacing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: "#F4F5F9",
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})