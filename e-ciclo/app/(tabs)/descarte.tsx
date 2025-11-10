import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

export default function DescarteScreen() {
  // Estados para controlar os valores do formulário (mockup)
  const [tipoDescarte, setTipoDescarte] = useState('Pilhas e Baterias');
  const [parceiro, setParceiro] = useState('E-Descartes');
  const [radioSelected, setRadioSelected] = useState('ponto-coleta');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* 1. Título (Lato, Verde-Limão) */}
      <Text style={styles.title}>Descartes</Text>

      {/* 2. Imagem do Mapa */}
      <Image
        source={require('../../assets/images/mapa-simulado.png')} // Certifique-se que o arquivo existe
        style={styles.mapImage}
      />

      {/* 3. Caixa Suspensa 1: Tipo de Descarte */}
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

      {/* 4. Caixa Suspensa 2: Parceiros */}
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

      {/* 5. Radio Buttons */}
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

      {/* 6. Botões */}
      <TouchableOpacity 
        style={styles.buttonDark} 
        onPress={() => setModalVisible(true)} // Abre o Modal
      >
        <Text style={styles.buttonTextWhite}>Novo Descarte</Text>
      </TouchableOpacity>

      <Link href="/meus" asChild>
        <TouchableOpacity style={styles.buttonLight}>
          <Text style={styles.buttonTextBlack}>Meus Descartes</Text>
        </TouchableOpacity>
      </Link>

      {/* 7. Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Descarte Solicitado</Text>
            <TouchableOpacity 
              style={styles.buttonLight} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonTextBlack}>Fechar</Text>
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
    // Título: Lato, Negrito, Verde-Limão (Conforme especificado para esta tela)
    fontFamily: FONTS.text, // Lato
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
    backgroundColor: '#555', // Placeholder se a imagem não carregar
  },
  label: {
    // Texto descritivo: Lexend, Branco (Conforme especificado para esta tela)
    fontFamily: FONTS.title, // Lexend
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
    fontFamily: FONTS.title, // Lexend
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
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextBlack: {
    fontFamily: FONTS.title, // Lexend
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: COLORS.darkGray,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.limeGreen,
  },
  modalText: {
    fontFamily: FONTS.title, // Lexend
    color: COLORS.white,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});