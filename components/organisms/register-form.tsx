import { useAuthStore } from "@/stores/auth.store";
import { registerSchema } from "@/utils/schemas/register-form.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { FC, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { CustomButton } from "../atoms/custom-button";
import { CustomInput } from "../atoms/custom-input";

type Inputs = {
    email: string;
    name: string;
    password: string;
    confirm: string;
}

export const RegisterForm: FC = () => {
    const { register } = useAuthStore();
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
        resolver: yupResolver(registerSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const nameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmRef = useRef<TextInput>(null);

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true)
        const res = await register({
            email: data.email,
            name: data.name,
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
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Регистрация</Text>
                    <Text>
                        Уже зарегистрированы?
                        <Link href={"/auth/login"} style={styles.link}>Войти</Link>
                    </Text>
                </View>

                <View style={styles.inputs}>
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
                                onSubmitEditing={() => nameRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput
                                ref={nameRef}
                                label="Имя"
                                placeholder="Введите имя"
                                onChangeText={onChange}
                                value={value}
                                error={errors.name?.message}
                                returnKeyType="next"
                                autoCapitalize="none"
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
                                onSubmitEditing={() => confirmRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm"
                        render={({ field: { onChange, value } }) => (
                            <CustomInput
                                ref={confirmRef}
                                label="Повтор пароля"
                                placeholder="Повторите пароль"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                                error={errors.confirm?.message}
                            />
                        )}
                    />
                </View>

                <CustomButton
                    fullWidth
                    title="Зарегистрироваться"
                    onPress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                />
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
        gap: 24
    },
    inputs: {
        flexDirection: "column",
        gap: 14,
    },
    titleWrapper: {
        marginTop: 54,
    },
    title: {
        fontFamily: "MontserratBlack",
        fontSize: 40,
    },
    link: {
        color: "#FE4F18",
        textDecorationLine: "underline",
    },
});
