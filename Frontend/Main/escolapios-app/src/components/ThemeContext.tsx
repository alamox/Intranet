import React, { createContext, useState, FC , PropsWithChildren} from 'react';

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};