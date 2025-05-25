// src/components/dashboard/RecommendationCard.js
import React from 'react';
import Card from '../common/Card';
import { Heading3, Paragraph, Strong } from '../common/Typography';
import Button from '../common/Button';
// import { FiZap } from 'react-icons/fi';

function RecommendationCard({ recommendation }) {
    if (!recommendation) return null;

    return (
        <Card hoverEffect style={{ textAlign: 'center' }}>
            {/* <FiZap size="2em" style={{ color: (theme) => theme.accent, marginBottom: '10px' }}/> */}
            <Heading3>Recommendation Spotlight</Heading3>
            <Paragraph><Strong>{recommendation.title}</Strong></Paragraph>
            <Paragraph light>{recommendation.details}</Paragraph>
            <Button variant="secondary" onClick={() => alert('View Recommendation Details (TODO: Implement action)')}>
                Try this Habit
            </Button>
        </Card>
    );
}

export default RecommendationCard;