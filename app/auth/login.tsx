import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { useAuthStore } from "@/stores/auth.store";
import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("user@example.com");
  const [pass, setPass] = useState("string1");

  const loginHandler = async () => {
    const res = await login({
      email: email,
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
          <Text style={styles.title}>ВХОООД</Text>
        </View>
        <CustomInput
          label="Почта"
          placeholder="Введите почту"
          onChangeText={setEmail}
        />
        <CustomInput
          label="Пароль"
          placeholder="Введите пароль"
          secureTextEntry
          onChangeText={setPass}
        />
        <Text>
          Вы ещё не{" "}
          <Link href="/auth/register" style={styles.link}>
            зарегистрированы?
          </Link>
        </Text>
      </View>

      <CustomButton
        fullWidth
        title="Войти"
        onPress={loginHandler}
      />
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
  },
  titleContainer: {
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
  }
})