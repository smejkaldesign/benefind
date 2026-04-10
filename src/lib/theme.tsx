'use client';

import { createContext, useContext, type ReactNode } from 'react';

type Resolved = 'dark';

interface ThemeCtx {
  theme: 'dark';
  resolved: Resolved;
  setTheme: (t: string) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  resolved: 'dark',
  setTheme: () => {},
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider
      value={{
        theme: 'dark',
        resolved: 'dark',
        setTheme: () => {},
        toggle: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
