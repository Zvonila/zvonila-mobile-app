import { CustomButton } from "@/components/atoms/custom-button";
import { CustomInput } from "@/components/atoms/custom-input";
import { HorizontalContainer } from "@/components/atoms/horizontal-container";
import { useAuthStore } from "@/stores/auth.store";

import { Text, View } from "react-native";

export default function CallsScreen() {
  const {verify} = useAuthStore(); 

  return (
    <View>
      <HorizontalContainer>
        <CustomInput
          placeholder="Поиск"
        />
        <Text>Звонки</Text>    
        <CustomButton title="test" onPress={verify} />    
      </HorizontalContainer>
    </View>
  );
}