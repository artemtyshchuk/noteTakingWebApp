import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { ThemeType } from "types/types";

interface ThemeContextType {
  selectedTheme: ThemeType;
  setSelectedTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (
      savedTheme === "Light Mode" ||
      savedTheme === "Dark Mode" ||
      savedTheme === "System"
    ) {
      return savedTheme as ThemeType;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    return mediaQuery.matches ? "Dark Mode" : "Light Mode";
  };

  const [selectedTheme, setSelectedTheme] =
    useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    const applyTheme = (theme: "Light Mode" | "Dark Mode") => {
      document.documentElement.setAttribute("data-theme", theme);
    };

    if (selectedTheme === "System") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const newTheme = mediaQuery.matches ? "Dark Mode" : "Light Mode";
      applyTheme(newTheme);

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const updatedTheme = e.matches ? "Dark Mode" : "Light Mode";
        applyTheme(updatedTheme);
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    } else {
      applyTheme(selectedTheme);
    }

    localStorage.setItem("selectedTheme", selectedTheme);
  }, [selectedTheme]);

  const contextValue = useMemo(
    () => ({ selectedTheme, setSelectedTheme }),
    [selectedTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
