// src/components/layout/ThemeSwitcher.js
import React from 'react';
import styled from 'styled-components';
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
// import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi'; // Example icons for theme toggle

const SwitcherWrapper = styled.div`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  height: 45px; /* Fixed height */

  label, span {
    font-size: 0.9rem;
  }

  select {
    padding: 6px 10px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    cursor: pointer;
    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

const UserInfo = styled.span`
  margin-right: auto; // Pushes other items to the right
  font-weight: 500;
`;

function ThemeSwitcher() {
    const currentThemeName = useTheme();
    const toggleTheme = useThemeUpdate();
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleThemeChange = (event) => {
        const newTheme = event.target.value;
        toggleTheme(newTheme);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <SwitcherWrapper>
            {isAuthenticated && user && <UserInfo>Welcome, {user.name}!</UserInfo>}
            {/* <button onClick={() => toggleTheme(currentThemeName === 'light' ? 'dark' : 'light')}>
                {currentThemeName === 'light' ? <FiMoon/> : <FiSun/>}
            </button> */}
            <label htmlFor="theme-select">Theme:</label>
            <select id="theme-select" value={currentThemeName} onChange={handleThemeChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="ocean">Ocean</option>
                <option value="forest">Forest</option>
                <option value="minimalist">Minimalist</option>
                <option value="highContrast">High Contrast</option>
            </select>
            {isAuthenticated && (
                <Button variant="ghost" onClick={handleLogout} style={{ padding: '6px 10px', fontSize: '0.9rem' }}>
                    {/* <FiLogOut style={{marginRight: '5px'}}/> */}
                    Log Out
                </Button>
            )}
        </SwitcherWrapper>
    );
}

export default ThemeSwitcher;