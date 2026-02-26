import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default function Cadastro() {
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }}
      style={styles.background}
      blurRadius={8}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Cadastre-se para começar</Text>

          <TextInput
            placeholder="Nome"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(245,245,247,0.85)",
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#f2f2f7",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});