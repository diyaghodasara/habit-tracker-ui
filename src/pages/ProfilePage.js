// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import { Heading1, Heading2, Paragraph, Strong } from '../components/common/Typography';
import PageWrapper from '../components/common/PageWrapper';
// import profileService from '../services/profileService'; // You'll create this

const ProfileCard = styled(Card)`
  max-width: 600px;
  width: 100%;
  margin-top: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 20px; /* Column gap */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: flex-start;
`;

function ProfilePage() {
    const { user, authToken, updateUserContext } = useAuth();
    const currentThemeName = useTheme(); // Theme from ThemeContext
    const toggleTheme = useThemeUpdate(); // Function to update theme in ThemeContext & potentially backend

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', dob: '', gender: '', location: '',
        goalsInterests: '', occupation: '', themePreference: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                dob: user.dob || '',
                gender: user.gender || '',
                location: user.location || '',
                goalsInterests: user.goalsInterests || '',
                occupation: user.occupation || '',
                themePreference: user.themePreference || currentThemeName,
            });
        }
    }, [user, currentThemeName]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'themePreference') { // If theme is changed directly in form
            toggleTheme(value); // Update theme context immediately
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!authToken) return;
        setIsSubmitting(true);
        setMessage({text: '', type: ''});
        try {
            // --- TODO: Replace with actual API call ---
            // const updatedProfileData = await profileService.updateProfile(authToken, formData);
            // updateUserContext(updatedProfileData); // Update AuthContext with data from backend

            // Simulated update:
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            updateUserContext(formData); // Update context with form data

            setMessage({text: 'Profile updated successfully!', type: 'success'});
            setIsEditing(false);
        } catch (error) {
            setMessage({text: 'Failed to update profile: ' + (error.message || 'Please try again.'), type: 'error'});
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return <PageWrapper style={{justifyContent: 'center'}}><Paragraph>Loading profile...</Paragraph></PageWrapper>;
    }

    const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'non-binary', label: 'Non-binary' },
        { value: 'other', label: 'Other' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' },
    ];
    const themeOptions = [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "ocean", label: "Ocean" },
        { value: "forest", label: "Forest" },
        { value: "minimalist", label: "Minimalist" },
        { value: "highContrast", label: "High Contrast" },
    ];


    return (
        <PageWrapper>
            <Heading1 style={{textAlign: 'center'}}>User Profile</Heading1>
            <ProfileCard>
                {message.text && (
                    <Paragraph style={{ color: message.type === 'success' ? 'green' : 'red', textAlign: 'center' }}>
                        {message.text}
                    </Paragraph>
                )}
                {!isEditing ? (
                    <>
                        <Heading2>Your Details</Heading2>
                        <Paragraph>Name: <Strong>{user.name || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Email: <Strong>{user.email || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Date of Birth: <Strong>{user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</Strong></Paragraph>
                        <Paragraph>Gender: <Strong>{user.gender || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Location: <Strong>{user.location || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Goals/Interests: <Strong>{user.goalsInterests || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Occupation: <Strong>{user.occupation || 'N/A'}</Strong></Paragraph>
                        <Paragraph>Current Theme: <Strong>{user.themePreference || currentThemeName}</Strong></Paragraph>
                        <Button onClick={() => setIsEditing(true)} style={{ marginTop: '30px' }}>
                            Edit Profile
                        </Button>
                    </>
                ) : (
                    <form onSubmit={handleProfileUpdate}>
                        <Heading2>Edit Your Details</Heading2>
                        <FormGrid>
                            <InputField label="Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required fullWidth/>
                            <InputField label="Email" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required fullWidth/>
                            <InputField label="Date of Birth" id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} fullWidth/>
                            <InputField label="Gender" id="gender" name="gender" type="select" options={genderOptions} value={formData.gender} onChange={handleInputChange} fullWidth/>
                            <InputField label="Location" id="location" name="location" placeholder="e.g., City, Country" value={formData.location} onChange={handleInputChange} fullWidth/>
                            <InputField label="Occupation" id="occupation" name="occupation" placeholder="e.g., Software Developer" value={formData.occupation} onChange={handleInputChange} fullWidth/>
                            <InputField label="Goals/Interests" id="goalsInterests" name="goalsInterests" type="textarea" placeholder="e.g., Fitness, Reading, Coding" value={formData.goalsInterests} onChange={handleInputChange} style={{minHeight: '80px'}} fullWidth/>
                            <InputField label="Theme Preference" id="themePreference" name="themePreference" type="select" options={themeOptions} value={formData.themePreference} onChange={handleInputChange} fullWidth/>
                        </FormGrid>
                        <ButtonGroup>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => { setIsEditing(false); setMessage({text:'', type:''}); }}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </form>
                )}
            </ProfileCard>
        </PageWrapper>
    );
}

export default ProfilePage;