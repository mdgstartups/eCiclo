import { Ionicons } from "@expo/vector-icons"; // Ícones inferiores
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EWasteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* */} 
      <Text style={styles.title}>
        {/* 🔹 TROCAR AQUI: Título principal */}
        E-Ciclo: Informações de descarte eletrônico 
      </Text>

      {/* === Etapa 1 === */}
      <Text style={styles.stepTitle}>
        {/* 🔹 TROCAR AQUI: Título da etapa 1 */}
        Pilhas
      </Text>
      <Text style={styles.stepText}>
        {/* 🔹 TROCAR AQUI: Texto da etapa 1 */}
        Para fazer o descarte de pilhas e outros componentes semelhantes, a primeira coisa que você deve fazer é embalar esses itens com a ajuda de um plástico resistente. Assim, eles ficam protegidos contra a umidade ou vazamentos, e então podem ser descartados do jeito certo.
      </Text>

      {/* === Etapa 2 === */}
      <Text style={styles.stepTitle}>
        Celulares e Notebooks
      </Text>
      <Text style={styles.stepText}>
        Para fazer o descarte de dispositivos pessoais como celulares e notebooks, a primeira coisa que você deve fazer é realizar um backup completo dos seus dados e, em seguida, apagar todas as informações pessoais do aparelho (fotos, documentos, contatos, etc.), restaurando as configurações de fábrica e assim podendo ser descartado da maneira correta.
      </Text>

      {/* === Etapa 3 === */}
      <Text style={styles.stepTitle}>
        Geladeiras
      </Text>
      <Text style={styles.stepText}>
        Para fazer o descarte da sua geladeira antiga, a primeira coisa que você deve fazer é garantir que o aparelho está descongelado, completamente vazio e desinstalado (fora da tomada e, se for side-by-side ou com dispenser, desconectado da água), e assim poderá ser colocado para descarte de maneira correta.
      </Text>

      {/* === Etapa 4 === */}
      <Text style={styles.stepTitle}>
        Micro-ondas
      </Text>
      <Text style={styles.stepText}>
        Para fazer o descarte do seu micro-ondas, a primeira coisa que você deve fazer é certificar-se de que ele está limpo e sem restos de comida ou gordura. O aparelho deve ser descartado inteiro e nunca desmontado por conta própria. Com ele ja limpo, poderá ser colocado para decarte adequado.
      </Text>

      {/* === Etapa 5 === */}
      <Text style={styles.stepTitle}>
        {/* 🔹 TROCAR AQUI: Título da etapa 5 */}
        Fones de ouvido
      </Text>
      <Text style={styles.stepText}>
        {/* 🔹 TROCAR AQUI: Texto da etapa 5 */}
        Para fazer o descarte dos seus fones de ouvido (com ou sem fio), a primeira coisa que você deve fazer é, se possível, enrolar os cabos e colocá-los dentro de um saquinho plástico ou embalagem pequena para evitar que se enrosquem nos maquinários de reciclagem ou se percam na coleta, assim estará adequado para descarte correto.
      </Text>

      {/* === Barra Inferior === */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={26} color="#A8FFB0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#A8FFB0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings" size={26} color="#A8FFB0" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAF5", // 🔹 Cor de fundo
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2D2D2D",
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D2D2D",
    marginTop: 12,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
