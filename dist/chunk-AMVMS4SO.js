'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

var ThemeContext = react.createContext({
  theme: "light",
  toggleTheme: () => {
  },
  isDark: false
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = react.useState("light");
  const [mounted, setMounted] = react.useState(false);
  react.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value: { theme, toggleTheme, isDark: theme === "dark" }, children });
}
function useTheme() {
  return react.useContext(ThemeContext);
}

exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
