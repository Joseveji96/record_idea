import React from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const RecordingAnim = () => {
    // Valor compartido para la animación
    const animationValue = useSharedValue(0);

    // Inicia la animación de forma repetida (subiendo y bajando)
    React.useEffect(() => {
        animationValue.value = withRepeat(
            withTiming(1, { duration: 500 }), // Duración de medio segundo
            -1, // Repetir indefinidamente
            true // Inversión de dirección (sube y baja)
        );
    }, []);

    // Estilos animados para las barras
    const animatedBarStyle1 = useAnimatedStyle(() => {
        return {
            height: 35 * animationValue.value + 5, // Varía la altura de la barra
        };
    });

    const animatedBarStyle2 = useAnimatedStyle(() => {
        return {
            height: 35 * (1 - animationValue.value) + 5, // Segunda barra con animación opuesta
        };
    });

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", height: 35, backgroundColor: "rgba(170, 50, 48, 0.28)", borderRadius: 6, marginTop: 5, padding: 5 }}>
            <Animated.View style={[{ width: '20%', backgroundColor: 'red', borderRadius: 6 }, animatedBarStyle1]} />
            <Animated.View style={[{ width: '20%', backgroundColor: 'red', borderRadius: 6 }, animatedBarStyle2]} />
            <Animated.View style={[{ width: '20%', backgroundColor: 'red', borderRadius: 6 }, animatedBarStyle1]} />
            <Animated.View style={[{ width: '20%', backgroundColor: 'red', borderRadius: 6 }, animatedBarStyle2]} />
        </View>
    );
}

export default RecordingAnim;
