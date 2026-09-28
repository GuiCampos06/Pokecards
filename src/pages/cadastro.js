import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import {
  ScreenBackground,
  PokeballHeader,
  PokeballHeaderLine,
  PokeballHeaderButton,
  PokeballHeaderTitle,
} from "../styles";

export default class Cadastro extends Component {
  state = {
    nome: "",
    telefone: "",
    cpf: "",
    email: "",
    curso: "",
    password: "",
  };

  handleCadastro = async () => {
    const { nome, telefone, cpf, email, curso, password } = this.state;

    if (!nome || !email || !password) {
      alert("Preencha ao menos Nome, E-mail e Senha!");
      return;
    }

    const user = { nome, telefone, cpf, email, curso, password };

    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("login");
  };

  render() {
    const { nome, telefone, cpf, email, curso, password } = this.state;

    return (
      <ScreenBackground>
        <PokeballHeader>
          <PokeballHeaderLine />
          <PokeballHeaderButton />
          <PokeballHeaderTitle>Cadastrar Usuário</PokeballHeaderTitle>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            style={{ position: "absolute", top: 16, left: 16 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </PokeballHeader>

        <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={(nome) => this.setState({ nome })}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={(telefone) => this.setState({ telefone })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={(cpf) => this.setState({ cpf })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Curso"
            value={curso}
            onChangeText={(curso) => this.setState({ curso })}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </ScreenBackground>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#E3350D",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
