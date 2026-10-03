import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_KEY = 'theme';
const DEFAULT_THEME = 'light';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function readInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (isTheme(stored)) return stored;
  } catch (e) {}
  // the inline script in index.html resolves saved/system theme onto <html>
  const rootAttr = document.documentElement.dataset.theme;
  if (isTheme(rootAttr)) return rootAttr;
  const bodyAttr = document.body.getAttribute('data-theme');
  return isTheme(bodyAttr) ? bodyAttr : DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(readInitialTheme);

  useLayoutEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
    document.documentElement.dataset.theme = theme;
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
