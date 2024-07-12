import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeProviderContext = createContext<ThemeProviderContextProps>({
  theme: "system",
  setTheme: () => null,
});

export const useThemeProviderContext = () => useContext(ThemeProviderContext);
