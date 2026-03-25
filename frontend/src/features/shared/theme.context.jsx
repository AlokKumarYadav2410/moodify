import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  const [moodTheme, setMoodTheme] = useState(null);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (moodTheme) {
      document.documentElement.setAttribute("data-mood", moodTheme);
    } else {
      document.documentElement.removeAttribute("data-mood");
    }
  }, [moodTheme]);

  const themeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const applyMoodTheme = (mood) => {
    setMoodTheme(mood);
  };

  const clearMoodTheme = () => {
    setMoodTheme(null);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, moodTheme, themeToggle, applyMoodTheme, clearMoodTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
