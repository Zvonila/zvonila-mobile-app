import { FC } from "react";
import type { ButtonProps } from "react-native";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Spinner } from "./spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface CustomButtonProps extends ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  styles?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  fullWidth,
  isLoading,
  disabled,
  styles: customStyles,
  ...rest
}) => {
  return (
    <Pressable
      disabled={disabled || isLoading}
      style={[
        styles.btn,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        customStyles,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {isLoading && <Spinner />}
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  /* ---------- base ---------- */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  fullWidth: {
    width: "100%",
  },

  disabled: {
    opacity: 0.6,
  },

  /* ---------- variants ---------- */
  variant_primary: {
    backgroundColor: "#FE4F18",
  },

  variant_secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FE4F18",
  },

  variant_ghost: {
    backgroundColor: "transparent",
  },

  variant_danger: {
    backgroundColor: "#FF3B30",
  },

  /* ---------- sizes ---------- */
  size_sm: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  size_md: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  size_lg: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 24,
  },

  /* ---------- text ---------- */
  text: {
    fontFamily: "MontserratBold",
  },

  text_primary: {
    color: "#FFFFFF",
  },

  text_secondary: {
    color: "#FE4F18",
  },

  text_ghost: {
    color: "#FE4F18",
  },

  text_danger: {
    color: "#FFFFFF",
  },

  textSize_sm: {
    fontSize: 14,
  },

  textSize_md: {
    fontSize: 16,
  },

  textSize_lg: {
    fontSize: 18,
  },
});
