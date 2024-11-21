import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Keyboard, StyleSheet } from 'react-native';
import { blanco } from '../../Constants/Colors';
import Botton from '../../components/Botton';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, withRepeat, cancelAnimation, Easing, interpolateColor } from 'react-native-reanimated';
import RecordingAnim from '../../components/RecordingAnim';

const Home = () => {
	const date = new Date();
	const day = date.toLocaleDateString('default', { month: "short", day: 'numeric' })
	const [text, setText] = useState("");
	const translateY = useSharedValue(0)
	const rotation = useSharedValue(0);
	const animateValue = useSharedValue(0);
	const [isRecording, setIsRecording] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isRotating, setIsRotating] = useState(false);
	const textInputRef = useRef(null);

	const handleRecordingToggle = () => {
		setIsRecording(!isRecording)
		isRotating ? stopRotation() : startRotation()
	}

	const animatedRotation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: `${rotation.value}deg`,
				},
			],
		};
	});
	
	const startRotation = () => {
		if (!isRotating) {
			cancelAnimation(rotation); // Cancela cualquier animación activa
			rotation.value = 0; // Reinicia el valor de rotación a 0 antes de comenzar
			rotation.value = withRepeat(
				withTiming(360, {
					duration: 2000,
					easing: Easing.linear,
				}),
				-1,  // Repetir indefinidamente
				false  // No invertir la dirección de la animación
			);
			setIsRotating(true);
		}
	};

	const stopRotation = () => {
		cancelAnimation(rotation);  // Cancela la animación
		setIsRotating(false);
	};

	const handlePress = () => {
		translateY.value = withSpring(isExpanded ? translateY.value + 350 : translateY.value - 350)
		setIsExpanded(!isExpanded)
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value },
			],
		};
	});

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		return {
			opacity: withSpring(isExpanded ? 0.5 : 0),
		};
	});

	const handleButtonPress = () => {
		// Cierra el teclado
		Keyboard.dismiss();
		// Hace que el TextInput pierda el foco
		!isExpanded ? null : handlePress();
		if (textInputRef.current) {
			textInputRef.current.blur();  // Quita el foco explícitamente
			setIsExpanded(false);
		}
	};

	useEffect(() => {
		animateValue.value = withTiming(isRecording ? 1 : 0, { duration: 300 });
	 }, [isRecording]);
  
	 const animatedStyleColor = useAnimatedStyle(() => {
		const tintColor = interpolateColor(
		  animateValue.value,
		  [0, 1],
		  ["#302f33", "#ED423E"] // Interpolación de colores
		);
  
		return {
		  tintColor: tintColor, // Asignar el color interpolado al estilo
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
					<Animated.Image source={require("../../public/images/RecordSign.png")} style={[{ width: 20, height: 20 }, animatedStyleColor]} />
				</View>
				<Animated.View style={[{ alignItems: "center", marginTop: -40 }, animatedRotation]}>
					<Image source={require("../../public/images/disk.png")} />
				</Animated.View>
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
						backgroundColor: 'rgba(0, 0, 0, 0.9)',
						
					},
					animatedBackgroundStyle,
					isExpanded ? {zIndex: 1} : {zIndex: -1}
				] }

			/>

			{/* Componente animado */}
			<Animated.View
				style={[
					{
						backgroundColor: "#121012",
						width: 350,
						minHeight: 130,
						padding: 14,
						marginTop: 20,
						borderWidth: 1,
						borderColor: "rgba(83,81,84, 0.38)",
						borderRadius: 14,
						justifyContent: "space-between",
						zIndex: 2,
					},
					animatedStyle,
				]}
			>
				<View style={{ flexDirection: 'row', gap: 10, alignItems: "center" }}>
					<TouchableOpacity onPress={handlePress}>
						<Image source={require("../../public/icons/add-circle.png")} style={{ width: 20, height: 20 }} />
					</TouchableOpacity>
					<Text style={{ color: "#FFFFFF", fontFamily: "MonoB", fontSize: 18 }}>New Idea</Text>
				</View>

				<View style={{ flexDirection: "row", marginLeft: 10, gap: 10, paddingRight: 10 }}>
					<View style={{ width: 1, height: 60, backgroundColor: "#2F2E33" }} />
					<View style={{ gap: 20 }}>
						{ !isRecording ?
							<TextInput editable ref={textInputRef} onChangeText={setText} placeholder='Type Your Idea' 
							onPress={handlePress} onSubmitEditing={handlePress} keyboardType="twitter" multiline numberOfLines={5} 
							placeholderTextColor={"#46464A"} style={styles.inputIdea} />
							: 
							<RecordingAnim/>
						}
						
						<View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
							<View style={{ flexDirection: "row", gap: 15 }}>
								<Image source={require("../../public/icons/gallery-add.png")} style={{ width: 16, height: 16 }} />
								<Image source={require("../../public/icons/camera-01.png")} style={{ width: 16, height: 16 }} />
							</View>
							{
								isExpanded ? 
								<TouchableOpacity onPress={handleButtonPress} style={{ width: 60, height: 30, paddingHorizontal: 3, backgroundColor: "rgba(29, 77, 12, 0.38)", borderRadius: 6, justifyContent: "center", alignItems: "center" }}>
									<Text style={{ color: "#9BF99B", fontFamily: "MonoI", marginTop: -1 }}>Done</Text>
								</TouchableOpacity>
								: 
								<></>
							}
						</View>
					</View>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create( {
	inputIdea: {
		color: "#FFFFFF", fontFamily: "Mono", fontSize: 14
	}
})

export default Home;
