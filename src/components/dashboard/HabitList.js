// src/components/dashboard/HabitList.js
import React from 'react';
import styled from 'styled-components';
import HabitItem from './HabitItem';
import { Paragraph, Heading2 } from '../common/Typography';
import Card from '../common/Card';

const ListContainer = styled(Card)`
  padding: 25px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
`;

function HabitList({ habits, onToggleComplete, onEditHabit, onDeleteHabit }) {
    if (!habits || habits.length === 0) {
        return (
            <ListContainer>
                <Heading2 style={{textAlign: 'center', marginBottom: '20px'}}>Your Habits</Heading2>
                <EmptyState>
                    <Paragraph light>You haven't added any habits yet.</Paragraph>
                    <Paragraph light>Click "Add New Habit" to get started!</Paragraph>
                </EmptyState>
            </ListContainer>
        );
    }

    return (
        <ListContainer>
            <Heading2 style={{textAlign: 'center', marginBottom: '25px'}}>Your Habits</Heading2>
            {habits.map(habit => (
                <HabitItem
                    key={habit.id}
                    habit={habit}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditHabit}
                    onDelete={onDeleteHabit}
                />
            ))}
        </ListContainer>
    );
}

export default HabitList;