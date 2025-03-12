import { ColorTheme } from "components/ColorTheme/ColorTheme";
import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";

export const ColorThemeWrapper = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  return <ColorTheme {...themeContext} />;
};
