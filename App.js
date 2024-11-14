import React from 'react';
import { useFonts } from 'expo-font'; // Necesario para mostrar un loading mientras cargan las fuentes
import Home from './App/home'; // Asegúrate de que la ruta esté bien

export default function App() {
  const [fontsLoaded] = useFonts({
    Mono: require('./assets/fonts/SpaceMono.ttf'),
    MonoB: require('./assets/fonts/SpaceMono-Bold.ttf'),
    MonoBI: require('./assets/fonts/SpaceMono-BoldItalic.ttf'),
    MonoI: require('./assets/fonts/SpaceMono-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return null;// Mostrar una pantalla de carga mientras las fuentes se cargan
  }

  return (
      <Home />
  );
}

