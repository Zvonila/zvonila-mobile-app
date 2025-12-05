import { FC } from 'react';
import type { ButtonProps } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps extends ButtonProps {
  fullWidth?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = (props) => {
  return (
    <TouchableOpacity style={[styles.btn, props.fullWidth && styles.fullWidth]} {...props}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {

    backgroundColor: '#FE4F18',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
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