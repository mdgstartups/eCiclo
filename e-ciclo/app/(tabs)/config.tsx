import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Componente para um item da lista de configuração
type ConfigItemProps = {
  label: string;
  children?: React.ReactNode;
};

const ConfigItem: React.FC<ConfigItemProps> = ({ label, children }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      {children}
    </View>
  );
};

export default function ConfigScreen() {
  // Estados para simular os toggles
  const [isGpsEnabled, setIsGpsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Título Principal (Lato, Negrito, Verde-Limão) */}
        <Text style={styles.title}>Configurações</Text>

        {/* 1. Ativar GPS */}
        <ConfigItem label="Ativar GPS">
          <Switch
            trackColor={{ false: '#767577', true: COLORS.limeGreen }}
            thumbColor={isGpsEnabled ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={() => setIsGpsEnabled(prev => !prev)}
            value={isGpsEnabled}
          />
        </ConfigItem>

        {/* 2. Modo Light/Dark */}
        <ConfigItem label="Modo Dark">
          <Switch
            trackColor={{ false: '#767577', true: COLORS.limeGreen }}
            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={() => setIsDarkMode(prev => !prev)}
            value={isDarkMode}
          />
        </ConfigItem>

        {/* 3. Login com Google (Botão Simulado) */}
        <TouchableOpacity style={styles.googleButton}>
          <Ionicons name="logo-google" size={24} color={COLORS.white} />
          <Text style={styles.googleButtonText}>Login com Google</Text>
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
  },
  title: {
    // Título: Lato, Negrito, Verde-Limão (Conforme especificado)
    fontFamily: FONTS.text, // Lato
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20, // Espaço do topo
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3b3b3b',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
  },
  itemLabel: {
    // Texto descritivo: Lexend, Branco (Conforme especificado)
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 18,
  },
  googleButton: {
    backgroundColor: '#4285F4', // Cor do Google
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  googleButtonText: {
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
});