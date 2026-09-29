// Traduções fixas (inglês -> português) usadas nas telas e na linha evolutiva.
// Quando um nome não está na lista, cai no texto original sem hífens.

export const humanize = (text) => (text || "").replace(/-/g, " ");

const TYPES = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
  stellar: "Estelar",
  unknown: "Desconhecido",
};

const STATS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Esp.",
  "special-defense": "Defesa Esp.",
  speed: "Velocidade",
};

const ITEMS = {
  "fire-stone": "Pedra do Fogo",
  "water-stone": "Pedra da Água",
  "thunder-stone": "Pedra do Trovão",
  "leaf-stone": "Pedra da Folha",
  "moon-stone": "Pedra da Lua",
  "sun-stone": "Pedra do Sol",
  "shiny-stone": "Pedra Brilhante",
  "dusk-stone": "Pedra do Crepúsculo",
  "dawn-stone": "Pedra da Alvorada",
  "ice-stone": "Pedra de Gelo",
  "oval-stone": "Pedra Oval",
  "kings-rock": "Pedra do Rei",
  "metal-coat": "Revestimento Metálico",
  "dragon-scale": "Escama de Dragão",
  "up-grade": "Up-Grade",
  "dubious-disc": "Disco Duvidoso",
  protector: "Protetor",
  electirizer: "Eletrizador",
  magmarizer: "Magmatizador",
  "reaper-cloth": "Manto Ceifador",
  "razor-claw": "Garra Afiada",
  "razor-fang": "Presa Afiada",
  "deep-sea-tooth": "Dente do Mar Profundo",
  "deep-sea-scale": "Escama do Mar Profundo",
  "prism-scale": "Escama Prisma",
  sachet: "Sachê",
  "whipped-dream": "Chantilly dos Sonhos",
  "tart-apple": "Maçã Azeda",
  "sweet-apple": "Maçã Doce",
  "syrupy-apple": "Maçã Xaroposa",
  "cracked-pot": "Pote Rachado",
  "chipped-pot": "Pote Lascado",
  "black-augurite": "Augurita Negra",
  "peat-block": "Bloco de Turfa",
  "galarica-cuff": "Pulseira Galárica",
  "galarica-wreath": "Coroa Galárica",
  "auspicious-armor": "Armadura Auspiciosa",
  "malicious-armor": "Armadura Maliciosa",
  "scroll-of-darkness": "Pergaminho das Trevas",
  "scroll-of-waters": "Pergaminho das Águas",
  "metal-alloy": "Liga Metálica",
  "unremarkable-teacup": "Xícara Comum",
  "masterpiece-teacup": "Xícara Obra-Prima",
  "leaders-crest": "Brasão do Líder",
  "linking-cord": "Cabo de Ligação",
};

const MOVES = {
  mimic: "Imitar",
  "ancient-power": "Poder Ancestral",
  rollout: "Rolagem",
  stomp: "Pisotear",
  "double-hit": "Golpe Duplo",
  "dragon-pulse": "Pulso do Dragão",
  taunt: "Provocar",
};

const TRIGGERS = {
  shed: "Espaço no time e uma Pokébola",
  spin: "Girar",
  "tower-of-darkness": "Torre das Trevas",
  "tower-of-waters": "Torre das Águas",
  "three-critical-hits": "3 acertos críticos em uma batalha",
  "take-damage": "Sofrer dano",
  "agile-style-move": "Usar golpe ágil 20 vezes",
  "strong-style-move": "Usar golpe forte 20 vezes",
  "recoil-damage": "Sofrer dano de recuo",
  other: "Condição especial",
};

export const translateType = (name) => TYPES[name] || humanize(name);
export const translateStat = (name) => STATS[name] || humanize(name);
export const translateItem = (name) => ITEMS[name] || humanize(name);
export const translateMove = (name) => MOVES[name] || humanize(name);
export const translateTrigger = (name) => TRIGGERS[name] || humanize(name);