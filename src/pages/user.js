import React, { Component } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAbilityDescription, getEvolutionChain } from "../services/api";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  TypesRow,
  TypeBadge,
  TypeText,
  InfoRow,
  InfoBox,
  InfoLabel,
  InfoValue,
  SectionTitle,
  ListItem,
  AbilityDescription,
  ShinyRow,
  ShinyImage,
  EvolutionRow,
  EvolutionStage,
  EvolutionImage,
  EvolutionName,
  EvolutionCondition,
  EvolutionArrow,
  StatRow,
  StatLabel,
  StatBarBackground,
  StatBarFill,
  StatValue,
} from "../styles";

export default class User extends Component {
  state = {
    abilityDescriptions: {},
    loadingAbilities: true,
    evolutionChain: [],
    loadingEvolution: true,
  };

  componentDidMount() {
    const { pokemon } = this.props.route.params;
    this.loadAbilityDescriptions(pokemon);
    this.loadEvolutionChain(pokemon);
  }

  loadAbilityDescriptions = async (pokemon) => {
    const descriptions = {};

    await Promise.all(
      pokemon.abilities.map(async (ability) => {
        descriptions[ability.name] = await getAbilityDescription(ability.url);
      })
    );

    this.setState({ abilityDescriptions: descriptions, loadingAbilities: false });
  };

  loadEvolutionChain = async (pokemon) => {
    try {
      const stages = await getEvolutionChain(pokemon.name);
      this.setState({ evolutionChain: stages, loadingEvolution: false });
    } catch (error) {
      this.setState({ loadingEvolution: false });
    }
  };

  render() {
    const { route, navigation } = this.props;
    const { pokemon } = route.params;
    const {
      abilityDescriptions,
      loadingAbilities,
      evolutionChain,
      loadingEvolution,
    } = this.state;

    return (
      <ScrollView>
        <Container>
          <Header>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#333"
              style={{ position: "absolute", top: 16, left: 16 }}
              onPress={() => navigation.goBack()}
            />

            <AvatarPerfil source={{ uri: pokemon.image }} resizeMode="contain" />
            <NamePerfil>{pokemon.name}</NamePerfil>
            <TypesRow>
              {pokemon.types.split(", ").map((type) => (
                <TypeBadge key={type}>
                  <TypeText>{type}</TypeText>
                </TypeBadge>
              ))}
            </TypesRow>
          </Header>

          <InfoRow>
            <InfoBox>
              <InfoLabel>Altura</InfoLabel>
              <InfoValue>{(pokemon.height / 10).toFixed(1)} m</InfoValue>
            </InfoBox>
            <InfoBox>
              <InfoLabel>Peso</InfoLabel>
              <InfoValue>{(pokemon.weight / 10).toFixed(1)} kg</InfoValue>
            </InfoBox>
          </InfoRow>

          {pokemon.shinyImage && (
            <>
              <SectionTitle>Versão Shiny ✨</SectionTitle>
              <ShinyRow>
                <ShinyImage source={{ uri: pokemon.shinyImage }} resizeMode="contain" />
              </ShinyRow>
            </>
          )}

          <SectionTitle>Habilidades</SectionTitle>
          {pokemon.abilities.map((ability) => (
            <React.Fragment key={ability.name}>
              <ListItem>• {ability.name}</ListItem>
              <AbilityDescription>
                {loadingAbilities
                  ? "Carregando descrição..."
                  : abilityDescriptions[ability.name]}
              </AbilityDescription>
            </React.Fragment>
          ))}

          <SectionTitle>Linha Evolutiva</SectionTitle>
          {loadingEvolution ? (
            <ActivityIndicator color="#E3350D" style={{ marginBottom: 20 }} />
          ) : (
            <EvolutionRow>
              {evolutionChain.map((stage, stageIndex) => (
                <React.Fragment key={stageIndex}>
                  {stage.map((evo) => (
                    <EvolutionStage key={evo.name}>
                      <EvolutionImage
                        source={{ uri: evo.image }}
                        resizeMode="contain"
                      />
                      <EvolutionName>{evo.name}</EvolutionName>
                      {evo.condition && (
                        <EvolutionCondition>{evo.condition}</EvolutionCondition>
                      )}
                    </EvolutionStage>
                  ))}
                  {stageIndex < evolutionChain.length - 1 && (
                    <EvolutionArrow>➜</EvolutionArrow>
                  )}
                </React.Fragment>
              ))}
            </EvolutionRow>
          )}

          <SectionTitle>Atributos</SectionTitle>
          {pokemon.stats.map((stat) => (
            <StatRow key={stat.name}>
              <StatLabel>{stat.name}</StatLabel>
              <StatBarBackground>
                <StatBarFill pctWidth={Math.min(stat.value, 100)} />
              </StatBarBackground>
              <StatValue>{stat.value}</StatValue>
            </StatRow>
          ))}
        </Container>
      </ScrollView>
    );
  }
}
