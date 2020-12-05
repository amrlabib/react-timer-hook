import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 7px;
  &: first-child {
    margin-left: 0;
  }
`;

const StyledTitle = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

const StyledDigitContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const StyledSingleDigit = styled.span`
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 30px;
  background-color: #404549;
  border-radius: 5px;
  padding: 10px 15px;
  color: white;
  &:first-child {
    margin-right: 10px;
  }
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
    opacity: 0.4;
  }
`;

export default function Digit({ value, title }: Object) {
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
