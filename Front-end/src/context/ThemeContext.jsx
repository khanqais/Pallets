import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Helper to check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

const ThemeContextProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Only access localStorage in browser environment (not during SSR)
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    // Default to dark mode
    return true;
  });

  // Update localStorage and document when theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
