import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, View, Animated, useAnimatedValue, Pressable} from 'react-native'
import { blanco } from '../../Constants/Colors'
import Botton from '../../components/Botton'

const Home = () => {
    const date = new Date();
    const day = date.toLocaleDateString('default', { month: "short", day: 'numeric' })
    const [isRecording, setIsRecording] = useState(false);
    const handleRecordingToggle = () => {
        setIsRecording(!isRecording)
    }
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(animatedValue2, {
      toValue: isExpanded ? 0 : 1, // Si está expandido se contrae y viceversa
      duration: 500, // Duración de la animación
      useNativeDriver: false,
    }).start();
    };  
    
    useEffect(() => {
        Animated.timing(animatedValue, {
          toValue: isRecording ? 1 : 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, [isRecording]);

      const tintColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["#302f33", "#ED423E"],
      });

  return (
    <View style={{paddingTop: 50, backgroundColor: blanco, width: "100%", height: "100%", paddingHorizontal: 20, flex: 1, alignItems: "center"}}>
        <View style={{paddingBottom: 24}}>
            <Image source={require("../../public/images/Mind.png")}/>
        </View>
        <View style={{backgroundColor: "#121012", width: 350, height: 500, padding: 14, borderRadius: 14,borderWidth: 1,  borderColor: "rgba(83,81,84, 0.38)", justifyContent: "space-between"}}>
            <View style={{display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{backgroundColor: "#2f2e33", width: 90, height: 45, borderRadius: 8, display: "flex", justifyContent: "center", paddingLeft: 10}}>
                    <Text style={{ color: "#A3A2A8", fontFamily: "MonoB", fontSize: 18}}>{day.toUpperCase()}</Text>
                    <Text style={{ color: "#A3A2A8", marginTop: -3, fontFamily: "Mono", fontSize: 12}}>{date.getFullYear()}</Text>
                </View>
                <Animated.Image source={require("../../public/images/RecordSign.png")} style={{width: 20, height: 20, tintColor}}/>
            </View>
            <View style={{alignItems: "center", marginTop: -40}}>
                <Image source={require("../../public/images/disk.png")}/>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Image source={require("../../public/images/recordInd.png")}/>
                <Botton isRecording={isRecording} onToggleRecording={handleRecordingToggle}/>
            </View>
        </View>
        <Pressable 
    onPress={handleExpand} 
    style={isExpanded ? 
        { 
            position: "absolute", 
            backgroundColor: "#121012", 
            width: 350, 
            height: 130, 
            padding: 14, 
            borderWidth: 1,  
            borderColor: "rgba(83,81,84, 0.38)",  
            borderRadius: 14, 
            justifyContent: "space-between",
            top: '35%', 
            left: '50%', 
            transform: [
              { translateX: -155 },  // Mueve el componente a la izquierda la mitad de su ancho
            ],
        } :  
        { 
            backgroundColor: "#121012", 
            width: 350, 
            height: 130, 
            padding: 14, 
            marginTop: 20, 
            borderWidth: 1,  
            borderColor: "rgba(83,81,84, 0.38)",  
            borderRadius: 14, 
            justifyContent: "space-between"
        }
    }
>
    <View style={{flexDirection: 'row', gap: 10, alignItems: "center"}}>
        <Image source={require("../../public/icons/add-circle.png")} style={{width: 20, height: 20}}/>
        <Text style={{ color: "#FFFFFF", fontFamily: "MonoB", fontSize: 18}}>New Idea</Text>
    </View>

    <View style={{flexDirection: "row", marginLeft: 10, gap: 10}}>
        <View style={{width: 1, height: 60, backgroundColor: "#2F2E33" }}/>
        <View style={{gap: 20 }}>
            <Text style={{ color: "#46464A", fontFamily: "Mono", fontSize: 14}}>Type Your Idea</Text>
            <View style={{flexDirection: "row", gap: 15}}>    
                <Image source={require("../../public/icons/gallery-add.png")} style={{width: 16, height: 16}}/>
                <Image source={require("../../public/icons/camera-01.png")} style={{width: 16, height: 16}}/>
            </View>
        </View>
    </View>
</Pressable>
    </View>
  )
}

export default Home