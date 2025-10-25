import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// --- Dados simulados ---
const DISPOSAL_LOCATIONS = [
  { id: 1, name: 'EcoPonto Central', address: 'Av. Paulista, 123 - São Paulo, SP', distance: '2.5 km' },
  { id: 2, name: 'Ponto Verde Sul', address: 'Rua das Flores, 50 - Rio de Janeiro, RJ', distance: '4.1 km' },
  { id: 3, name: 'Recicla Já Norte', address: 'Praça da Paz, 300 - Curitiba, PR', distance: '7.8 km' },
];

const wasteTypes = ['Celular', 'Computador', 'Televisão'];

const App = () => {
  const [theme, setTheme] = useState('light');
  const [screen, setScreen] = useState('mapa');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [tips, setTips] = useState([]);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');
  }, [theme]);

  const styles = getStyles(theme);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setScreen('descarte');
  };

  const handleBack = () => {
    setSelectedLocation(null);
    setSelectedWaste(null);
    setTips([]);
    setDistance(null);
    setScreen('mapa');
  };

  const generateTips = (item) => {
    setTips([
      'Limpe dados do ${item}',
      'Remova bateria se possível',
      'Embale de forma segura',
    ]);
  };

  const calculateDistance = () => {
    setDistance({ distance: '3.2 km', time: '10 min' });
  };

  // --- Tela de Mapa ---
  const MapaScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-Recicla</Text>
        <Text style={styles.headerVersion}>v2.1</Text>
      </View>
      <ScrollView style={styles.content}>
        {DISPOSAL_LOCATIONS.map((loc) => (
          <TouchableOpacity
            key={loc.id}
            style={styles.listItem}
            onPress={() => handleSelectLocation(loc)}
          >
            <Text style={styles.listText}>{loc.name}</Text>
            <Text style={styles.listText}>{loc.distance}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => alert('Home')}>
          <Icon name="home" size={24} color="#007AFF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => alert('Mapa')}
        >
          <Icon name="map" size={24} color="#007AFF" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => alert('Config')}>
          <Icon name="settings" size={24} color="#007AFF" />
          <Text style={styles.navText}>Config</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // --- Tela de Descarte ---
  const DescarteScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={24} color={theme === 'light' ? '#000' : '#fff'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmação de Descarte</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selectedLocation.name}</Text>
          <Text style={styles.cardText}>{selectedLocation.address}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selecione o Material</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            {wasteTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.wasteButton,
                  selectedWaste === item && { backgroundColor: '#4CAF50' },
                ]}
                onPress={() => setSelectedWaste(item)}
              >
                <Text style={{ color: selectedWaste === item ? '#fff' : '#000' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedWaste && (
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#9C27B0' }]}
              onPress={() => generateTips(selectedWaste)}
            >
              <Text style={{ color: '#fff' }}>Gerar Dicas</Text>
            </TouchableOpacity>
            {tips.map((tip, idx) => (
              <Text key={idx}>• {tip}</Text>
            ))}
          </View>
        )}

        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF9800' }]}
            onPress={calculateDistance}
          >
            <Text style={{ color: '#fff' }}>Calcular Distância</Text>
          </TouchableOpacity>
          {distance && <Text>{distance.distance} - {distance.time}</Text>}
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
          <Text style={styles.navText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => alert('Home')}>
          <Icon name="home" size={24} color="#007AFF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Icon name="map" size={24} color="#007AFF" />
          <Text style={styles.navText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return screen === 'mapa' ? <MapaScreen /> : <DescarteScreen />;
};

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: theme === 'light' ? '#fff' : '#333', elevation: 3, gap: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' },
    headerVersion: { fontSize: 14, color: theme === 'light' ? '#666' : '#ccc', marginLeft: 'auto' },
    content: { flex: 1, padding: 15 },
    listItem: { padding: 15, backgroundColor: theme === 'light' ? '#fff' : '#333', marginVertical: 5, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between' },
    listText: { color: theme === 'light' ? '#000' : '#fff' },
    card: { padding: 15, backgroundColor: theme === 'light' ? '#fff' : '#333', marginVertical: 5, borderRadius: 8 },
    cardTitle: { fontWeight: 'bold', marginBottom: 5, color: theme === 'light' ? '#000' : '#fff' },
    cardText: { color: theme === 'light' ? '#333' : '#ccc' },
    button: { padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 5 },
    wasteButton: { padding: 10, backgroundColor: '#ccc', borderRadius: 8 },
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: theme === 'light' ? '#fff' : '#333', borderTopWidth: 1, borderTopColor: theme === 'light' ? '#ddd' : '#555' },
    navButton: { alignItems: 'center' },
    activeNavButton: { borderBottomWidth: 2, borderBottomColor: '#007AFF' },
    navText: { fontSize: 12, color: '#666', marginTop: 2 },
  });

export default App;
