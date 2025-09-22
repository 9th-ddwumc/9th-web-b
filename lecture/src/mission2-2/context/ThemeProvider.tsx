import { createContext, PropsWithChildren, useContext, useState } from "react";

// enum THEME {
//   LIGHT = "LIGHT",
//   DARK = "DARK",
// }

// type TTheme = THEME.LIGHT | THEME.DARK;

type THEME = "LIGHT" | "DARK";

interface IThemeContext {
  theme: THEME;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<THEME>("LIGHT");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "LIGHT" ? "DARK" : "LIGHT"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
