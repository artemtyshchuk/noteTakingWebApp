import { createContext, ReactNode, useMemo, useState } from "react";
import { FontType } from "types/types";

interface FontContextType {
  selectedTheme: FontType;
  setSelectedTheme: (theme: FontType) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

const FontProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<FontType>("Sans-serif");

  const contextValue = useMemo(() => {
    return {
      selectedTheme,
      setSelectedTheme,
    };
  }, [selectedTheme]);

  return (
    <FontContext.Provider value={contextValue}>{children}</FontContext.Provider>
  );
};

export { FontContext, FontProvider };
