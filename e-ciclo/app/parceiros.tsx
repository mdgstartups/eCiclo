import React from 'react';
import { StyleSheet, View, Text, ScrollView }from 'react-native';
import { COLORS, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// ==========================================================
// CORREÇÃO: Os estilos DEVEM ser definidos ANTES de serem usados.
// Movendo o "styles" para o topo do arquivo.
// ==========================================================
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
  },
  card: {
    borderRadius: 10,
    padding: 25,
    marginBottom: 16,
    flexDirection: 'row', // Ícone ao lado do texto
    alignItems: 'center',
  },
  cardText: {
    // Texto descritivo: Lexend, Branco (Conforme especificado)
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15, // Espaço entre o ícone e o texto
  },
});
// ==========================================================
// Fim da Correção
// ==========================================================


// Componente para o Card de Parceiro
// Agora ele pode ler "styles.card" e "styles.cardText" sem erro
type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ParceiroCardProps {
  nome: string;
  corFundo: string;
  icone: IconName;
}

const ParceiroCard: React.FC<ParceiroCardProps> = ({ nome, corFundo, icone }) => {
  return (
    <View style={[styles.card, { backgroundColor: corFundo }]}>
      <Ionicons name={icone} size={32} color={COLORS.white} />
      <Text style={styles.cardText}>{nome}</Text>
    </View>
  );
};


// FUNÇÃO PRINCIPAL DA TELA
export default function ParceirosScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* O cabeçalho agora é controlado automaticamente pelo app/_layout.jsx */}
      
      <View style={styles.content}>
        {/* Título Principal (Lato, Negrito, Verde-Limão) */}
        <Text style={styles.title}>Nossos Parceiros</Text>

        {/* Lista de Parceiros */}
        <ParceiroCard
          nome="E-Descartes"
          corFundo={COLORS.cardGreen1}
          icone="business"
        />
        <ParceiroCard
          nome="Eletrolixo"
          corFundo={COLORS.cardGreen2}
          icone="trash-bin"
        />
        <ParceiroCard
          nome="EcoPonto"
          corFundo={COLORS.cardGreen3}
          icone="map"
        />
      </View>
    </ScrollView>
  );
}