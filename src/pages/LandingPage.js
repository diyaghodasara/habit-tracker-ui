// src/pages/LandingPage.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Heading1, Heading2, Heading3, Paragraph, SmallText } from '../components/common/Typography';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import PageWrapper from '../components/common/PageWrapper'; // Use the common PageWrapper
// import { FiCalendar, FiBarChart2, FiAward, FiArrowRightCircle } from 'react-icons/fi'; // Example icons

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 20px;
  /* background: linear-gradient(135deg, ${({ theme }) => theme.primary}20, ${({ theme }) => theme.body} 80%); */
`;

const HeroHeading = styled(Heading1)`
  font-size: 2.8rem;
  margin-bottom: 0.5em;
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroParagraph = styled(Paragraph)`
  font-size: 1.1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5em;
  color: ${({theme}) => theme.textLighter};
`;

const CallToActionSection = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeaturesSection = styled.div`
  padding: 50px 20px;
  background-color: ${({ theme }) => theme.background}; /* Slightly different bg for section */
  width: 100%; /* Make section take full width within PageWrapper constraints */
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin: 40px auto;
  max-width: 1000px;
`;

const FeatureCardStyled = styled(Card)`
  padding: 30px 25px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.primary};
  }
`;

function LandingPage() {
    const navigate = useNavigate();

    return (
        <PageWrapper style={{ padding: '0' }}> {/* Remove PageWrapper padding if sections have their own */}
            <HeroSection>
                <HeroHeading>Build Lasting Habits. Achieve Your Goals.</HeroHeading>
                <HeroParagraph>
                    Your ultimate companion for tracking progress, staying motivated, and transforming your life one habit at a time.
                </HeroParagraph>
                <SmallText>Ready to start your journey?</SmallText>
                <CallToActionSection>
                    <Button onClick={() => navigate('/login')} size="large">Log In</Button>
                    <Button onClick={() => navigate('/signup')} variant="secondary" size="large">Sign Up</Button>
                </CallToActionSection>
            </HeroSection>

            <FeaturesSection>
                <Heading2 style={{ textAlign: 'center', marginBottom: '10px' }}>Key Features</Heading2>
                <Paragraph light style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px auto' }}>
                    Discover the tools that will empower you to build a better, more consistent you.
                </Paragraph>
                <FeatureGrid>
                    <FeatureCardStyled>
                        {/* <FiCalendar /> */}
                        <Heading3>Track Habits Daily</Heading3>
                        <Paragraph light>Easily log your daily progress and keep your streaks going strong.</Paragraph>
                    </FeatureCardStyled>
                    <FeatureCardStyled>
                        {/* <FiBarChart2 /> */}
                        <Heading3>Visualize Progress</Heading3>
                        <Paragraph light>See your journey unfold with intuitive charts and insightful reports.</Paragraph>
                    </FeatureCardStyled>
                    <FeatureCardStyled>
                        {/* <FiAward /> */}
                        <Heading3>Stay Motivated</Heading3>
                        <Paragraph light>Personalized recommendations and milestones to keep you inspired.</Paragraph>
                    </FeatureCardStyled>
                </FeatureGrid>
            </FeaturesSection>

            <CallToActionSection style={{ padding: '50px 20px', background: ({theme}) => theme.body }}>
                <Heading2>Ready to Transform Your Life?</Heading2>
                <Paragraph light style={{maxWidth: '600px'}}>Join thousands of users building better habits and achieving their dreams.</Paragraph>
                <Button onClick={() => navigate('/signup')} variant="primary" style={{padding: '15px 30px', fontSize: '1.1rem'}}>
                    Get Started - It's Free!
                    {/* <FiArrowRightCircle style={{marginLeft: '10px'}}/> */}
                </Button>
            </CallToActionSection>
        </PageWrapper>
    );
}

export default LandingPage;