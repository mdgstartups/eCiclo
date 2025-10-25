import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Constantes de Estilo ---
const CARD_COLOR = '#e3ecdc';
const BACKGROUND_COLOR = '#6b8f74';
const screenWidth = Dimensions.get('window').width;

// --- Tipos de Dados ---
interface CardData {
  id: string;
  title: string;
  image: string;
  description: string; // <-- NOVO CAMPO: Texto que será exibido ao expandir
}

// --- Dados de Exemplo com Conteúdo Único ---
const data: CardData[] = [
  {
    id: '1',
    title: 'card 1',
    image: 'https://via.placeholder.com/80',
    description: 'lorem',

  },{
    id: '2',
    title: 'Card 2',
    image: 'https://via.placeholder.com/80',
    description: 'A descrição deste Card 2 é diferente. Use este espaço para tópicos variados.', // <-- TEXTO DO CARD 2
  },
  {
    id: '3',
    title: 'Card 3',
    image: 'https://via.placeholder.com/80',
    description: 'O texto do Card 3 pode ser uma frase mais longa, explicando um conceito importante.', // <-- TEXTO DO CARD 3
  },
  {
    id: '4',
    title: 'Card 4',
    image: 'https://via.placeholder.com/80',
    description: 'Informação breve para o Card 4. Mantenha o conteúdo conciso ou detalhado, como preferir.', // <-- TEXTO DO CARD 4
  },
  {
    id: '5',
    title: 'Card 5',
    image: 'https://via.placeholder.com/80',
    description: 'Este é o último card! O conteúdo do Card 5 está separado dos demais.', // <-- TEXTO DO CARD 5
  },
];

// --- Componente Principal ---
export default function App(): JSX.Element {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string): void => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }: { item: CardData }): JSX.Element => {
    const isOpen = expanded[item.id];

    return (
      <TouchableOpacity
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.8}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {/* AGORA USAMOS item.description, que é o texto individual do card */}
            {isOpen && (
              <Text style={styles.description}>
                {item.description} 
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<CardData>
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

// --- Estilos (Não foram alterados) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  list: {
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: CARD_COLOR,
    borderRadius: 16,
    marginVertical: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
  },
  image: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: screenWidth * 0.045,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    fontSize: screenWidth * 0.035,
  },
});