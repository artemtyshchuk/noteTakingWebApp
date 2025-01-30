import { ColorModeButton } from "./ColorModeButton";
import styles from "./ColorTheme.module.scss";
import sunIcon from "assets/images/icon-sun.svg";
import moonIcon from "assets/images/icon-moon.svg";
import systemThemeIcon from "assets/images/icon-system-theme.svg";
import { ColorMode, ThemeType } from "types/types";
import { useEffect, useState } from "react";

const colorModes: ColorMode[] = [
  {
    icon: sunIcon,
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
  },
  {
    icon: moonIcon,
    title: "Dark Mode",
    description: "Pick a clean and classic dark theme",
  },
  {
    icon: systemThemeIcon,
    title: "System",
    description: "Follow system theme",
  },
];

interface ColorThemeProps {
  selectedTheme: ThemeType;
  setSelectedTheme: (theme: ThemeType) => void;
}

export const ColorTheme = ({
  selectedTheme,
  setSelectedTheme,
}: ColorThemeProps) => {
  return (
    <div className={styles.colorTheme}>
      <p className={styles.colorThemeTitle}>Color Theme</p>
      <p className={styles.colorThemeDescription}>Choose your color theme:</p>

      <div className={styles.themeButtonsContainer}>
        {colorModes.map((item) => (
          <ColorModeButton
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            value={item.title}
            checked={selectedTheme === item.title}
            onChange={() => setSelectedTheme(item.title)}
          />
        ))}
      </div>
    </div>
  );
};
