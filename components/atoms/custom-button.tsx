import { FC } from 'react';
import type { ButtonProps, StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Spinner } from './spinner';

interface CustomButtonProps extends ButtonProps {
  fullWidth?: boolean;
  styles?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}


export const CustomButton: FC<CustomButtonProps> = ({
  title,
  isLoading,
  fullWidth,
  styles: customStyles,
  ...rest
}) => {
  return (
    <Pressable
      style={[styles.btn, fullWidth && styles.fullWidth, customStyles]}
      {...rest}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLoading && <Spinner />}
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FE4F18',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  fullWidth: {
    width: "100%",
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "MontserratBold"
  },
});