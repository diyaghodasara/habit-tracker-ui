// src/components/common/InputField.js
import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${props => props.fullWidth ? '100%' : '320px'};
  margin-left: auto;
  margin-right: auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-align: left;
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    /* box-shadow is handled by global :focus-visible */
  }

  &::placeholder {
    color: ${({ theme }) => theme.textLighter || (theme.text + '99')};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
const StyledSelect = styled.select`
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;


function InputField({ label, id, type = 'text', value, onChange, placeholder, required = false, disabled = false, fullWidth = false, options, ...props }) {
    return (
        <InputWrapper fullWidth={fullWidth}>
            {label && <StyledLabel htmlFor={id}>{label}{required && <span title="Required" style={{color: 'red'}}>*</span>}</StyledLabel>}
            {type === 'select' ? (
                <StyledSelect
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    {...props}
                >
                    {placeholder && <option value="" disabled>{placeholder}</option>}
                    {options && options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </StyledSelect>
            ) : (
                <StyledInput
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
            )}
        </InputWrapper>
    );
}

export default InputField;