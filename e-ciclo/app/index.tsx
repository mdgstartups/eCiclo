import { View, StyleSheet } from 'react-native';
// Reintroduzindo SvgUri para carregar o logo
import { SvgUri } from 'react-native-svg'; 
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
// Importação das cores
import { COLORS } from '../constants/theme'; 

// Define a cor de fundo sólida conforme sua solicitação
const SPLASH_COLOR = '#0fd62f'; 

export default function SplashScreen() {
  const router = useRouter();

  // Caminho do seu SVG. O 'require' carrega o asset local.
  // IMPORTANTE: Use o caminho que funcionou no seu sistema.
  // Assumindo a estrutura padrão: e-ciclo/assets/svg/elogo.svg
  const logoUri = require('../assets/svg/elogo.svg'); 

  useEffect(() => {
    // Redireciona para a home após 3 segundos
    const timer = setTimeout(() => {
      router.replace('/home'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}> 

      {/* Renderizando o SVG usando SvgUri */}
      <SvgUri
        width="200"
        height="200"
        uri={logoUri.uri} // O objeto 'require' é passado para o SvgUri
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Aplicando a cor de fundo sólida
    backgroundColor: SPLASH_COLOR, 
  },
});