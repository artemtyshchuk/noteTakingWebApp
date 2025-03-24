import { useContext } from "react";
import { ThemeContext } from "components/Settings/context/ThemeContext";
import { SettingThemes } from "../SettingThems";
import { colorModes } from "../../../data/themesData";
import { ThemeType } from "types/types";

export const ColorThemeWrapper = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  return (
    <SettingThemes<ThemeType>
      settingThemesTitle="Color Theme"
      settingThemesDescription="Choose your color theme:"
      colorModes={colorModes}
      {...themeContext}
    />
  );
};
