import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// 1. CORREÇÃO: Corrigido o caminho para corresponder a outros arquivos na pasta (tabs)
import { COLORS, FONTS } from '../../constants/theme';

export default function DescarteScreen() {
  // Estados para controlar os valores do formulário (mockup)
  const [tipoDescarte, setTipoDescarte] = useState('Pilhas e Baterias');
  const [parceiro, setParceiro] = useState('E-Descartes');
  const [radioSelected, setRadioSelected] = useState('ponto-coleta');
  
  // Estado para o modal de "Descarte Solicitado"
  const [modalVisible, setModalVisible] = useState(false);
  // 2. ADICIONADO: Novo estado para o Modal de Contato
  const [contactModalVisible, setContactModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* 1. Título (Lato, Verde-Limão) */}
      <Text style={styles.title}>Descartes</Text>

      {/* 3. IMAGEM CLICÁVEL: Envolvida com TouchableOpacity */}
      <TouchableOpacity onPress={() => setContactModalVisible(true)}>
        <Image
          source={require('../../assets/images/mapa-simulado.gif')} // Certifique-se que o arquivo existe
          style={styles.mapImage}
        />
      </TouchableOpacity>

      {/* 4. Caixa Suspensa 1: Tipo de Descarte */}
      <Text style={styles.label}>Tipo de Descarte</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoDescarte}
          onValueChange={(itemValue) => setTipoDescarte(itemValue)}
          style={styles.picker}
          dropdownIconColor={COLORS.white}
        >
          <Picker.Item label="Pilhas e Baterias" value="Pilhas e Baterias" />
          <Picker.Item label="Eletrônicos" value="Eletrônicos" />
          <Picker.Item label="Eletrodomésticos" value="Eletrodomésticos" />
        </Picker>
      </View>

      {/* 5. Caixa Suspensa 2: Parceiros */}
      <Text style={styles.label}>Parceiros</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={parceiro}
          onValueChange={(itemValue) => setParceiro(itemValue)}
          style={styles.picker}
          dropdownIconColor={COLORS.white}
        >
          <Picker.Item label="E-Descartes" value="E-Descartes" />
          <Picker.Item label="Eletrolixo" value="Eletrolixo" />
          <Picker.Item label="EcoPonto" value="EcoPonto" />
        </Picker>
      </View>

      {/* 6. Radio Buttons */}
      <TouchableOpacity 
        style={styles.radioContainer} 
        onPress={() => setRadioSelected('ponto-coleta')}
      >
        <Ionicons
          name={radioSelected === 'ponto-coleta' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={COLORS.limeGreen}
        />
        <Text style={styles.radioLabel}>Descartar no Ponto de Coleta</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.radioContainer} 
        onPress={() => setRadioSelected('agendar-retirada')}
      >
        <Ionicons
          name={radioSelected === 'agendar-retirada' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={COLORS.limeGreen}
        />
        <Text style={styles.radioLabel}>Agendar Retirada</Text>
      </TouchableOpacity>

      {/* 7. Botões */}
      <TouchableOpacity 
        style={styles.buttonDark} 
        onPress={() => setModalVisible(true)} // Abre o Modal de Descarte
      >
        <Text style={styles.buttonTextWhite}>Novo Descarte</Text>
      </TouchableOpacity>

      <Link href="/meus" asChild>
        <TouchableOpacity style={styles.buttonLight}>
          <Text style={styles.buttonTextBlack}>Meus Descartes</Text>
        </TouchableOpacity>
      </Link>

      {/* 8. Modal de Confirmação (Descarte Solicitado) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Descarte Solicitado</Text>
            <TouchableOpacity 
              style={styles.buttonLight} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonTextBlack}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 9. ADICIONADO: Novo Modal de Contato */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={contactModalVisible} // Controlado pelo novo estado
        onRequestClose={() => setContactModalVisible(false)}
      >
        {/* Overlay escuro */}
        <View style={styles.modalOverlay}>
          {/* Caixa de conteúdo do Modal */}
          <View style={styles.modalContent}>
            <Ionicons name="mail" size={40} color={COLORS.limeGreen} style={{ marginBottom: 15 }} />
            
            <Text style={styles.modalTitle}>Entre em Contato</Text>
            
            <Text style={styles.modalText}>
              Entre em contato no e-mail:
            </Text>
            <Text style={styles.modalEmail}>
              mdgstartups@gmail.com
            </Text>

            {/* Botão de Fechar */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setContactModalVisible(false)} // Fecha este modal
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
    padding: 20,
  },
  title: {
    fontFamily: FONTS.text, 
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.limeGreen,
    textAlign: 'center',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#555', 
    borderWidth: 2, // Adiciona uma borda para parecer clicável
    borderColor: COLORS.limeGreen, // Borda verde
  },
  label: {
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  pickerContainer: {
    backgroundColor: '#3b3b3b',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    color: COLORS.white,
    height: 50,
    width: '100%',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioLabel: {
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 10,
  },
  buttonDark: {
    backgroundColor: COLORS.darkGreen,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonLight: {
    backgroundColor: COLORS.limeGreen,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonTextWhite: {
    fontFamily: FONTS.title, 
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextBlack: {
    fontFamily: FONTS.title, 
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // --- ESTILOS DO MODAL (Adaptados de home.tsx) ---
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
    elevation: 10,
    shadowColor: COLORS.limeGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  // 10. ADICIONADO: Estilo de Título para o Modal
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
    marginBottom: 5,
  },
  // 11. ADICIONADO: Estilo de E-mail para o Modal
  modalEmail: {
    fontFamily: FONTS.text,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  // 12. ADICIONADO: Estilo do Botão Fechar (baseado em home.tsx)
  modalCloseButton: {
    backgroundColor: COLORS.limeGreen,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  modalCloseButtonText: {
    fontFamily: FONTS.title,
    color: COLORS.darkGray, // Texto escuro no botão verde
    fontSize: 16,
    fontWeight: 'bold',
  },
});