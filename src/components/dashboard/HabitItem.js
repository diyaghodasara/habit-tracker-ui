// src/components/dashboard/HabitItem.js
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { Paragraph, Strong } from '../common/Typography';
import Card from '../common/Card';
// import { FiCheckSquare, FiSquare, FiEdit3, FiTrash2, FiMoreVertical } from 'react-icons/fi'; // Example icons

const HabitCard = styled(Card)`
  padding: 15px 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.07);
  }
`;

const CompletionCheckbox = styled.button`
  background: none;
  border: 2px solid ${({ theme, checked }) => checked ? theme.accent : theme.border};
  color: ${({ theme, checked }) => checked ? theme.accent : theme.textLighter};
  width: 28px;
  height: 28px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem; /* For icon */
  transition: all 0.2s ease;
  flex-shrink: 0; /* Prevent shrinking */

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;


const HabitInfo = styled.div`
  flex-grow: 1;
  min-width: 0; /* Allow text to truncate */
`;

const HabitName = styled(Strong)`
  display: block;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HabitDetails = styled(Paragraph)`
  font-size: 0.85rem;
  margin-bottom: 0;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HabitActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0; /* Prevent shrinking */

  .icon-button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.textLighter};
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.primary + '1A'};
    }
  }
`;


function HabitItem({ habit, onToggleComplete, onEdit, onDelete }) {
    return (
        <HabitCard>
            <CompletionCheckbox
                checked={habit.completedToday}
                onClick={() => onToggleComplete(habit.id)}
                aria-label={habit.completedToday ? "Mark as incomplete" : "Mark as complete"}
            >
                {/* {habit.completedToday ? <FiCheckSquare /> : <FiSquare />} */}
                {habit.completedToday ? '✔' : ''}
            </CompletionCheckbox>
            <HabitInfo>
                <HabitName>{habit.name}</HabitName>
                <HabitDetails>{habit.description} ({habit.frequency})</HabitDetails>
            </HabitInfo>
            <HabitActions>
                <Button
                    variant="ghost"
                    onClick={() => onEdit(habit.id)}
                    aria-label="Edit habit"
                    style={{ padding: '6px 10px', fontSize: '0.9rem' }}
                >
                    {/* <FiEdit3 /> */} Edit
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => onDelete(habit.id)}
                    aria-label="Delete habit"
                    style={{ padding: '6px 10px', fontSize: '0.9rem', color: '#E57373', borderColor: '#E57373' }}
                >
                    {/* <FiTrash2 />  */} Delete
                </Button>
                {/* Example of a "more actions" button
                <button className="icon-button" title="More actions">
                    <FiMoreVertical />
                </button> */}
            </HabitActions>
        </HabitCard>
    );
}

export default HabitItem;