import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Platform, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

// 1. CORREÇÃO: O caminho deve ser './' (mesmo nível)
import { db, getAppId } from './services/firebase'; 

// 2. CORREÇÃO: O caminho deve ser './'
import { useAuth } from './context/AuthContext'; 

// 3. CORREÇÃO: O caminho deve ser './'
import { COLORS, FONTS } from '../constants/theme';

import { Ionicons } from '@expo/vector-icons';

// Define a Interface (Tipo) para um Parceiro
interface Parceiro {
  id: string;
  name: string;
  icon?: string; // O ícone é opcional
}

// Componente para o Card de Parceiro
const ParceiroCard: React.FC<{ nome: string; icone: string }> = ({ nome, icone }) => (
  <View style={styles.card}>
    <Ionicons name={icone as any || 'business'} size={32} color={COLORS.white} />
    <Text style={styles.cardText}>{nome}</Text>
  </View>
);

export default function ParceirosScreen() {
  const [parceiros, setParceiros] = useState<Parceiro[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthReady } = useAuth(); // Hook do nosso Contexto
  const appId = getAppId(); // ID do App do nosso serviço

  useEffect(() => {
    // Apenas executa a busca se a autenticação inicial estiver pronta
    if (!isAuthReady) return;

    const fetchParceiros = async () => {
      setLoading(true);
      try {
        // Caminho da coleção pública de parceiros
        const collectionPath = `/artifacts/${appId}/public/data/partners`;
        const querySnapshot = await getDocs(collection(db, collectionPath));
        
        const listaParceiros: Parceiro[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          listaParceiros.push({
            id: doc.id,
            name: data.name || "Nome não definido", 
            icon: data.icon || 'business',
          });
        });
        setParceiros(listaParceiros);

        // --- Fallback (Dados Fictícios) ---
        if (listaParceiros.length === 0) {
          console.warn("Firestore (Parceiros) vazio. Usando dados fictícios.");
          setParceiros([
            { id: '1', name: 'E-Descartes Soluções', icon: 'business' },
            { id: '2', name: 'Cooperativa Recicla Já', icon: 'trash-bin' },
            { id: '3', name: 'EcoPonto Central', icon: 'map' },
          ]);
        }
        // ------------------------------------

      } catch (error) {
        console.error("Erro ao buscar parceiros: ", error);
        Alert.alert("Erro de Rede", "Não foi possível carregar os parceiros.");
      } finally {
        setLoading(false);
      }
    };

    fetchParceiros();
  }, [isAuthReady, appId]); // Depende do 'isAuthReady'

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nossos Parceiros</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.limeGreen} style={{ marginTop: 20 }}/>
        ) : (
          parceiros.map(parceiro => (
            <ParceiroCard
              key={parceiro.id}
              nome={parceiro.name}
              icone={parceiro.icon}
            />
          ))
        )}
        
        {!loading && parceiros.length === 0 && (
          <Text style={styles.emptyText}>Nenhum parceiro disponível no momento.</Text>
        )}
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
    paddingTop: Platform.OS === 'android' ? 20 : 0, 
  },
  title: {
    fontFamily: FONTS.text, 
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.cardGreen3, 
    borderRadius: 10,
    padding: 25,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 20, 
    fontWeight: 'bold',
    marginLeft: 15,
  },
  emptyText: {
    fontFamily: FONTS.text,
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});