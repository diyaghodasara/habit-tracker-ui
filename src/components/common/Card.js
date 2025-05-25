// src/components/common/Card.js
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.2s ease-in-out;
  width: 100%;
  
  ${props => props.hoverEffect && `
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  `}
`;

function Card({ children, hoverEffect = false, ...props }) {
    return (
        <StyledCard hoverEffect={hoverEffect} {...props}>
            {children}
        </StyledCard>
    );
}

export default Card;