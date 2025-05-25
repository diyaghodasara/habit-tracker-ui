// src/components/layout/Layout.js
import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import ThemeSwitcher from './ThemeSwitcher';
// import Footer from './Footer'; // Optional

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({theme}) => theme.body};
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex; /* Added to allow PageWrapper to also grow if needed */
  flex-direction: column; /* Added */
`;

function Layout({ children }) {
    return (
        <AppContainer>
            <ThemeSwitcher />
            <NavBar />
            <MainContent>{children}</MainContent>
            {/* <Footer /> */}
        </AppContainer>
    );
}

export default Layout;