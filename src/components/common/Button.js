// src/components/common/Button.js
import styled from 'styled-components';
// import { darken } from 'polished'; // Already used in theme.js for hover colors

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  line-height: 1.5;

  background-color: ${({ theme }) => theme.buttonPrimaryBackground};
  color: ${({ theme }) => theme.buttonPrimaryText};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0px);
  }

  ${props => props.variant === 'secondary' && `
    background-color: ${props.theme.buttonSecondaryBackground};
    color: ${props.theme.buttonSecondaryText};
    &:hover:not(:disabled) {
      background-color: ${props.theme.secondaryHover};
    }
  `}

  ${props => props.variant === 'ghost' && `
    background-color: transparent;
    color: ${props.theme.buttonGhostText};
    border: 2px solid ${props.theme.buttonGhostBorder};
    &:hover:not(:disabled) {
      background-color: ${props.theme.buttonGhostHoverBackground};
    }
  `}

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    color: ${({ theme }) => theme.disabledText};
    border-color: ${({ theme }) => theme.disabledBackground} !important; // Ensure border also updates
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

function Button({ children, onClick, variant = 'primary', type = 'button', ...props }) {
    return (
        <StyledButton onClick={onClick} variant={variant} type={type} {...props}>
            {children}
        </StyledButton>
    );
}

export default Button;