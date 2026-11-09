const compositions = [
  {
    id: 1,
    name: "Dominio arcano",
    category: "DAÑO MÁGICO",
    cost: "Variable",
    difficulty: "Intermedia",
    difficultyLevel: "medium",
    description:
      "Una estrategia centrada en unidades que infligen daño mágico y aprovechan sus habilidades.",
    traits: ["Magos", "Control", "Daño mágico"],
    color: "purple",
    icon: "✦",
  },
  {
    id: 2,
    name: "Fuerza imparable",
    category: "COMBATE",
    cost: "Variable",
    difficulty: "Fácil",
    difficultyLevel: "easy",
    description:
      "Una composición enfocada en unidades resistentes que pueden mantenerse en combate.",
    traits: ["Vanguardia", "Resistencia", "Primera línea"],
    color: "orange",
    icon: "★",
  },
  {
    id: 3,
    name: "Ataque preciso",
    category: "DAÑO FÍSICO",
    cost: "Variable",
    difficulty: "Avanzada",
    difficultyLevel: "hard",
    description:
      "Una estrategia que busca eliminar objetivos importantes mediante daño físico.",
    traits: ["Retaguardia", "Ataque", "Posicionamiento"],
    color: "blue",
    icon: "➤",
  },
];

export default compositions;