// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageWrapper from './common/PageWrapper'; // For loading state
import { Paragraph } from './common/Typography'; // For loading state

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <PageWrapper><Paragraph>Loading authentication...</Paragraph></PageWrapper>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;