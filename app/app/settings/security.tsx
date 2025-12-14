import { Card } from "@/components/atoms/card";
import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function SecurityPage() {
    const { changePassword } = useAuthStore();
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const changePasswordHandler = async () => {
        if (password.length === 0 || newPassword.length === 0) return;
        setIsUpdating(true)
        const res = await changePassword({
            password: password,
            new_password: newPassword,
        })
        setIsUpdating(false)

        if (!res.error) {
            setPassword("");
            setNewPassword("");
        }
    }

    return (
        <HorizontalContainer>
            <Card style={styles.column}>
                <CustomInput
                    label="Старый пароль"
                    placeholder="Введите старый пароль"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <CustomInput
                    label="Новый пароль"
                    placeholder="Введите новый пароль"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <CustomButton
                    fullWidth
                    title="Изменить"
                    onPress={changePasswordHandler}
                    isLoading={isUpdating}
                />
            </Card>
        </HorizontalContainer>
    )
}

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        gap: 14
    }
})