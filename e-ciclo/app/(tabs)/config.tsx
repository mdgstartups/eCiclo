import React, { useState } from 'react';
// 1. ADICIONADO: Importação do 'Modal'
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Modal 
} from 'react-native';
// 2. CORREÇÃO DE CAMINHO: ../../constants/theme -> ../constants/theme
import { COLORS, FONTS } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// 3. CORREÇÃO DE CAMINHO: ../context/AuthContext -> ../context/AuthContext.tsx
import { useAuth } from '../context/AuthContext';

// Componente para um item da lista de configuração (Seu código original)
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
  // Estados para simular os toggles (Seu código original)
  const [isGpsEnabled, setIsGpsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Estados de Autenticação e Loading
  const { user, isAuthReady, signInWithGoogle, signOut } = useAuth();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  // 4. ADICIONADO: Estado para o novo modal de Versão
  const [versionModalVisible, setVersionModalVisible] = useState(false);

  // Handlers de Login/Logout
  const handleLogin = async () => {
    setIsButtonLoading(true);
    const success = await signInWithGoogle();
    if (!success) {
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
    setIsButtonLoading(false);
  };

  const handleLogout = async () => {
    setIsButtonLoading(true);
    await signOut();
    setIsButtonLoading(false);
  };

  // Função para renderizar o bloco de login (Seu código original)
  const renderAuthBlock = () => {
    if (!isAuthReady || isButtonLoading) {
      return (
        <View style={styles.authSection}>
          <ActivityIndicator size="large" color={COLORS.limeGreen} />
        </View>
      );
    }
    
    if (user) {
      return (
        <View style={styles.authSection}>
          <Text style={styles.authStatusText}>
            Autenticado com ID: {user.uid}
          </Text>
          <Text style={styles.infoText}>
            {user.isAnonymous ? "(Sessão Anônima)" : "(Login Realizado)"}
          </Text>
          <TouchableOpacity 
            style={[styles.googleButton, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={24} color={COLORS.white} />
            <Text style={styles.googleButtonText}>Sair (Logout)</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.authSection}>
        <Text style={styles.authStatusText}>Você não está autenticado.</Text>
        <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
          <Ionicons name="logo-google" size={24} color={COLORS.white} />
          <Text style={styles.googleButtonText}>Login com Google</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Título Principal (Seu código original) */}
        <Text style={styles.title}>Configurações</Text>

        {/* 1. Ativar GPS (Seu código original) */}
        <ConfigItem label="Ativar GPS">
          <Switch
            trackColor={{ false: '#767577', true: COLORS.limeGreen }}
            thumbColor={isGpsEnabled ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={() => setIsGpsEnabled(prev => !prev)}
            value={isGpsEnabled}
          />
        </ConfigItem>

        {/* 2. Modo Light/Dark (Seu código original) */}
        <ConfigItem label="Modo Dark">
          <Switch
            trackColor={{ false: '#767577', true: COLORS.limeGreen }}
            thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            onValueChange={() => setIsDarkMode(prev => !prev)}
            value={isDarkMode}
          />
        </ConfigItem>

        {/* 3. Bloco de Autenticação (Modificado) */}
        {renderAuthBlock()}

        {/* 5. ADICIONADO: Botão de Versão */}
        <TouchableOpacity 
          style={styles.versionButton} 
          onPress={() => setVersionModalVisible(true)}
        >
          <Text style={styles.versionButtonText}>Versão do E-Ciclo</Text>
        </TouchableOpacity>

      </View>

      {/* 6. ADICIONADO: Modal de Versão */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={versionModalVisible}
        onRequestClose={() => setVersionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle-outline" size={40} color={COLORS.limeGreen} style={{ marginBottom: 15 }} />
            <Text style={styles.modalTitle}>E-Ciclo</Text>
            <Text style={styles.modalText}>
              E-ciclo by MDG 2025 - Versão 0.0.2 primal age
            </Text>
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setVersionModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingTop: 40, 
  },
  title: {
    fontFamily: FONTS.text, 
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20, 
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
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 18,
  },
  
  // Estilos do Bloco de Autenticação
  authSection: {
    marginTop: 30,
    alignItems: 'center',
    minHeight: 100, 
  },
  authStatusText: {
    fontFamily: FONTS.text,
    fontSize: 14,
    color: COLORS.white, // CORRIGIDO (estava branco)
    textAlign: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontFamily: FONTS.text,
    fontSize: 12,
    color: COLORS.white, // CORRIGIDO (estava branco)
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  
  googleButton: {
    backgroundColor: '#4285F4', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  googleButtonText: {
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#555', 
  },

  // 7. ADICIONADO: Estilos para o Botão de Versão
  versionButton: {
    backgroundColor: 'transparent',
    borderColor: COLORS.white,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  versionButtonText: {
    fontFamily: FONTS.text,
    color: COLORS.white,
    fontSize: 16,
  },

  // 8. ADICIONADO: Estilos para o Modal de Versão
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.darkGray, 
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.limeGreen, 
  },
  modalTitle: {
    fontFamily: FONTS.title,
    fontSize: 22,
    color: COLORS.limeGreen,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontFamily: FONTS.text,
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalCloseButton: {
    backgroundColor: COLORS.limeGreen,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  modalCloseButtonText: {
    fontFamily: FONTS.title,
    color: COLORS.darkGray, 
    fontSize: 16,
    fontWeight: 'bold',
  },
});