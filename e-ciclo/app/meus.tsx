import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, FONTS } from '../constants/theme';

// Componente para o Card de Registro
type RegistroCardProps = {
  tipo: string;
  parceiro: string;
  status: string;
  corFundo?: string;
};

const RegistroCard: React.FC<RegistroCardProps> = ({ tipo, parceiro, status, corFundo }) => {
  return (
    <View style={[styles.card, { backgroundColor: corFundo }]}>
      <Text style={styles.cardTitle}>Registro #00X</Text>
      <Text style={styles.cardText}>Tipo: {tipo}</Text>
      <Text style={styles.cardText}>Parceiro: {parceiro}</Text>
      <Text style={styles.cardText}>Status: {status}</Text>
    </View>
  );
};

export default function MeusDescartesScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Configuração do Cabeçalho da Página */}
      
      
      <View style={styles.content}>
        {/* 3 Registros Simulados */}
        <RegistroCard
          tipo="Eletrônicos"
          parceiro="EcoPonto"
          status="Solicitado"
          corFundo={COLORS.cardGreen1} // Verde claro
        />
        <RegistroCard
          tipo="Pilhas e Baterias"
          parceiro="E-Descartes"
          status="Concluído"
          corFundo={COLORS.cardGreen2} // Verde médio
        />
        <RegistroCard
          tipo="Eletrodomésticos"
          parceiro="Eletrolixo"
          status="Concluído"
          corFundo={COLORS.cardGreen3} // Verde escuro
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
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    // Títulos (Registro #00X) - Vamos usar Lexend Negrito para destaque
    fontFamily: FONTS.title, // Lexend
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 10,
  },
  cardText: {
    // Textos descritivos: Lexend, Branco (Conforme especificado)
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 24,
  },
});