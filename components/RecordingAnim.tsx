import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const RecordingAnim = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [permissionStatus, setPermissionStatus] = useState<boolean>(false);
  const [audioUri, setAudioUri] = useState<string | undefined>();

  // Explicit recording options
  const recordingOptions: Audio.RecordingOptions = {
    android: {
      extension: '.m4a',
      outputFormat: Audio.AndroidOutputFormat.MPEG_4,
      audioEncoder: Audio.AndroidAudioEncoder.AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.m4a',
      audioQuality: Audio.IOSAudioQuality.HIGH,
      outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    web: {
      mimeType: 'audio/webm',
      bitsPerSecond: 128000,
    }
  };

  // Request microphone permissions
  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      
      if (status === 'granted') {
        setPermissionStatus(true);
        return true;
      } else {
        Alert.alert(
          'Permisos de Grabación', 
          'No se concedieron permisos para grabar audio'
        );
        return false;
      }
    } catch (err) {
      console.error('Error solicitando permisos:', err);
      return false;
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      // Unload any existing sound
      if (sound) {
        await sound.unloadAsync();
        setSound(undefined);
      }

      // Ensure permissions
      if (!permissionStatus) {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create a new recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
      
      setRecording(newRecording);
      console.log('Grabación iniciada');
    } catch (err) {
      console.error('Error iniciando grabación:', err);
      Alert.alert('Error', 'No se pudo iniciar la grabación');
    }
  };

  // Stop recording and play
  const stopRecording = async () => {
    if (!recording) return;

    try {
      // Stop recording
      await recording.stopAndUnloadAsync();
      
      // Get the URI of the recorded audio
      const uri = recording.getURI();
      
      if (uri) {
        // Create and play the sound
        const { sound: playbackSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );

        setSound(playbackSound);
        setAudioUri(uri);
        setRecording(undefined);

        // Optional: Handle sound playback completion
        playbackSound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            await playbackSound.unloadAsync();
            setSound(undefined);
          }
        });

        console.log('Grabación guardada y reproduciendo:', uri);
      }
    } catch (err) {
      console.error('Error deteniendo grabación:', err);
      Alert.alert('Error', 'No se pudo detener la grabación');
    }
  };

  // Reproducir de nuevo
  const replayAudio = async () => {
    if (!audioUri) return;

    try {
      // Unload any existing sound first
      if (sound) {
        await sound.unloadAsync();
      }

      // Create and play the sound
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      setSound(playbackSound);

      // Optional: Handle sound playback completion
      playbackSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await playbackSound.unloadAsync();
          setSound(undefined);
        }
      });
    } catch (err) {
      console.error('Error reproduciendo audio:', err);
      Alert.alert('Error', 'No se pudo reproducir el audio');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={recording ? stopRecording : startRecording}
        style={[
          styles.button, 
          { 
            backgroundColor: recording 
              ? "rgba(255, 0, 0, 0.28)" 
              : "rgba(170, 50, 48, 0.28)"
          }
        ]}
      >
        <Text>
          {recording ? 'Detener Grabación' : 'Iniciar Grabación'}
        </Text>
      </TouchableOpacity>

      {audioUri && (
        <TouchableOpacity 
          onPress={replayAudio}
          style={[
            styles.button, 
            { backgroundColor: "rgba(50, 170, 48, 0.28)" }
          ]}
        >
          <Text>Reproducir Grabación</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: "100%", 
    height: 35, 
    marginTop: 5,
  },
  button: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 6, 
    marginHorizontal: 5,
    padding: 5
  }
});

export default RecordingAnim;