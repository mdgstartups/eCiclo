import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConfiguracoesScreen = ({ navigation }: any) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isModalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Configurar Google Signin apenas uma vez
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'SEU_WEB_CLIENT_ID_ANDROID_AQUI',
      iosClientId:
        '119804450667-k8199fokd8mjhkl51deltsa3mul7ja58.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  // Carrega tema uma vez ao montar
  useEffect(() => {
    loadTheme();
  }, []);

  // Atualiza StatusBar quando o tema muda
  useEffect(() => {
    try {
      StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');
    } catch (e) {
      // alguns ambientes podem não suportar setBarStyle — silencioso
    }
  }, [theme]);

  // 🔹 Carrega o tema salvo
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  // 🔹 Salva o tema
  const saveTheme = async (newTheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  // 🔹 Login com Google
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      Alert.alert('Sucesso', `Conta Google conectada: ${user?.user?.email ?? ''}`);
    } catch (error: any) {
      const code = error?.code;
      if (code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelado', 'Login cancelado pelo usuário.');
      } else if (code === statusCodes.IN_PROGRESS) {
        Alert.alert('Em progresso', 'Login já em andamento.');
      } else if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Erro', 'Play Services não disponível.');
      } else {
        Alert.alert('Erro', 'Falha no login: ' + (error?.message ?? String(error)));
      }
    }
  };

  // 🔹 Logout
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      Alert.alert('Logout', 'Conta desconectada.');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 🔸 Conta Google */}
        <View style={styles.accountSection}>
          <Icon
            name="account-circle"
            size={32}
            color={theme === 'light' ? '#000' : '#fff'}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.sectionTitle}>
            {userInfo ? `Olá, ${userInfo?.user?.name ?? userInfo?.user?.email ?? 'Usuário'}` : 'Conta Google'}
          </Text>
        </View>

        {/* 🔸 Botão de Login / Logout */}
        {userInfo ? (
          <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
            <Icon name="logout" size={18} color="#ff0000" style={{ marginRight: 6 }} />
            <Text style={styles.logoutText}>Desconectar</Text>
          </TouchableOpacity>
        ) : (
          <GoogleSigninButton
            style={styles.googleButton}
            size={GoogleSigninButton.Size.Wide}
            color={
              theme === 'light'
                ? GoogleSigninButton.Color.Light
                : GoogleSigninButton.Color.Dark
            }
            onPress={signInWithGoogle}
          />
        )}

        {/* 🔸 Botão Tema Claro */}
        <TouchableOpacity style={styles.button} onPress={() => saveTheme('light')}>
          <Icon
            name="brightness-high"
            size={24}
            color={theme === 'light' ? '#000' : '#fff'}
          />
          <Text style={styles.buttonText}>Claro</Text>
        </TouchableOpacity>

        {/* 🔸 Botão Tema Escuro */}
        <TouchableOpacity style={styles.button} onPress={() => saveTheme('dark')}>
          <Icon
            name="brightness-low"
            size={24}
            color={theme === 'light' ? '#000' : '#fff'}
          />
          <Text style={styles.buttonText}>Escuro</Text>
        </TouchableOpacity>

        {/* 🔸 Botão Sugestões */}
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Icon name="email" size={24} color={theme === 'light' ? '#000' : '#fff'} />
          <Text style={styles.buttonText}>Sugestões e E-mails</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Modal de Sugestões */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sugestões e E-mails</Text>
            <Text style={styles.modalText}>
              📧 sugestões: sugestoes@exemplo.com{'\n'}
              🛠️ suporte: suporte@exemplo.com{'\n'}
              Agradecemos seu feedback!
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🔹 Barra de Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#007AFF" />
          <Text style={styles.navText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#007AFF" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.activeNavButton]}
          onPress={() => navigation.navigate('Configuracoes')}
        >
          <Icon name="settings" size={24} color="#007AFF" />
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* ==========================================================
   🎨 ESTILOS — Mesmo layout, cores e formatos originais
   ========================================================== */
const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f5f5f5' : '#121212',
    },
    content: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
    },
    accountSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      // gap removido; usamos marginRight nos ícones
    },
    sectionTitle: {
      fontSize: 18,
      color: theme === 'light' ? '#000' : '#fff',
      fontWeight: 'bold',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      padding: 15,
      marginVertical: 10,
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    buttonText: {
      flex: 1,
      marginLeft: 15,
      fontSize: 16,
      color: theme === 'light' ? '#000' : '#fff',
    },
    googleButton: {
      width: '100%',
      height: 60,
      marginVertical: 15,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    logoutText: {
      color: '#ff0000',
      fontSize: 14,
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme === 'light' ? '#000' : '#fff',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 14,
      textAlign: 'center',
      color: theme === 'light' ? '#666' : '#ccc',
      marginBottom: 20,
      lineHeight: 20,
    },
    modalButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: theme === 'light' ? '#ddd' : '#555',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    navButton: {
      alignItems: 'center',
      padding: 5,
    },
    activeNavButton: {
      borderBottomWidth: 2,
      borderBottomColor: '#007AFF',
    },
    navText: {
      fontSize: 12,
      color: '#666',
      marginTop: 2,
    },
  });

export default ConfiguracoesScreen;
