import { UserType } from "@/entities/user.entities";
import { getUser } from "@/infrastructure/users.api";
import { getToken } from "@/utils/access-token.utils";
import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const ChatItem: FC<{user_id: number}> = ({user_id}) => {
    const [user, setUser] = useState<UserType | null>(null)
    
    useEffect(() => {
        const load = async () => {
            const token = await getToken() || "";
            const res = await getUser({ id: user_id, access_token: token })
            if (res.error) return;
            if (res.data) {
                setUser(res.data)
            }
        }
        load()
    }, [])

    return (
        <View style={styles.card}>
            {/* Аватар */}
            <View style={styles.image_container}>
                <Image
                    source={{
                        uri: user?.avatar_url,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Основной контент */}
            <View style={styles.info}>
                <View style={styles.info_row}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.time}>18ч</Text>
                </View>


                <View style={styles.info_row}>
                    <Text
                        style={styles.message}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        Ты девочке вчера звонил? Вопрос тихо мирно будем решать или мои волки подъедут?
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "auto",
        gap: 8,
    },
    image_container: {
        width: 48,
        height: 48,
        borderRadius: 24, // круглый аватар
        overflow: "hidden",
        backgroundColor: "#E4E4E4",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    info: {
        flex: 1,
        flexDirection: "column",
    },
    info_row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    name: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        marginBottom: -5,
        flex: 1,
    },
    message: {
        fontFamily: "MontserratMedium",
        fontSize: 14,
        color: "#000000",
        opacity: 0.5,
        flex: 1,
    },
    timeContainer: {
        marginLeft: 8,
        alignSelf: "flex-start",
        width: 40,
        alignItems: "flex-end",
    },
    time: {
        fontSize: 12,
        color: "#888",
    },
});
