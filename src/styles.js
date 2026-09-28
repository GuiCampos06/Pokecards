import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

//Estilo da página MAIN

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#999",
})`
  flex: 1;
  height: 40px;
  background: #eee;
  padding: 0 15px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #E3350D;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
  border-width: 2px;
  border-color: #e3350d;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #E3350D;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

//Estilo da página USER
export const Header = styled.View`
  padding: 30px;
  align-items: center;
  justify-content: center;
  background: #fff1ef;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
`;

export const AvatarPerfil = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
  border-width: 3px;
  border-color: #e3350d;
`;

export const NamePerfil = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const BioPerfil = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

//Estilo dos Cards e Detalhes do Pokémon (telas MAIN e USER)

export const TypesRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const TypeBadge = styled.View`
  background: #f0e6ff;
  border-radius: 12px;
  padding: 4px 12px;
  margin: 2px 4px;
`;

export const TypeText = styled.Text`
  color: #E3350D;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 13px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
  padding: 0 30px;
`;

export const InfoBox = styled.View`
  align-items: center;
`;

export const InfoLabel = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const InfoValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #E3350D;
  margin: 10px 30px;
`;

export const ListItem = styled.Text`
  color: #333;
  text-transform: capitalize;
  margin: 2px 30px;
`;

export const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px 30px;
`;

export const StatLabel = styled.Text`
  width: 90px;
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
`;

export const StatBarBackground = styled.View`
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 0 8px;
  overflow: hidden;
`;

export const StatBarFill = styled.View`
  height: 8px;
  background: #E3350D;
  width: ${(props) => props.pctWidth}%;
`;

export const StatValue = styled.Text`
  width: 30px;
  font-size: 12px;
  color: #333;
`;

//Estilo do fundo e do cabeçalho temático de Pokébola

export const ScreenBackground = styled.View`
  flex: 1;
  background: #fafafa;
`;

export const EmptyMessage = styled.Text`
  text-align: center;
  color: #999;
  margin-top: 40px;
  padding: 0 20px;
`;

// Cabeçalho vermelho com linha e botão central, como a parte de cima
// de uma Pokébola. Usado no topo das telas de Login, Cadastro e Cards.
export const PokeballHeader = styled.View`
  height: 140px;
  background: #e3350d;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 14px;
`;

export const PokeballHeaderLine = styled.View`
  position: absolute;
  top: 67px;
  left: 0;
  right: 0;
  height: 6px;
  background: #222;
`;

export const PokeballHeaderButton = styled.View`
  position: absolute;
  top: 45px;
  align-self: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #fff;
  border-width: 6px;
  border-color: #222;
`;

export const PokeballHeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

// Pokébola bem grande e transparente, só de enfeite, no canto da tela.
export const PokeballWatermark = styled.View`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 130px;
  bottom: -90px;
  right: -90px;
  background: #e3350d;
  opacity: 0.06;
  overflow: hidden;
`;

export const PokeballWatermarkLine = styled.View`
  position: absolute;
  top: 127px;
  left: 0;
  right: 0;
  height: 6px;
  background: #000;
`;

export const PokeballWatermarkButton = styled.View`
  position: absolute;
  top: 100px;
  left: 100px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #000;
`;

//Estilo das novas seções da tela de Detalhes (habilidades, shiny, evolução)

export const AbilityDescription = styled.Text`
  color: #666;
  font-size: 13px;
  line-height: 18px;
  margin: 0 30px 12px 30px;
`;

export const ShinyRow = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const ShinyImage = styled.Image`
  width: 120px;
  height: 120px;
`;

export const EvolutionRow = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 6px 20px 24px;
`;

export const EvolutionStage = styled.View`
  align-items: center;
  margin: 0 10px;
`;

export const EvolutionImage = styled.Image`
  width: 70px;
  height: 70px;
`;

export const EvolutionName = styled.Text`
  font-size: 12px;
  color: #333;
  text-transform: capitalize;
  margin-top: 2px;
  text-align: center;
`;

export const EvolutionCondition = styled.Text`
  font-size: 11px;
  color: #666;
  text-align: center;
  margin-top: 2px;
  max-width: 90px;
`;

export const EvolutionArrow = styled.Text`
  font-size: 20px;
  color: #ccc;
  margin: 0 2px;
  align-self: center;
`;