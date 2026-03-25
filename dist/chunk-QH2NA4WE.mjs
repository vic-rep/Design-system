import { createContext, useState, useEffect, useContext } from 'react';
import { jsx, Fragment } from 'react/jsx-runtime';

var ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {
  },
  isDark: false
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("trusti-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("trusti-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };
  if (!mounted) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme, isDark: theme === "dark" }, children });
}
function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
