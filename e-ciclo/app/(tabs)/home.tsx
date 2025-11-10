// app/(tabs)/home.jsx
import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, FONTS } from '../../constants/theme'; 

export default function HomeScreen() {
  const gifSource = require('../../assets/images/banner.gif'); // Usaremos eco.jpg como a imagem

  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Imagem no topo */}
        <Image
          source={require('../../assets/images/eco.png')}
          style={styles.parallaxImage}
          resizeMode="cover" 
        />

        <Text style={styles.title}>Bem-Vindo ao E-Ciclo App</Text>
        <Text style={styles.subtitle}>Descarte o problema, Recicle a Solução</Text>

        {/* Grid de Cards 2x2 (Corrigido o estilo para o Web) */}
        <View style={styles.grid}>
          <View style={styles.row}>
            {/* Card 1: Descartes */}
            <Link href="/descarte" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen1 }}>
                <Text style={styles.cardTitle}>Descartes</Text>
              </TouchableOpacity>
            </Link>
            
            {/* Card 2: Informações */}
            <Link href="/info" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen2 }}>
                <Text style={styles.cardTitle}>Informações</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.row}>
            {/* Card 3: Parceiros */}
            <Link href="/parceiros" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen3 }}>
                <Text style={styles.cardTitle}>Parceiros</Text>
              </TouchableOpacity>
            </Link>

            {/* Card 4: Sobre */}
            <Link href="/sobre" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen4 }}>
                <Text style={styles.cardTitle}>Sobre</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Imagem/GIF/Video Substituído por Imagem padrão */}
        <Image
          source={gifSource} 
          style={styles.gifImage} 
          resizeMode="contain" 
        />
      </View>
    </ScrollView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.darkGray },
  container: { flex: 1, alignItems: 'center', padding: 16 },
  parallaxImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontFamily: FONTS.title, fontSize: 24, color: COLORS.white, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontFamily: FONTS.text, fontSize: 16, color: COLORS.limeGreen, textAlign: 'center', marginBottom: 24 },
  grid: { width: '100%', marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { width: '48%', height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 10 },
  cardTitle: { fontFamily: FONTS.title, fontSize: 18, color: COLORS.white, textAlign: 'center', fontWeight: 'bold' },
  gifImage: { width: 300, height: 150, borderRadius: 10 }, // Estilo para o banner de baixo
});