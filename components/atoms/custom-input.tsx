import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type CustomInputProps = TextInputProps & {
    label?: string;
    error?: string;
};

export function CustomInput({ label, error, style, ...rest }: CustomInputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
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
        color: "#000",
        backgroundColor: "#e4e4e4ff",
    },
    inputError: {
        borderColor: "red",
    },
    error: {
        marginTop: 6,
        fontSize: 13,
        color: "red",
    },
});
