
import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // Para navegação entre abas
import { COLORS, FONTS } from '../../constants/theme'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Caminho corrigido, subindo 1 nível da pasta (tabs) para encontrar assets
  const bannerSource = require('../../assets/images/banner.gif'); 
  const assetPath = '../../assets/images/eco.png';

  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Imagem Parallax (Topo) */}
        <Image
          source={require(assetPath)}
          style={styles.parallaxImage}
          resizeMode="cover" 
        />

        {/* Título e Subtítulo */}
        <Text style={styles.title}>Bem-Vindo ao E-Ciclo !</Text>
        <Text style={styles.subtitle}>Descarte o problema, Recicle a Solução</Text>

        {/* NOVO BOTÃO: Localizar Pontos de Descarte */}
        {/* Navega para a aba 'mapa' */}
        <Link href="/mapa" asChild>
          <TouchableOpacity style={styles.mapButton}>
            <MaterialCommunityIcons name="map-marker-radius" size={24} color={COLORS.darkGray} />
            <Text style={styles.mapButtonText}>Localizar Pontos de Descarte</Text>
          </TouchableOpacity>
        </Link>
        
        {/* Grid de Cards 2x2 */}
        <View style={styles.grid}>
          {/* Linha 1 */}
          <View style={styles.row}>
            {/* Card 1: Descartes (Aba) */}
            <Link href="/descarte" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen1 }}>
                <Text style={styles.cardTitle}>Descartes</Text>
              </TouchableOpacity>
            </Link>
            
            {/* Card 2: Informações (Aba) */}
            <Link href="/info" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen2 }}>
                <Text style={styles.cardTitle}>Informações</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Linha 2 */}
          <View style={styles.row}>
            {/* Card 3: Parceiros (Stack) */}
            <Link href="/parceiros" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen3 }}>
                <Text style={styles.cardTitle}>Parceiros</Text>
              </TouchableOpacity>
            </Link>

            {/* Card 4: Sobre (Stack) */}
            <Link href="/sobre" asChild>
              <TouchableOpacity style={{ ...styles.card, backgroundColor: COLORS.cardGreen4 }}>
                <Text style={styles.cardTitle}>Sobre</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Imagem/Banner (Mockup) */}
        <Image
          source={bannerSource} 
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
  
  // Estilos do Novo Botão do Mapa
  mapButton: {
    backgroundColor: COLORS.limeGreen,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: COLORS.limeGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  mapButtonText: {
    fontFamily: FONTS.title,
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  
  grid: { width: '100%', marginBottom: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { width: '48%', height: 100, borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 10 },
  cardTitle: { fontFamily: FONTS.title, fontSize: 18, color: COLORS.white, textAlign: 'center', fontWeight: 'bold' },
  gifImage: { width: 350, height: 200, borderRadius: 10, marginBottom: 14 },
});