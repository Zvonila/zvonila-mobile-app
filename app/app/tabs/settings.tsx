import { Avatar } from "@/components/atoms/avatar";
import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
    const { user, changePassword, changeName, logout } = useAuthStore();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const changePasswordHandler = async () => {
        if (password.length === 0 || newPassword.length === 0) return;
        const res = await changePassword({
            password: password,
            new_password: newPassword,
        })

        if (!res.error) {
            setPassword("");
            setNewPassword("");
        }
    }

    const changeNameHandler = async () => {
        if (name.length === 0) return;
        await changeName({
            name: name,
        })
    }

    useEffect(() => {
        setName(user?.name || "")
    }, [user?.name])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HorizontalContainer>
                <View style={styles.page}>
                    <Avatar
                        size={165}
                        name={user?.name || "User"}
                        url={user?.avatar_url}
                    />

                    <CustomInput
                        label="Изменить имя"
                        placeholder="Введите имя"
                        value={name}
                        onChangeText={setName}
                    />
                    <CustomButton fullWidth title="Изменить" onPress={changeNameHandler} />

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
                    <CustomButton fullWidth title="Изменить" onPress={changePasswordHandler} />
                
                    <CustomButton fullWidth title="Выйти" onPress={logout} />
                </View>
            </HorizontalContainer>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
    }
})