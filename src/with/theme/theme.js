import React, { useContext, useState } from 'react';

const ThemeDefinitions = require('./themes.json');


export type ThemePropTypes = {
  backgroundColor?: string,
  color?: string,
  secondaryColor?: string,
  secondaryBackgroundColor?: string
	}

  
export type ThemeProviderTypes = {
  themeID?: number,
  setThemeID?: any
    }
  

const themes = ThemeDefinitions;
const theme = ThemeDefinitions[0];

const ThemeContext = React.createContext({
  backgroundColor: "#fff",
  color: "#000",
  secondaryColor: "#fff",
  secondaryBackgroundColor: "#000"
} as ThemeProviderTypes);


export const ThemeContextProvider = ({ children }) => {
	const [themeID, setThemeID] = useState(ThemeDefinitions[0].key);

	
  return (
    <ThemeContext.Provider value={{ themeID, setThemeID }}>
      {children}
    </ThemeContext.Provider>
  );
};


export function withTheme(Component) {
  return React.forwardRef((props: any,ref) => {
    const { themeID, setThemeID } = useContext(ThemeContext);

    const getTheme = themeID => ThemeDefinitions.find(theme => theme.key === themeID);
    const setTheme = themeID => setThemeID(themeID);

    return (
      <Component
        {...props}
        ref={ref}
        themes={ThemeDefinitions}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  })
}