
import { beginnerTutorials } from "./tutorial/beginner";
import { intermediateTutorials } from "./tutorial/intermediate";
import { advancedTutorials } from "./tutorial/advanced";

export const tutorialLevels = [
  {
    id: "beginner",
    title: "Principiante",
    subtitle: "Aprende las bases del juego desde cero",
    color: "orange",
    icon: "I",
  },
  {
    id: "intermediate",
    title: "Intermedio",
    subtitle: "Perfecciona tu toma de decisiones",
    color: "blue",
    icon: "II",
  },
  {
    id: "advanced",
    title: "Avanzado",
    subtitle: "Domina los detalles que marcan la diferencia",
    color: "purple",
    icon: "III",
  },
];

export const tutorials = [
  ...beginnerTutorials,
  ...intermediateTutorials,
  ...advancedTutorials,
];
