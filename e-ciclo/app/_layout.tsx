import React from 'react';
import { Stack } from 'expo-router';
import { useFonts, Lato_400Regular } from '@expo-google-fonts/lato';
import { Lexend_700Bold } from '@expo-google-fonts/lexend';
// 1. IMPORTA o AuthProvider
import { AuthProvider } from './context/AuthContext'; 
import { COLORS, FONTS } from '../constants/theme'; 
import { Platform } from 'react-native';

export default function RootLayout() {
  // Carrega as fontes
  const [fontsLoaded, fontError] = useFonts({
    Lato_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Opções padrão para as telas (cabeçalho)
  const stackScreenOptions = {
    headerStyle: { backgroundColor: COLORS.darkGray },
    headerTintColor: COLORS.limeGreen,
    headerTitleStyle: { fontFamily: FONTS.text, fontWeight: 'bold' },
    headerBackTitleVisible: false,
  };

  return (
    // 2. ENVOLVE todo o aplicativo no Provedor de Autenticação.
    // Agora, todas as telas (Tabs, Parceiros, etc.) têm acesso ao 'user'.
    <AuthProvider>
      <Stack>
        {/* Todas as telas agora são gerenciadas pelo Stack */}
        <Stack.Screen name="index" options={{ headerShown: false }}/> 
        
        {/* Tela de Login (para o futuro, se precisarmos) */}
        <Stack.Screen name="auth/login" options={{ headerShown: false }} /> 

        {/* Grupo de Abas (Tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
        
        {/* Telas que não estão na Tab Bar */}
        <Stack.Screen name="meus" options={{ ...stackScreenOptions, title: 'Meus Descartes' }} />
        <Stack.Screen name="parceiros" options={{ ...stackScreenOptions, title: 'Parceiros' }} />
        <Stack.Screen name="sobre" options={{ ...stackScreenOptions, title: 'Sobre' }} />
      </Stack>
    </AuthProvider>
  );
}