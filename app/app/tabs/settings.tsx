import LockIcon from "@/assets/icons/lock";
import PencilIcon from "@/assets/icons/pencil";
import { Avatar } from "@/components/atoms/avatar";
import { Card } from "@/components/atoms/card";
import { CustomButton } from "@/components/atoms/custom-button";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
    const { logout } = useAuthStore();
    const user = useAuthStore(state => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const logoutHandler = async () => {
        setIsLoading(true)
        const res = await logout();
        setIsLoading(false)

        if (!res.error) {
            router.push("/auth/login")
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HorizontalContainer>
                <View style={styles.page}>

                    <Card style={styles.user}>
                        <Avatar
                            size={64}
                            name={user?.name || "User"}
                            url={user?.avatar_url}
                        />
                        <View style={styles.user_info}>
                            <Text style={styles.user_name}>{user?.name}</Text>
                            <Text style={styles.user_email}>{user?.email}</Text>
                        </View>
                        <Pressable
                            onPress={() => router.push("/app/settings/profile")}
                        >
                            <PencilIcon pathStroke="black" />
                        </Pressable>
                    </Card>

                    <Card>
                        <Pressable
                            style={styles.sections}
                            onPress={() => router.push("/app/settings/security")}
                        >
                            <LockIcon pathStroke="black" />
                            <Text>Безопасность</Text>
                        </Pressable>
                    </Card>

                    <CustomButton 
                        fullWidth 
                        title="Выйти" 
                        onPress={logoutHandler} 
                        isLoading={isLoading}
                    />
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
        marginTop: 24,
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    user_info: {
        flexDirection: "column",
        flex: 1,
    },
    user_name: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        lineHeight: 20
    },
    user_email: {
        fontSize: 14,
    },
    sections: {
        flexDirection: "row",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 8
    }
})