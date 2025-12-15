import SearchIcon from "@/assets/icons/search";
import { FC, useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import CloseIcon from "@/assets/icons/close";
import { BlurView } from 'expo-blur';
import { Animated } from 'react-native';
import { CustomInput } from "../atoms/custom-input";
import { HorizontalContainer } from "../atoms/horizontal-container";
import { UsersList } from "./users-list";

export const AccelerationModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<View>(null);
    const [layout, setLayout] = useState<any>(null);
    const [search, setSearch] = useState<string>("");

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
            scale.setValue(0.8);
            opacity.setValue(0);

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
            <Pressable
                ref={buttonRef}
                style={[
                    styles.find_btn,
                    isOpen && styles.hidden_btn,
                ]}
                onPress={openModal}
                disabled={isOpen}
            >
                <SearchIcon strokeWidth={2} pathStroke="white" />
                <Text style={styles.find_btn_text}>Ускорялка</Text>
            </Pressable>

            {isOpen && layout && (
                <Modal transparent animationType="none">
                    <View style={StyleSheet.absoluteFill}>

                        {/* Overlay */}
                        <Pressable
                            style={StyleSheet.absoluteFill}
                            onPress={() => setIsOpen(false)}
                        >
                            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                        </Pressable>

                        {/* КЛОН КНОПКИ */}
                        <Pressable
                            style={[
                                styles.find_btn,
                                styles.close_btn,
                                {
                                    position: "absolute",
                                    left: layout.x,
                                    top: layout.y,
                                    width: layout.width,
                                    height: layout.height,
                                },
                            ]}
                            onPress={() => setIsOpen(false)}
                        >
                            <CloseIcon strokeWidth={2} pathStroke="black" />
                            <Text style={styles.close_btn_text}>Закрыть</Text>
                        </Pressable>

                        {/* Контент */}
                        <Animated.View
                            style={{
                                position: 'absolute',
                                bottom: 0 + layout.height + 20,
                                left: 0,
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
                                    <UsersList
                                        search={search}
                                    />
                                    <Pressable style={styles.row}>
                                        <CustomInput
                                            placeholder="Поиск"
                                            value={search}
                                            onChangeText={setSearch}
                                        />
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
    },
    hidden_btn: {
        opacity: 0,
    },
    close_btn: {
        backgroundColor: "#ffffff",
        zIndex: 100,
    },
    close_btn_text: {
        color: "#000000",
        fontFamily: "MontserratSemiBold",
    },
})