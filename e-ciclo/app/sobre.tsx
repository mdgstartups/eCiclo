import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  const websiteUrl = 'https://ecicloapp.framer.website';

  const handleLinkPress = () => {
    // Abre a URL externa
    Linking.openURL(websiteUrl).catch(err => 
      console.error("Não foi possível abrir a URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Configuração do Cabeçalho da Página */}
      
      
      <View style={styles.content}>
        {/* Título Principal (Lato, Negrito, Verde-Limão) */}
        <Text style={styles.title}>Sobre o Projeto</Text>

        {/* Card com a Imagem */}
        <View style={styles.card}>
          <Image
            source={require('../assets/images/time.png')} // Certifique-se que o arquivo existe
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Texto Descritivo (Lexend, Branco) */}
        <Text style={styles.description}>
          Saiba mais sobre o e-ciclo no link abaixo:
        </Text>

        {/* Botão Verde (Link Externo) */}
        <TouchableOpacity style={styles.button} onPress={handleLinkPress}>
          <Ionicons name="open-outline" size={20} color={COLORS.black} />
          <Text style={styles.buttonText}>Visitar Website</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  content: {
    padding: 20,
    alignItems: 'center', // Centralizar o conteúdo
  },
  title: {
    // Título: Lato, Negrito, Verde-Limão (Conforme especificado)
    fontFamily: FONTS.text, // Lato
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#3b3b3b',
    marginBottom: 24,
    overflow: 'hidden', // Para a imagem não vazar
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    // Texto descritivo: Lexend, Branco (Conforme especificado)
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.limeGreen,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTS.title, // Lexend
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});