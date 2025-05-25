// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setAuthToken(storedToken);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse stored user data:", error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password, userDataFromBackend) => {
        // --- TODO: Replace with actual API call to backend ---
        // Example: const response = await authService.login(email, password);
        // const { token, userProfile } = response;
        // For simulation, we use userDataFromBackend which would be the response.userProfile
        // Ensure your backend returns a comprehensive user object on login/signup

        let simulatedUserData = userDataFromBackend; // This comes from LoginPage/SignupPage simulation
        if (!simulatedUserData) { // Fallback if direct login (e.g. from refresh) is ever simulated
            simulatedUserData = {
                id: "user-" + Date.now(),
                name: "Demo User",
                email: email,
                themePreference: "light", // Default
                dob: "1990-01-01",
                gender: "Prefer not to say",
                location: "Anytown, USA",
                goalsInterests: "Fitness, Reading",
                occupation: "Developer"
            };
        }

        const simulatedToken = "fake-jwt-token-for-" + email + "-" + Date.now();

        setAuthToken(simulatedToken);
        setUser(simulatedUserData);
        localStorage.setItem('authToken', simulatedToken);
        localStorage.setItem('user', JSON.stringify(simulatedUserData));
        return true;
    };

    const updateUserContext = (updatedUserData) => {
        // Call this after a successful profile update API call
        setUser(prevUser => ({ ...prevUser, ...updatedUserData }));
        localStorage.setItem('user', JSON.stringify({ ...user, ...updatedUserData }));
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // --- TODO: Optionally, call a backend /logout endpoint ---
    };

    const authContextValue = {
        user,
        authToken,
        isAuthenticated: !!authToken,
        loading,
        login,
        logout,
        updateUserContext, // Expose this
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}