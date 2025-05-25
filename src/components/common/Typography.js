// src/components/common/Typography.js
import styled from 'styled-components';

const BaseText = styled.p`
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  line-height: 1.6;
  margin-bottom: 1em;
`;

export const Heading1 = styled.h1`
  ${BaseText}
  font-size: 2.2rem; /* Slightly adjusted */
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0.6em;
  @media (min-width: 768px) {
    font-size: 2.8rem;
  }
`;

export const Heading2 = styled.h2`
  ${BaseText}
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.5em;
   @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Heading3 = styled.h3`
  ${BaseText}
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.4em;
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Paragraph = styled(BaseText)`
  font-size: 1rem;
  margin-bottom: 1em;
  color: ${({ theme, light }) => light ? theme.textLighter : theme.text};
`;

export const SmallText = styled(BaseText)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textLighter || (theme.text + 'AA')};
  margin-bottom: 0.5em;
`;

export const Strong = styled.strong`
  font-weight: 600; /* Slightly less than bold for modern feel */
  color: inherit; /* Inherit from parent, can be overridden */
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.text};
`;