import React, { createContext, useState, useMemo } from 'react';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

const pastelPalette = {
  primary: '#6EC6FF', // light blue
  secondary: '#A5D6A7', // green
  background: '#FFFFFF',
  surface: '#F4F6F8',
  accent: '#F8E1A1', // beige
  error: '#FF8A65',
  text: '#222222',
  onPrimary: '#fff',
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const theme = useMemo(() => ({
    ...(dark ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(dark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      ...pastelPalette,
      background: dark ? '#181A20' : pastelPalette.background,
      surface: dark ? '#23242A' : pastelPalette.surface,
      text: dark ? '#F4F6F8' : pastelPalette.text,
    },
    roundness: 16,
  }), [dark]);

  const toggleTheme = () => setDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
