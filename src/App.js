// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

import { useAuth } from './contexts/AuthContext';
import { Heading2 } from './components/common/Typography';
import PageWrapper from './components/common/PageWrapper'; // For loading screen

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
// import AddHabitPage from './pages/AddHabitPage'; // Future: if you make it a separate page

function App() {
    const { loading } = useAuth();

    if (loading) {
        return (
            // Basic loading screen, can be styled further
            <PageWrapper style={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Heading2>Loading Application...</Heading2>
            </PageWrapper>
        );
    }

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    {/* <Route path="/add-habit" element={ // Future: if AddHabit is a page
                        <ProtectedRoute>
                            <AddHabitPage />
                        </ProtectedRoute>
                    } /> */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;