import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons'; // Ícones para os tópicos

// Componente para o Card de Informação
const InfoCard = ({ titulo, icone }) => {
  return (
    <View style={styles.card}>
      <Ionicons name={icone} size={28} color={COLORS.limeGreen} />
      <Text style={styles.cardText}>{titulo}</Text>
    </View>
  );
};

export default function InformacoesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Título Principal (Lato, Negrito, Verde-Limão) */}
        <Text style={styles.title}>Informações</Text>

        {/* Lista de Tópicos */}
        <InfoCard
          icone="hardware-chip-outline"
          titulo="1. Como descartar eletrodomésticos."
        />
        <InfoCard
          icone="battery-half-outline"
          titulo="2. Cuidados no Descarte de Baterias e Pilhas."
        />
        <InfoCard
          icone="bulb-outline"
          titulo="3. Descarte de lâmpadas e similares."
        />
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
  },
  title: {
    // Título: Lato, Negrito, Verde-Limão (Conforme especificado)
    fontFamily: FONTS.text, // Lato
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 20, // Espaço do topo
  },
  card: {
    backgroundColor: '#3b3b3b', // Um cinza um pouco mais claro
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row', // Ícone ao lado do texto
    alignItems: 'center',
  },
  cardText: {
    // Texto descritivo: Lexend, Branco (Conforme especificado)
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 15, // Espaço entre o ícone e o texto
    flex: 1, // Para o texto quebrar a linha se for longo
  },
});