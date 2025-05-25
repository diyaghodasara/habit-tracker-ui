// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
                 Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
    line-height: 1.3;
  }

  input, button, select, textarea {
    font-family: inherit;
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
  }

  button {
    cursor: pointer;
  }

  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.focusOutline || theme.primary};
    outline-offset: 2px;
  }

  /* Custom scrollbar for a more modern look (optional) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondary};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondaryHover};
  }
`;

export default GlobalStyle;