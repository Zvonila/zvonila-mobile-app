import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { useAuthStore } from "@/stores/auth.store";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  const { register } = useAuthStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const registerHandler = async () => {
    const res = await register({
      email: email,
      name: name,
      password: pass
    })

    if (!res.error && res.data) {
      router.replace("/app/calls");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.topContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Регистрация</Text>
          <Text>
            Уже зарегистрированы?
            <Link href={"/auth/login"} style={styles.link}>Войти</Link>
          </Text>
        </View>

        <View>
          <CustomInput
            label="Почта"
            placeholder="Введите почту"
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            label="Имя"
            placeholder="Введите имя"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            label="Пароль"
            placeholder="Введите пароль"
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />

          <CustomInput
            label="Повтор пароля"
            placeholder="Повторите пароль"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        </View>
      </View>

      <CustomButton fullWidth title="Зарегистрироваться" onPress={registerHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  topContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    rowGap: 24,
  },
  titleContainer: {
    marginTop: 54,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontFamily: "MontserratBlack",
    fontSize: 40,
  },
  link: {
    color: "#FE4F18",
    textDecorationLine: "underline",
  }
})