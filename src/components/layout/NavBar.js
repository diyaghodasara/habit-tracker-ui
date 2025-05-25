// src/components/layout/NavBar.js
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'; // Use NavLink for active styles
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
// import { FiHome, FiGrid, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const NavWrapper = styled.nav`
  background-color: ${({ theme }) => theme.surface};
  padding: 0 20px; /* Reduced vertical padding if ThemeSwitcher is separate */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  height: 60px; /* Fixed height */
  display: flex;
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center nav items if logo is not present */

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    height: 100%;
  }
`;

// Styled NavLink
const NavLink = styled(RouterNavLink)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
  border-bottom: 3px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-bottom-color: ${({ theme }) => theme.primary + '80'};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom-color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }

  svg {
    font-size: 1.2rem;
  }
`;


function NavBar() {
    const { isAuthenticated } = useAuth();

    return (
        <NavWrapper>
            {/* Optional: Add a Logo here to the left */}
            {/* <Logo to="/">MyApp</Logo> */}
            <ul>
                <li><NavLink to="/"> {/* <FiHome/> */} Home</NavLink></li>
                {isAuthenticated && (
                    <>
                        <li><NavLink to="/dashboard">{/* <FiGrid/> */} Dashboard</NavLink></li>
                        <li><NavLink to="/profile">{/* <FiUser/> */} Profile</NavLink></li>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <li><NavLink to="/login">{/* <FiLogIn/> */} Login</NavLink></li>
                        <li><NavLink to="/signup">{/* <FiUserPlus/> */} Sign Up</NavLink></li>
                    </>
                )}
            </ul>
        </NavWrapper>
    );
}

export default NavBar;