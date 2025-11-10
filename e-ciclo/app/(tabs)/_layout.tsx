import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme'; // Caminho correto (sobe dois níveis)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Define o cabeçalho como visível ou não para cada tela
        headerShown: false, 
        
        // Estilos da Tab Bar (A barra em si)
        tabBarActiveTintColor: COLORS.limeGreen, 
        tabBarInactiveTintColor: '#ccc', 
        tabBarStyle: {
          backgroundColor: COLORS.black, 
          borderTopWidth: 0,
          height: 60, // Adicionei altura explícita para garantir visibilidade
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          paddingBottom: 5, // Ajuste para melhor visualização
        },
      }}>
      
      {/* 1. HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          // Se o cabeçalho estiver escondido, você pode querer adicionar um título
          // Se aparecer um cabeçalho cinza, tente: headerTitle: 'E-Ciclo Home' 
        }}
      />
      
      {/* 2. DESCARTE */}
      <Tabs.Screen
        name="descarte"
        options={{
          title: 'Descarte',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="recycle" size={24} color={color} />
          ),
        }}
      />
      
      {/* 3. INFORMAÇÕES */}
      <Tabs.Screen
        name="informacoes"
        options={{
          title: 'Informações',
          tabBarIcon: ({ color }) => (
            <Ionicons name="information-circle" size={24} color={color} />
          ),
        }}
      />
      
      {/* 4. CONFIGURAÇÕES */}
      <Tabs.Screen
        name="config"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}