// app/_layout.jsx
import { useEffect } from 'react';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import { Lexend_700Bold } from '@expo-google-fonts/lexend';
import { SplashScreen, Stack } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme'; // Precisamos importar nosso tema!

// Previne a tela de splash de sumir
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Carrega as fontes
  const [fontsLoaded, fontError] = useFonts({
    Lato_400Regular,
    Lexend_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // --- CORREÇÃO AQUI ---
  // Vamos definir um estilo padrão para todas as telas de Stack
  const stackScreenOptions = {
    headerStyle: { backgroundColor: COLORS.darkGray },
    headerTintColor: COLORS.limeGreen,
    headerTitleStyle: {
      fontFamily: FONTS.text, // Lato
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false, // Aplicado globalmente para as Stacks!
  };

  return (
    <Stack>
      {/* A tela (tabs) não tem cabeçalho */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Telas de Stack (meus, parceiros, sobre) */}
      <Stack.Screen
        name="parceiros"
        options={{
          ...stackScreenOptions, // Aplica nosso estilo padrão
          title: 'Parceiros', // Define o título específico
        }}
      />
      <Stack.Screen
        name="sobre"
        options={{
          ...stackScreenOptions, // Aplica nosso estilo padrão
          title: 'Sobre', // Define o título específico
        }}
      />
      <Stack.Screen
        name="meus"
        options={{
          ...stackScreenOptions, // Aplica nosso estilo padrão
          title: 'Meus Descartes', // Define o título específico
        }}
      />
    </Stack>
  );
}