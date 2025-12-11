import { CustomButton } from '@/components/atoms/custom-button';
import { HorizontalContainer } from '@/components/atoms/horizontal-container';
import { CallManageBar } from '@/components/organisms/call-manage-bar';
import { useCallListener } from '@/hooks/useCallWebSocket';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CallScreen() {
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();

    useCallListener();


    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <CustomButton onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <HorizontalContainer>
                    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                        <Text style={styles.buttonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.pingText}>60 Ping</Text>
                </HorizontalContainer>
            </View>

            {/* Основной контент / фон */}
            <View style={styles.mainContent}>
                <Text style={styles.placeholder}>Ожидайте подключение</Text>
            </View>

            {/* Мини-камера справа снизу */}
            <View style={styles.bottom}>
                <HorizontalContainer>
                    <View style={styles.bottomContent}>
                        <CameraView style={styles.miniCamera} facing={facing} />
                        <CallManageBar
                            toggleFacing={() => toggleCameraFacing()}
                        />
                    </View>
                </HorizontalContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        color: "#ffffff"
    },
    miniCamera: {
        width: 120,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
        alignSelf: "flex-end",
    },
    bottom: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    bottomContent: {
        flexDirection: "column",
        gap: 12,
        marginBottom: 24,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff",
    },
    pingText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: "auto",
        color: "#ffffff",
    },
    top: {
        position: "absolute",
        top: 0,
        left: 0,
    }
});
