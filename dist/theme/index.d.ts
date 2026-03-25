import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type Theme = "light" | "dark";
interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}
declare function ThemeProvider({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeContextValue;

export { ThemeProvider, useTheme };
