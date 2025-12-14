import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { CustomButton } from "../atoms/custom-button";
import { HorizontalContainer } from "../atoms/horizontal-container";

export const BackButtonArea: FC = () => {
    return (
        <View style={styles.container}>
            <HorizontalContainer>
                <CustomButton
                    fullWidth
                    title="Назад"
                    variant="secondary"
                    onPress={() => router.back()}
                />
            </HorizontalContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
    }
})