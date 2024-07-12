import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Theme,
  ThemeProviderContext,
  ThemeProviderContextProps,
} from "./ThemeProvider.context";

export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    children,
  } = props;

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const setThemeHandler = useCallback(
    (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    [storageKey]
  );

  const value = useMemo<ThemeProviderContextProps>(
    () => ({
      theme,
      setTheme: setThemeHandler,
    }),
    [setThemeHandler, theme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
