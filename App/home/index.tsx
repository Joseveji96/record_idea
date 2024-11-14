import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { blanco } from '../../Constants/Colors';
import Botton from '../../components/Botton';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const Home = () => {
    const date = new Date();
    const day = date.toLocaleDateString('default', { month: "short", day: 'numeric' })
    const [isRecording, setIsRecording] = useState(false);
    const handleRecordingToggle = () => {
        setIsRecording(!isRecording)
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const translateY = useSharedValue(0)
    const handlePress = () => {
        translateY.value = withSpring(isExpanded ? translateY.value + 350 : translateY.value - 350)
        setIsExpanded(!isExpanded)
    };

    // Usar useAnimatedStyle para obtener los valores animados de forma eficiente
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value }, // Usamos translateY animado aquí
            ],
        };
    });

    // Estilos animados para el fondo difuso
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: withSpring(isExpanded ? 0.5 : 0), // Animar la opacidad para difuminar el fondo
        };
    });

    return (
        <View style={{ paddingTop: 50, backgroundColor: blanco, width: "100%", height: "100%", paddingHorizontal: 20, flex: 1, alignItems: "center" }}>
            <View style={{ paddingBottom: 24 }}>
                <Image source={require("../../public/images/Mind.png")} />
            </View>
            <View style={{
                backgroundColor: "#121012", width: 350, height: 500, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: "rgba(83,81,84, 0.38)", justifyContent: "space-between"
            }}>
                <View style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ backgroundColor: "#2f2e33", width: 90, height: 45, borderRadius: 8, display: "flex", justifyContent: "center", paddingLeft: 10 }}>
                        <Text style={{ color: "#A3A2A8", fontFamily: "MonoB", fontSize: 18 }}>{day.toUpperCase()}</Text>
                        <Text style={{ color: "#A3A2A8", marginTop: -3, fontFamily: "Mono", fontSize: 12 }}>{date.getFullYear()}</Text>
                    </View>
                    <Animated.Image source={require("../../public/images/RecordSign.png")} style={{ width: 20, height: 20 }} />
                </View>
                <View style={{ alignItems: "center", marginTop: -40 }}>
                    <Image source={require("../../public/images/disk.png")} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Image source={require("../../public/images/recordInd.png")} />
                    <Botton isRecording={isRecording} onToggleRecording={handleRecordingToggle} />
                </View>
            </View>

            {/* Fondo difuso con animación de opacidad */}
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo oscuro y semitransparente
                        zIndex: 0, // Asegura que el fondo quede detrás
                    },
                    animatedBackgroundStyle, // Estilos de animación para el fondo
                ]}
            />

            {/* Componente animado */}
            <Animated.View
                style={[
                    {
                        backgroundColor: "#121012",
                        width: 350,
                        height: 130,
                        padding: 14,
                        marginTop: 20,
                        borderWidth: 1,
                        borderColor: "rgba(83,81,84, 0.38)",
                        borderRadius: 14,
                        justifyContent: "space-between",
                        zIndex: 1, // Mantener el componente encima del fondo
                    },
                    animatedStyle, // Estilo animado para el componente
                ]}
            >
                <View style={{ flexDirection: 'row', gap: 10, alignItems: "center" }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require("../../public/icons/add-circle.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <Text style={{ color: "#FFFFFF", fontFamily: "MonoB", fontSize: 18 }}>New Idea</Text>
                </View>

                <View style={{ flexDirection: "row", marginLeft: 10, gap: 10 }}>
                    <View style={{ width: 1, height: 60, backgroundColor: "#2F2E33" }} />
                    <View style={{ gap: 20 }}>
                        <Text style={{ color: "#46464A", fontFamily: "Mono", fontSize: 14 }}>Type Your Idea</Text>
                        <View style={{ flexDirection: "row", gap: 15 }}>
                            <Image source={require("../../public/icons/gallery-add.png")} style={{ width: 16, height: 16 }} />
                            <Image source={require("../../public/icons/camera-01.png")} style={{ width: 16, height: 16 }} />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

export default Home;
