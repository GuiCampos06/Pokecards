import axios from "axios";
import {
  humanize,
  translateType,
  translateItem,
  translateMove,
  translateTrigger,
} from "./translations";

// PokéAPI: gratuita, publica e sem necessidade de chave de acesso.
// O timeout evita que uma requisição fique pendurada para sempre.
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 15000,
});

// Tradução automática inglês -> português (MyMemory, gratuita e sem chave).
// Se falhar (sem internet, limite diário), devolve o texto original.
const translationCache = {};

export async function translateToPt(text) {
  if (!text) return text;
  if (translationCache[text]) return translationCache[text];

  try {
    const response = await axios.get("https://api.mymemory.translated.net/get", {
      params: { q: text, langpair: "en|pt-br" },
      timeout: 10000,
    });

    let translated = response.data?.responseData?.translatedText;
    const ok = Number(response.data?.responseStatus) === 200;

    if (!ok || !translated || translated.toUpperCase().includes("MYMEMORY WARNING")) {
      return text;
    }

    translated = translated
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&");

    translationCache[text] = translated;
    return translated;
  } catch (error) {
    return text;
  }
}

// Busca uma descrição curta de uma habilidade (ex: "Overgrow").
// Tenta em português primeiro; se não achar, traduz o texto em inglês.
export async function getAbilityDescription(abilityUrl) {
  try {
    const response = await api.get(abilityUrl);
    const entries = response.data.flavor_text_entries || [];
    const clean = (text) => text.replace(/[\n\f]/g, " ");

    const ptEntry = entries.find(
      (entry) => entry.language.name === "pt-br" || entry.language.name === "pt"
    );
    if (ptEntry) return clean(ptEntry.flavor_text);

    const enEntry = entries.find((entry) => entry.language.name === "en");
    if (enEntry) return translateToPt(clean(enEntry.flavor_text));

    const effect = (response.data.effect_entries || []).find(
      (entry) => entry.language.name === "en"
    );
    return effect ? translateToPt(effect.short_effect) : "Descrição não disponível.";
  } catch (error) {
    return "Descrição não disponível.";
  }
}

const TIME_OF_DAY = {
  day: "de dia",
  night: "à noite",
  dusk: "ao entardecer",
};

// Descreve UMA forma de evoluir (ex: "Nível 16", "Usar Pedra do Trovão").
function describeEvolutionDetail(d) {
  const trigger = d.trigger?.name;
  let main;

  if (trigger === "use-item") {
    main = d.item ? `Usar ${translateItem(d.item.name)}` : "Usar item";
  } else if (trigger === "trade") {
    main = d.trade_species
      ? `Troca com ${humanize(d.trade_species.name)}`
      : "Troca";
  } else if (trigger === "level-up" || !trigger) {
    main = d.min_level ? `Nível ${d.min_level}` : "Subir de nível";
  } else {
    main = translateTrigger(trigger);
  }

  const extras = [];
  if (d.held_item) extras.push(`segurando ${translateItem(d.held_item.name)}`);
  if (d.min_happiness) extras.push(`felicidade ${d.min_happiness}+`);
  if (d.min_affection) extras.push(`afeição ${d.min_affection}+`);
  if (d.min_beauty) extras.push(`beleza ${d.min_beauty}+`);
  if (d.time_of_day) extras.push(TIME_OF_DAY[d.time_of_day] || d.time_of_day);
  if (d.known_move) extras.push(`sabendo ${translateMove(d.known_move.name)}`);
  if (d.known_move_type)
    extras.push(`sabendo golpe tipo ${translateType(d.known_move_type.name)}`);
  if (d.location) extras.push(`em ${humanize(d.location.name)}`);
  if (d.gender === 1) extras.push("fêmea");
  if (d.gender === 2) extras.push("macho");
  if (d.needs_overworld_rain) extras.push("com chuva");
  if (d.party_species) extras.push(`com ${humanize(d.party_species.name)} no time`);
  if (d.party_type)
    extras.push(`com Pokémon tipo ${translateType(d.party_type.name)} no time`);
  if (d.turn_upside_down) extras.push("com o console de cabeça para baixo");
  if (d.relative_physical_stats === 1) extras.push("Ataque > Defesa");
  if (d.relative_physical_stats === -1) extras.push("Ataque < Defesa");
  if (d.relative_physical_stats === 0) extras.push("Ataque = Defesa");

  return extras.length ? `${main} (${extras.join(", ")})` : main;
}

// Junta todas as formas possíveis de chegar naquele Pokémon.
function formatEvolutionCondition(details) {
  if (!details || details.length === 0) return null; // primeiro estágio
  const texts = details.map(describeEvolutionDetail);
  return [...new Set(texts)].join(" ou ");
}

// Transforma a árvore de evolução da API numa lista de "estágios"
// (cada estágio é uma lista, pois alguns Pokémons têm mais de uma
// evolução possível, como o Eevee). Cada item guarda o nome e a
// condição para chegar nele a partir do estágio anterior.
function flattenEvolutionChain(node, depth = 0, stages = []) {
  if (!stages[depth]) stages[depth] = [];
  stages[depth].push({
    name: node.species.name,
    condition: formatEvolutionCondition(node.evolution_details),
  });

  node.evolves_to.forEach((child) => flattenEvolutionChain(child, depth + 1, stages));

  return stages;
}

// Busca a linha evolutiva completa de um Pokémon, já com imagem e condição de cada estágio.
export async function getEvolutionChain(pokemonName) {
  const speciesResponse = await api.get(`/pokemon-species/${pokemonName}`);
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

  const evolutionResponse = await api.get(evolutionChainUrl);
  const stages = flattenEvolutionChain(evolutionResponse.data.chain);

  const stagesWithImages = await Promise.all(
    stages.map((stageNodes) =>
      Promise.all(
        stageNodes.map(async ({ name, condition }) => {
          try {
            const res = await api.get(`/pokemon/${name}`);
            const d = res.data;
            return {
              name: d.name,
              condition,
              image:
                d.sprites?.other?.["official-artwork"]?.front_default ||
                d.sprites?.front_default,
            };
          } catch (error) {
            return { name, condition, image: null };
          }
        })
      )
    )
  );

  return stagesWithImages;
}

export default api;