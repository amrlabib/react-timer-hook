import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.span`
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
`;

const StyledDigitContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledSingleDigit = styled.span`
  display: flex;
  flex: 0 1 25%;
  font-size: 70px;
  background-color: #404549;
  border-radius: 5px;
  padding: 5px 20px;
  color: white;
  margin: 0 5px;
`;

export default function Digit({ value, title, addSeparator }: Object) {
  const leftDigit = value >= 10 ? value.toString()[0] : '0';
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledDigitContainer>
        <StyledSingleDigit>
          {leftDigit}
        </StyledSingleDigit>
        <StyledSingleDigit>
          {rightDigit}
        </StyledSingleDigit>
      </StyledDigitContainer>
    </StyledContainer>
  );
}
