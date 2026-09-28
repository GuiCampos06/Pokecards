import axios from "axios";

// PokéAPI: gratuita, publica e sem necessidade de chave de acesso.
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Busca uma descrição curta de uma habilidade (ex: "Overgrow").
// Tenta em português primeiro; se não achar, usa inglês.
export async function getAbilityDescription(abilityUrl) {
  try {
    const response = await axios.get(abilityUrl);
    const entries = response.data.flavor_text_entries || [];

    const ptEntry = entries.find(
      (entry) => entry.language.name === "pt-br" || entry.language.name === "pt"
    );
    if (ptEntry) return ptEntry.flavor_text.replace(/[\n\f]/g, " ");

    const enEntry = entries.find((entry) => entry.language.name === "en");
    if (enEntry) return enEntry.flavor_text.replace(/[\n\f]/g, " ");

    const effect = (response.data.effect_entries || []).find(
      (entry) => entry.language.name === "en"
    );
    return effect ? effect.short_effect : "Descrição não disponível.";
  } catch (error) {
    return "Descrição não disponível.";
  }
}

// Transforma a árvore de evolução da API numa lista de "estágios"
// (cada estágio é uma lista, pois alguns Pokémons têm mais de uma
// evolução possível, como o Eevee).
function flattenEvolutionChain(node, depth = 0, stages = []) {
  if (!stages[depth]) stages[depth] = [];
  stages[depth].push(node.species.name);

  node.evolves_to.forEach((child) => flattenEvolutionChain(child, depth + 1, stages));

  return stages;
}

// Busca a linha evolutiva completa de um Pokémon, já com imagem de cada estágio.
export async function getEvolutionChain(pokemonName) {
  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
  );
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

  const evolutionResponse = await axios.get(evolutionChainUrl);
  const stages = flattenEvolutionChain(evolutionResponse.data.chain);

  const stagesWithImages = await Promise.all(
    stages.map((stageNames) =>
      Promise.all(
        stageNames.map(async (name) => {
          try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const d = res.data;
            return {
              name: d.name,
              image:
                d.sprites?.other?.["official-artwork"]?.front_default ||
                d.sprites?.front_default,
            };
          } catch (error) {
            return { name, image: null };
          }
        })
      )
    )
  );

  return stagesWithImages;
}

export default api;
