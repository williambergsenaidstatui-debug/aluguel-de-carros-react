import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

export default function Login() {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      }}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* 🚗 Logo WL Cars */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoWL}>WL</Text>
            <Text style={styles.logoCars}>Cars</Text>
          </View>

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>
            Acesse sua conta
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

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
    backgroundColor: "rgba(10,10,10,0.85)",
    justifyContent: "center",
    padding: 25,
  },

  card: {
    backgroundColor: "#111",
    padding: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  /* 🚗 Logo */
  logoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },

  logoWL: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 4,
  },

  logoCars: {
    fontSize: 16,
    color: "#fff",
    letterSpacing: 2,
    marginTop: -5,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
  },

  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});