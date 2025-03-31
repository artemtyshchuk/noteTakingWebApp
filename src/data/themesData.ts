
import { DesignModeTypes } from "types/types";

export const colorModes: DesignModeTypes[] = [
  {
    icon: 'sunIcon',
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
  },
  {
    icon: 'moonIcon',
    title: "Dark Mode",
    description: "Pick a clean and classic dark theme",
  },
  {
    icon: 'systemThemeIcon',
    title: "System",
    description: "Follow system theme",
  },
];

export const fontModes: DesignModeTypes[] = [
  {
    icon: 'sansSerifIcon',
    title: "Sans-serif",
    description: "Clean and modern, easy to read.",
  },
  {
    icon: 'serifIcon',
    title: "Serif",
    description: "Classic and elegant for a timeless feel.",
  },
  {
    icon: 'monospaceIcon',
    title: "Monospace",
    description: "Code-like, great for a technical vibe.",
  },
];
