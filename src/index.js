// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import our custom ThemeProvider
import { ThemeProvider } from './contexts/ThemeContext';
// Import our new AuthProvider
import { AuthProvider } from './contexts/AuthContext';
// Import our GlobalStyle component for universal CSS
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        {/* AuthProvider should wrap ThemeProvider if theme preference is driven by user data */}
        <AuthProvider>
            <ThemeProvider>
                <GlobalStyle />
                <App /> {/* App is our main application component with routing */}
            </ThemeProvider>
        </AuthProvider>
    </React.StrictMode>
);