import { forwardRef } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type CustomInputProps = TextInputProps & {
    label?: string;
    error?: string;
};

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
    ({ label, error, style, ...rest }, ref) => {
        return (
            <View style={styles.container}>
                {label && <Text style={styles.label}>{label}</Text>}

                <TextInput
                    ref={ref}
                    {...rest}
                    style={[
                        styles.input,
                        error && styles.inputError,
                        style,
                    ]}
                    placeholderTextColor="#8A8A8A"
                />

                {error && <Text style={styles.error}>{error}</Text>}
            </View>
        );
    }
);

CustomInput.displayName = "Input"

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontFamily: "MontserratBold",
        fontSize: 16,
        color: "#151618",
    },
    input: {
        borderRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 24,
        fontSize: 16,
        color: "#151618",
        backgroundColor: "#F4F5F9",
    },
    inputError: {
        borderWidth: 1,
        borderColor: "red",
    },
    error: {
        marginTop: 6,
        fontSize: 13,
        color: "red",
    },
});
