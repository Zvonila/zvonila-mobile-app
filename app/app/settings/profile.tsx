import { Card } from "@/components/atoms/card";
import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function ProfilePage() {
    const { changeName } = useAuthStore();
    const user = useAuthStore(state => state.user);
    const [name, setName] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const changeNameHandler = async () => {
        if (name.length === 0) return;
        setIsUpdating(true)
        await changeName({
            name: name,
        })
        setIsUpdating(false)
    }

    useEffect(() => {
        setName(user?.name || "")
    }, [user?.name])

    return (
        <HorizontalContainer>
            <Card style={styles.column}>
                <CustomInput
                    label="Изменить имя"
                    placeholder="Введите имя"
                    value={name}
                    onChangeText={setName}
                />
                <CustomButton 
                    fullWidth 
                    title="Изменить" 
                    onPress={changeNameHandler} 
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