import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity, 
  Linking, // Para abrir o app de Mapas
  Alert, 
  Platform 
} from 'react-native';
import * as Location from 'expo-location'; // Para obter a localização
// Este caminho (../) sobe de 'app/(tabs)' para 'app/'
import { COLORS, FONTS } from '../constants/theme'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MapaScreen() {
  // Estado para armazenar as coordenadas: { latitude, longitude }
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null); 
  // Estado para controlar o "spinner" de carregamento
  const [loading, setLoading] = useState(true); 
  // Estado para mensagens de erro
  const [errorMsg, setErrorMsg] = useState<string | null>(null); 

  /**
   * 1. Função para pedir permissão e obter a localização atual do usuário.
   */
  const findUserLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    
    // Pede permissão ao usuário
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    // Se a permissão for negada
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada.');
      Alert.alert(
        "Permissão Negada", 
        "Para localizar pontos próximos, precisamos da sua permissão de localização."
      );
      setLoading(false);
      return;
    }

    // Se a permissão for concedida, tenta obter a localização
    try {
      // Usamos 'Balanced' (Equilibrada) para ser mais rápido que 'High' (Alta precisão)
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, 
      });
      setLocation(currentLocation.coords); // Salva as coordenadas no estado
    } catch (error) {
      // Se houver um erro (ex: GPS desligado)
      console.error("Erro ao obter localização:", error);
      setErrorMsg("Não foi possível obter a localização.");
      Alert.alert("Erro", "Não foi possível obter sua localização. Tente novamente.");
    } finally {
      setLoading(false); // Para de carregar
    }
  };

  /**
   * 2. Executa a busca por localização assim que a tela é carregada.
   * O array vazio [] garante que isso rode apenas uma vez (componentDidMount).
   */
  useEffect(() => {
    findUserLocation();
  }, []); 

  /**
   * 3. Função para abrir o Google Maps Nativo com a pesquisa pré-definida.
   */
  const openMapsWithSearch = () => {
    // Se a localização ainda não foi obtida
    if (!location) {
      Alert.alert("Aguarde", "Ainda estamos tentando encontrar sua localização.");
      return;
    }

    const { latitude, longitude } = location;
    
    // Pesquisa fixa, conforme seu pedido
    const searchQuery = "ponto de coleta de reciclagem";

    // Formato de URL universal para Google Maps
    // (funciona no iOS e Android)
    // Ele busca a 'query' (pesquisa) perto (around) da 'll' (latitude,longitude)
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}&ll=${latitude},${longitude}`;

    // Tenta abrir o App de Mapas nativo
    Linking.openURL(url).catch(err => {
      console.error("Erro ao abrir Google Maps:", err);
      Alert.alert("Erro", "Não foi possível abrir o aplicativo de mapas.");
    });
  };

  // --- Renderização da Interface da Tela ---
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Encontrar Pontos de Coleta</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Localize pontos de coleta de reciclagem próximos a você usando o Google Maps.
        </Text>

        <MaterialCommunityIcons name="map-legend" size={80} color={COLORS.limeGreen} style={{ alignSelf: 'center', marginVertical: 20 }} />

        {/* Feedback visual enquanto busca a localização */}
        {loading && (
          <ActivityIndicator size="large" color={COLORS.limeGreen} style={{ marginVertical: 20 }} />
        )}

        {/* Feedback visual se a localização falhar */}
        {errorMsg && (
          <Text style={styles.errorText}>{errorMsg}</Text>
        )}

        {/* Botão para Tentar Novamente (só aparece se falhou e não está carregando) */}
        {!location && !loading && (
          <TouchableOpacity style={styles.button} onPress={findUserLocation}>
            <Text style={styles.buttonText}>Tentar Localizar Novamente</Text>
          </TouchableOpacity>
        )}

        {/* Botão Principal para Abrir o Mapa */}
        <TouchableOpacity 
          // Estilo muda se estiver desabilitado
          style={[styles.button, !location ? styles.buttonDisabled : styles.buttonEnabled]} 
          onPress={openMapsWithSearch}
          disabled={!location} // Desabilitado até a localização ser obtida
        >
          <Text style={styles.buttonText}>Abrir Google Maps</Text>
          <MaterialCommunityIcons name="google-maps" size={24} color={COLORS.black} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Estilos da Página ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
  },
  header: {
    backgroundColor: COLORS.darkGray,
    padding: 16,
    // Adiciona espaço no topo (importante se você escondeu o Header global)
    paddingTop: Platform.OS === 'android' ? 40 : 60, 
  },
  title: {
    fontFamily: FONTS.title, // Fonte Lexend
    fontSize: 24,
    color: COLORS.limeGreen,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Centraliza o conteúdo
  },
  subtitle: {
    fontFamily: FONTS.text, // Fonte Lato
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    fontFamily: FONTS.text,
    color: '#FF6B6B', // Vermelho para erro
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonEnabled: {
    backgroundColor: COLORS.limeGreen, // Verde
  },
  buttonDisabled: {
    backgroundColor: '#555', // Cinza escuro
  },
  buttonText: {
    fontFamily: FONTS.title,
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
});