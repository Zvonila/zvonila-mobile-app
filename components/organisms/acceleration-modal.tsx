import SearchIcon from "@/assets/icons/search";
import { FC, useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import ChatDotsIcon from "@/assets/icons/chat-dots";
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';
import { HorizontalContainer } from "../atoms/horizontal-container";

export const AccelerationModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<View>(null);
    const [layout, setLayout] = useState<any>(null);

    const scale = useRef(new Animated.Value(0.8)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const openModal = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setLayout({ x, y, width, height });
            setIsOpen(true);
        });
    };

    useEffect(() => {
        if (isOpen) {
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isOpen]);

    return (
        <>
            <Pressable ref={buttonRef} style={styles.find_btn} onPress={openModal}>
                <SearchIcon strokeWidth={2} pathStroke="white" />
                <Text style={styles.find_btn_text}>Ускорялка</Text>
            </Pressable>

            {isOpen && layout && (
                <Modal transparent animationType="none">
                    <View style={StyleSheet.absoluteFill}>
                        <Pressable
                            style={StyleSheet.absoluteFill}
                            onPress={() => setIsOpen(false)}
                        >
                            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                        </Pressable>


                        <Animated.View
                            style={{
                                position: 'absolute',
                                top: layout.y - layout.height - 50,
                                left: 0,
                                padding: 16,
                                opacity,
                                transform: [{ scale }],
                                width: "100%",
                            }}
                        >
                            <HorizontalContainer>
                                <View style={{
                                    width: "100%",
                                    backgroundColor: '#fff',
                                    borderRadius: 16,
                                    padding: 16,
                                }}>
                                    <Pressable style={styles.row}>
                                        <ChatDotsIcon pathStroke="black" />
                                        <Text style={styles.row_text}>Начать новый чат</Text>
                                    </Pressable>

                                    <Pressable style={styles.row}>
                                        <SearchIcon pathStroke="black" />
                                        <Text style={styles.row_text}>Поиск</Text>
                                    </Pressable>
                                </View>
                            </HorizontalContainer>
                        </Animated.View>
                    </View>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    find_btn: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: "#FE4F18",
        borderRadius: 1000,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    find_btn_text: {
        color: "#ffffff",
        fontFamily: "MontserratSemiBold",
    },
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000"
    },
    row: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        paddingVertical: 8,
    },
    row_text: {
        fontFamily: "MontserratMedium",
        fontSize: 14
    }
})