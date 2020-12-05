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
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 50px;
  background-color: #404549;
  border-radius: 5px;
  padding: 5px 20px;
  color: white;
  margin: 0 5px;
  &:after {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    bottom: 50%;
    content: "";
    width: '100%';
    height: 2px;
    background-color: #232323;
    opacity: 0.5;
  }
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
