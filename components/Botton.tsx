import React, { useState } from 'react'
import {Text, TouchableOpacity, View, Image} from "react-native"

const Botton = ({isRecording, onToggleRecording}) => {
    const textRecording = isRecording ? "STOP" : "RECORD";

  return (
    <TouchableOpacity onPress={onToggleRecording} style={{width: 100, height: 35, paddingHorizontal: 5, backgroundColor: "rgba(170, 50, 48, 0.28)", borderRadius: 6, flexDirection: "row", gap: 5 ,justifyContent: "center", alignItems: "center"}}>
        <Image  source={ textRecording === "RECORD" ? require("../public/icons/stop-circle.png") : require("../public/icons/stop-circle-active.png")} style={{width: 16, height: 16, tintColor: "#FD3D36"}}/>
        <Text style={{color: "#ED423E"}}>{textRecording}</Text>
    </TouchableOpacity>
  )
}

export default Botton