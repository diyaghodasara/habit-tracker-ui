// src/components/common/PageWrapper.js
import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 40px 20px;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; // Center content vertically if min-height is met */
  flex-grow: 1; /* Takes up remaining space in Layout */
  width: 100%;
  /* min-height calc is no longer needed here if Layout has flex-grow */
`;

export default PageWrapper;