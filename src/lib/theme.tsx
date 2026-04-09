'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';
type Resolved = 'light' | 'dark';

interface ThemeCtx {
  theme: Theme;
  resolved: Resolved;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'system',
  resolved: 'light',
  setTheme: () => {},
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function getSystemPref(): Resolved {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function apply(resolved: Resolved) {
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeRaw] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('benefind-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      setThemeRaw(saved);
    }
    setMounted(true);
  }, []);

  const resolved: Resolved = theme === 'system' ? getSystemPref() : theme;

  useEffect(() => {
    if (!mounted) return;
    apply(resolved);
    localStorage.setItem('benefind-theme', theme);
  }, [theme, resolved, mounted]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => apply(getSystemPref());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeRaw(t), []);
  const toggle = useCallback(() => {
    setThemeRaw((prev) => {
      const current = prev === 'system' ? getSystemPref() : prev;
      return current === 'dark' ? 'light' : 'dark';
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
