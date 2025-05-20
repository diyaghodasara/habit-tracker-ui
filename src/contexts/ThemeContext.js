import React, {useState, createContext, useContext} from 'react';
import themes from '../constants/ThemeConstants';

// Important: Import styled-components' ThemeProvider separately for internal use
import * as styledComponents from 'styled-components';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function ThemeProvider({children}) {
    const [currentThemeName, setCurrentThemeName] = useState('light'); // Default theme will be light

    // Function to toggle or set the theme by its name
    const toggleTheme = (newThemeName) => {
        // Basic validation to ensure the theme name exists
        if (themes[newThemeName]) {
            setCurrentThemeName(newThemeName);
        } else {
            console.warn(`Theme "${newThemeName}" not found. Falling back to default.`);
            setCurrentThemeName('light'); // Fallback
        }
    };


    const themeObject = themes[currentThemeName];

    return (

        <styledComponents.ThemeProvider theme={themeObject}>
            {}
            <ThemeContext.Provider value={currentThemeName}>
                <ThemeUpdateContext.Provider value={toggleTheme}>
                    {children}
                </ThemeUpdateContext.Provider>
            </ThemeContext.Provider>
        </styledComponents.ThemeProvider>);
}


export function useTheme() {
    return useContext(ThemeContext);
}


export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}