// src/pages/NotFoundPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Heading1, Paragraph } from '../components/common/Typography';
import PageWrapper from '../components/common/PageWrapper';
// import { FiAlertTriangle } from 'react-icons/fi';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <PageWrapper style={{ textAlign: 'center', justifyContent: 'center' }}>
            {/* <FiAlertTriangle size="3em" style={{ color: (theme) => theme.warning, marginBottom: '20px' }} /> */}
            <Heading1>404 - Page Not Found</Heading1>
            <Paragraph light>Oops! The page you're looking for doesn't exist or may have been moved.</Paragraph>
            <Button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                Go to Home
            </Button>
        </PageWrapper>
    );
}

export default NotFoundPage;