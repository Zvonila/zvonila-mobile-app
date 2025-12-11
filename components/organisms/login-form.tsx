import { useAuthStore } from "@/stores/auth.store";
import { loginSchema } from "@/utils/schemas/login-form.schema";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router } from "expo-router";
import { FC, useRef, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomButton } from "../atoms/custom-button";
import { CustomInput } from "../atoms/custom-input";

type Inputs = {
    email: string;
    password: string;
}

export const LoginForm: FC = () => {
    const { login } = useAuthStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<Inputs>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(loginSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const passwordRef = useRef<TextInput>(null);

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true)
        const res = await login({
            email: data.email,
            password: data.password
        })
        setIsLoading(false)

        if (res.error) {
            setError("password", {
                type: "manual",
                message: res.error,
            });
            return;
        }

        if (!res.error && res.data) {
            router.replace("/app/tabs/chats");
        }

    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>ВХОООД</Text>
                    </View>

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput
                                label="Почта"
                                placeholder="Введите почту"
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                                returnKeyType="next"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput
                                ref={passwordRef}
                                label="Пароль"
                                placeholder="Введите пароль"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                                returnKeyType="done"
                            />
                        )}
                    />
                    <Text>
                        Вы ещё не{" "}
                        <Link href="/auth/register" style={styles.link}>
                            зарегистрированы?
                        </Link>
                    </Text>

                    <CustomButton
                        fullWidth
                        title="Войти"
                        onPress={handleSubmit(onSubmit)}
                        styles={styles.button}
                        isLoading={isLoading}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: "column",
    },
    content: {
        flex: 1,
        flexDirection: "column",
        gap: 14,
    },
    titleWrapper: {
        marginTop: 54,
    },
    title: {
        textAlign: "center",
        fontFamily: "MontserratBlack",
        fontSize: 64,
    },
    link: {
        color: "#FE4F18",
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 32,
    }
});
