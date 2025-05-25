// src/pages/SignupPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import { Heading1, Paragraph, SmallText } from '../components/common/Typography';
import PageWrapper from '../components/common/PageWrapper';
import Card from '../components/common/Card';

const SignupFormCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 30px;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth(); // Using login for immediate sign-in after signup
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            // --- TODO: API Call for actual signup ---
            // const response = await authService.signup({ name, email, password });
            // await login(email, password, response.userProfile); // Login with data from signup response

            // Simulated signup then immediate login
            const simulatedNewUserData = {
                name: name,
                email: email,
                themePreference: "ocean", // Example default for new users
                dob: "", // New users will fill this in profile
                gender: "",
                location: "",
                goalsInterests: "",
                occupation: ""
            };
            const success = await login(email, password, simulatedNewUserData);

            if (!success) {
                setError("Signup failed. Please try again.");
            }
            // Redirection handled by useEffect
        } catch (err) {
            // setError(err.message || "Signup failed. Please try again.");
            setError("Simulated Signup Failed. Please try again."); // For simulation
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAuthenticated) {
        return null;
    }

    return (
        <PageWrapper style={{justifyContent: 'center'}}>
            <SignupFormCard>
                <Heading1 style={{ textAlign: 'center' }}>Sign Up</Heading1>
                <Paragraph light style={{ textAlign: 'center', marginBottom: '25px' }}>
                    Create your account to start tracking habits.
                </Paragraph>
                {error && <Paragraph style={{ color: 'red', textAlign: 'center' }}>{error}</Paragraph>}
                <Form onSubmit={handleSubmit}>
                    <InputField
                        label="Full Name"
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />
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
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <InputField
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="secondary" disabled={isSubmitting} style={{marginTop: '10px', width: '100%'}}>
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                </Form>
                <SmallText style={{ textAlign: 'center', marginTop: '20px' }}>
                    Already have an account? <Link to="/login">Log In</Link>
                </SmallText>
            </SignupFormCard>
        </PageWrapper>
    );
}

export default SignupPage;