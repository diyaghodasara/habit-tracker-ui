// src/contexts/ThemeContext.js
import React, { useState, createContext, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // We only need ThemeProvider here
import { useAuth } from './AuthContext';
import * as themesObject from '../styles/theme'; // Import all themes

// Context for the current theme NAME (e.g., "light", "dark")
const ThemeNameContext = createContext();
// Context for the function to UPDATE the theme
const ThemeUpdateContext = createContext();
// Context for the current THEME OBJECT
const FullThemeObjectContext = createContext();

const availableThemes = {
    light: themesObject.lightTheme,
    dark: themesObject.darkTheme,
    ocean: themesObject.oceanTheme,
    forest: themesObject.forestTheme,
    minimalist: themesObject.minimalistTheme,
    highContrast: themesObject.highContrastTheme,
};

export function ThemeProvider({ children }) {
    const [currentThemeName, setCurrentThemeName] = useState('light'); // Default theme name
    const { user, isAuthenticated, loading: authLoading, updateUserContext } = useAuth();

    // Determine initial theme name based on auth status, user preference, or localStorage
    useEffect(() => {
        let initialThemeName = 'light'; // Ultimate fallback
        if (!authLoading) {
            if (isAuthenticated && user?.themePreference && availableThemes[user.themePreference]) {
                initialThemeName = user.themePreference;
            } else {
                const storedTheme = localStorage.getItem('themePreference');
                if (storedTheme && availableThemes[storedTheme]) {
                    initialThemeName = storedTheme;
                }
            }
        }
        // Set the theme name only if it's different to avoid unnecessary re-renders
        if (initialThemeName !== currentThemeName) {
            setCurrentThemeName(initialThemeName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, user, authLoading]); // currentThemeName removed from deps to avoid loop on init


    const toggleTheme = async (newThemeName) => {
        if (availableThemes[newThemeName]) {
            setCurrentThemeName(newThemeName);
            localStorage.setItem('themePreference', newThemeName);

            if (isAuthenticated && user) {
                // --- TODO: API call to save theme preference to user's backend profile ---
                console.log(`Theme changed to ${newThemeName}. User: ${user.id}. TODO: Save to backend.`);
                updateUserContext({ themePreference: newThemeName }); // Optimistic update
            }
        } else {
            console.warn(`Theme "${newThemeName}" not found. Reverting to 'light'.`);
            setCurrentThemeName('light');
            localStorage.setItem('themePreference', 'light');
        }
    };

    // Get the actual theme object based on the currentThemeName
    const currentThemeObject = availableThemes[currentThemeName] || availableThemes.light;

    return (
        <StyledThemeProvider theme={currentThemeObject}> {/* This provides theme to styled-components */}
            <ThemeNameContext.Provider value={currentThemeName}>
                <FullThemeObjectContext.Provider value={currentThemeObject}> {/* Provide the object */}
                    <ThemeUpdateContext.Provider value={toggleTheme}>
                        {children}
                    </ThemeUpdateContext.Provider>
                </FullThemeObjectContext.Provider>
            </ThemeNameContext.Provider>
        </StyledThemeProvider>
    );
}

// Hook to get the current theme NAME
export function useThemeName() {
    const context = useContext(ThemeNameContext);
    if (context === undefined) {
        throw new Error('useThemeName must be used within a ThemeProvider');
    }
    return context;
}

// Hook to get the current THEME OBJECT
export function useTheme() {
    const context = useContext(FullThemeObjectContext);
    if (context === undefined) {
        throw new Error('useTheme (for theme object) must be used within a ThemeProvider');
    }
    return context;
}

// Hook to get the theme UPDATE function
export function useThemeUpdate() {
    const context = useContext(ThemeUpdateContext);
    if (context === undefined) {
        throw new Error('useThemeUpdate must be used within a ThemeProvider');
    }
    return context;
}