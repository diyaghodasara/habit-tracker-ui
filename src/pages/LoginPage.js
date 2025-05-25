// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import { Heading1, Paragraph, SmallText } from '../components/common/Typography';
import PageWrapper from '../components/common/PageWrapper';
import Card from '../components/common/Card';

const LoginFormCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Spacing between elements in form */
`;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            // --- TODO: API Call for actual login ---
            // const response = await authService.login(email, password);
            // await login(email, password, response.userProfile); // Pass actual user profile from backend

            // Simulated login with a comprehensive user object
            const simulatedUserData = {
                name: "Demo User LoggedIn",
                email: email,
                themePreference: "dark", // Example default
                dob: "1992-05-15",
                gender: "Male",
                location: "New York, NY",
                goalsInterests: "Learning React, Hiking",
                occupation: "Software Engineer"
            };
            const success = await login(email, password, simulatedUserData);

            if (!success) { // Should not happen with simulation unless login itself fails
                setError("Login failed. Please check your credentials.");
            }
            // Redirection is handled by useEffect
        } catch (err) {
            // setError(err.message || "Login failed. Please try again.");
            setError("Simulated Login Failed. Please check credentials."); // For simulation
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAuthenticated) { // Should be caught by useEffect, but good for safety
        return null;
    }

    return (
        <PageWrapper style={{justifyContent: 'center'}}>
            <LoginFormCard>
                <Heading1 style={{ textAlign: 'center' }}>Login</Heading1>
                <Paragraph light style={{ textAlign: 'center', marginBottom: '25px' }}>
                    Welcome back! Please enter your details.
                </Paragraph>
                {error && <Paragraph style={{ color: 'red', textAlign: 'center' }}>{error}</Paragraph>}
                <Form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" disabled={isSubmitting} style={{marginTop: '10px', width: '100%'}}>
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>
                </Form>
                <SmallText style={{ textAlign: 'center', marginTop: '20px' }}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </SmallText>
            </LoginFormCard>
        </PageWrapper>
    );
}

export default LoginPage;