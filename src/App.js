import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components'; // We'll use this for basic layout for now

// Placeholder components for our pages
// We'll create actual files for these later in the 'pages' directory
const HomePage = () => <PageWrapper><h1>Welcome to Habit Tracker!</h1><p>Navigate using the links above.</p></PageWrapper>;
const DashboardPage = () => <PageWrapper><h1>Dashboard</h1><p>Your habits will appear here.</p></PageWrapper>;
const ProfilePage = () => <PageWrapper><h1>Profile</h1><p>Manage your user details here.</p></PageWrapper>;
const LoginPage = () => <PageWrapper><h1>Login</h1><p>Log in to your account.</p></PageWrapper>;
const SignupPage = () => <PageWrapper><h1>Sign Up</h1><p>Create a new account.</p></PageWrapper>;
const NotFoundPage = () => <PageWrapper><h1>404 - Page Not Found</h1><p>Oops! The page you're looking for doesn't exist.</p></PageWrapper>;


// Simple styled component for page wrapping and basic layout
const PageWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const NavBar = styled.nav`
  background-color: #333;
  padding: 10px 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  li {
    margin: 0 15px;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function App() {
  return (
      <Router>
        <NavBar>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for undefined routes */}
        </Routes>
      </Router>
  );
}

export default App;