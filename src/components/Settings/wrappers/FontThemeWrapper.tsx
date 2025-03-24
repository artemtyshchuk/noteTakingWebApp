import { useContext, useEffect } from "react";
import { SettingThemes } from "../SettingThems";
import { fontModes } from "../../../data/themesData";
import { FontType } from "types/types";
import { FontContext } from "../context/FontContext";

export const FontThemeWrapper = () => {
  const themeContext = useContext(FontContext);

  if (!themeContext) {
    return null;
  }

  let fontClass = "";

  switch (themeContext.selectedTheme) {
    case "Sans-serif":
      fontClass = "sans-serif";
      break;
    case "Serif":
      fontClass = "serif";
      break;
    case "Monospace":
      fontClass = "monospace";
      break;
    default:
      fontClass = "sans-serif";
  }

  useEffect(() => {
    document.body.classList.remove("sans-serif", "serif", "monospace");
    document.body.classList.add(fontClass);
  }, [fontClass]);

  return (
    <SettingThemes<FontType>
      settingThemesTitle="Font Theme"
      settingThemesDescription="Choose your font theme:"
      colorModes={fontModes}
      {...themeContext}
    />
  );
};
