import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { blanco } from '../../Constants/Colors'
import Botton from '../../components/Botton'

const Home = () => {
    const [isRecording, setIsRecording] = useState(false);
    const handleRecordingToggle = () => {
        setIsRecording(!isRecording)
    }
  return (
    <View style={{paddingTop: 50, backgroundColor: blanco, width: "100%", height: "100%", paddingHorizontal: 20, flex: 1, alignItems: "center"}}>
        <View style={{paddingBottom: 24}}>
            <Image source={require("../../public/images/Mind.png")}/>
        </View>
        <View style={{backgroundColor: "#121012", width: 350, height: 500, padding: 14, borderRadius: 14, justifyContent: "space-between"}}>
            <View style={{display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{backgroundColor: "#2f2e33", width: 90, height: 45, borderRadius: 8, display: "flex", justifyContent: "center"}}>
                    <Text style={{textAlign: "center", color: "#A3A2A8" }}>NOV 13</Text>
                    <Text style={{textAlign: "center", color: "#A3A2A8" }}>2024</Text>
                </View>
                <Image source={require("../../public/images/RecordSign.png")} style={{width: 20, height: 20, tintColor: "#302f33"}}/>
            </View>
            <View style={{alignItems: "center", marginTop: -40}}>
                <Image source={require("../../public/images/disk.png")}/>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Image source={require("../../public/images/recordInd.png")}/>
                {/* <Image source={require("../../public/images/recordBnt.png")}/> */}
                <Botton isRecording={isRecording} onToggleRecording={handleRecordingToggle}/>
            </View>
        </View>
    </View>
  )
}

export default Home