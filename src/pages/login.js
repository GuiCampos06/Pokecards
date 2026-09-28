import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScreenBackground,
  PokeballHeader,
  PokeballHeaderLine,
  PokeballHeaderButton,
  PokeballHeaderTitle,
  PokeballWatermark,
  PokeballWatermarkLine,
  PokeballWatermarkButton,
} from "../styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      alert("Nenhum usuário cadastrado!");
      return;
    }
    const userJson = JSON.parse(user);
    if (userJson.email === email && userJson.password === password) {
      navigation.navigate("main");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  const handleCadastrar = () => {
    navigation.navigate("cadastro");
  };

  return (
    <ScreenBackground>
      <PokeballWatermark>
        <PokeballWatermarkLine />
        <PokeballWatermarkButton />
      </PokeballWatermark>

      <PokeballHeader>
        <PokeballHeaderLine />
        <PokeballHeaderButton />
        <PokeballHeaderTitle>PokéCards</PokeballHeaderTitle>
      </PokeballHeader>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={handleCadastrar}>
          <Text style={styles.buttonOutlineText}>Cadastrar Usuário</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#E3350D",
    borderRadius: 5,
    padding: 12,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#E3350D",
    borderRadius: 5,
    padding: 12,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonOutlineText: {
    color: "#E3350D",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Login;
