import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [genero, setGenero] = useState("");

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      }}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            
            {/* Logo WL CARS centralizado */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoWL}>WL</Text>
              <Text style={styles.logoCars}>CARS</Text>
            </View>

            <Text style={styles.title}>Cadastro de usuário</Text>

            {/* Nome completo */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nome completo"
                placeholderTextColor="#888"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Senha */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#888"
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Telefone */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Telefone"
                placeholderTextColor="#888"
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Data de Nascimento */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Data de Nascimento"
                placeholderTextColor="#888"
                style={styles.input}
                value={dataNasc}
                onChangeText={setDataNasc}
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Gênero */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Gênero"
                placeholderTextColor="#888"
                style={styles.input}
                value={genero}
                onChangeText={setGenero}
              />
              <Text style={styles.emoji}></Text>
            </View>

            {/* Botão Cadastrar */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#111",
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoWL: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 4,
    textAlign: "center",
  },
  logoCars: {
    fontSize: 18,
    color: "#fff",
    letterSpacing: 2,
    marginLeft: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
    paddingRight: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#fff",
  },
  emoji: {
    fontSize: 20,
    color: "#FFD700",
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
    fontSize: 18,
    fontWeight: "bold",
  },
});