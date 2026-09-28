import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
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
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  EmptyMessage,
} from "../styles";

export default class Main extends Component {
  state = {
    search: "",
    cards: [],
    loading: false,
  };

  async componentDidMount() {
    const cardsJson = await AsyncStorage.getItem("cards");
    if (cardsJson) {
      this.setState({ cards: JSON.parse(cardsJson) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { cards } = this.state;
    if (prevState.cards !== cards) {
      AsyncStorage.setItem("cards", JSON.stringify(cards));
    }
  }

  // Busca pelo NOME (ex: "pikachu") ou pelo NÚMERO da Pokédex (ex: "25").
  // A PokéAPI aceita os dois formatos no mesmo endpoint.
  handleAddCard = async () => {
    const { cards, search } = this.state;
    const query = search.trim().toLowerCase();

    if (!query) {
      alert("Digite o nome ou o número da Pokédex do Pokémon!");
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await api.get(`/pokemon/${query}`);
      const data = response.data;

      if (cards.find((card) => card.id === data.id)) {
        alert("Esse Pokémon já está na sua lista!");
        this.setState({ loading: false });
        return;
      }

      const card = {
        id: data.id,
        name: data.name,
        image:
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default,
        shinyImage:
          data.sprites?.other?.["official-artwork"]?.front_shiny ||
          data.sprites?.front_shiny ||
          null,
        types: data.types.map((t) => t.type.name).join(", "),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a) => ({
          name: a.ability.name,
          url: a.ability.url,
        })),
        stats: data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };

      this.setState({
        cards: [...cards, card],
        search: "",
        loading: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Pokémon não encontrado. Confira o nome ou o número digitado!");
      } else {
        alert("Não foi possível buscar esse Pokémon. Tente novamente!");
      }
      this.setState({ loading: false });
    }
  };

  handleDeleteCard = (id) => {
    this.setState({
      cards: this.state.cards.filter((card) => card.id !== id),
    });
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      this.props.navigation.replace("login");
    } catch (error) {
      console.error("Erro ao realizar o logout:", error);
    }
  };

  render() {
    const { cards, search, loading } = this.state;

    return (
      <ScreenBackground>
        <PokeballWatermark>
          <PokeballWatermarkLine />
          <PokeballWatermarkButton />
        </PokeballWatermark>

        <PokeballHeader>
          <PokeballHeaderLine />
          <PokeballHeaderButton />
          <PokeballHeaderTitle>Meus PokéCards</PokeballHeaderTitle>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#fff"
            style={{ position: "absolute", top: 16, right: 16 }}
            onPress={this.handleLogout}
          />
        </PokeballHeader>

        <Container>
          <Form>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome ou número (ex: pikachu ou 25)"
              value={search}
              onChangeText={(search) => this.setState({ search })}
              onSubmitEditing={this.handleAddCard}
              returnKeyType="search"
            />
            <SubmitButton
              loading={loading}
              enabled={!loading}
              onPress={this.handleAddCard}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ProfileButtonText>Add</ProfileButtonText>
              )}
            </SubmitButton>
          </Form>

          <List
            data={cards}
            keyExtractor={(card) => String(card.id)}
            ListEmptyComponent={
              <EmptyMessage>
                Nenhum Pokémon ainda. Busque pelo nome ou número acima! ⚡
              </EmptyMessage>
            }
            renderItem={({ item }) => (
              <User>
                <Avatar source={{ uri: item.image }} resizeMode="contain" />
                <Name>{item.name}</Name>
                <Bio>{item.types}</Bio>

                <ProfileButton
                  onPress={() =>
                    this.props.navigation.navigate("user", { pokemon: item })
                  }
                >
                  <ProfileButtonText>Ver mais detalhes</ProfileButtonText>
                </ProfileButton>

                <ProfileButton
                  onPress={() => this.handleDeleteCard(item.id)}
                  style={{ backgroundColor: "#FFC0CB" }}
                >
                  <ProfileButtonText>Excluir</ProfileButtonText>
                </ProfileButton>
              </User>
            )}
          />
        </Container>
      </ScreenBackground>
    );
  }
}
