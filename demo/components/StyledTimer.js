import React from 'react';
import styled from 'styled-components';
import Digit from './Digit';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const StyledSepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 8px 0px;
`;

const StyledSepartor = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0px;
`;

export default function StyledTimer({ seconds, minutes, hours, days }: Object) {
  return (
    <StyledContainer>
      {days !== undefined ? <Digit value={days} title="DAYS" addSeparator /> : null}
      {days !== undefined ? (
        <StyledSepartorContainer>
          <StyledSepartor />
          <StyledSepartor />
        </StyledSepartorContainer>
      ): null}
      {hours !== undefined ? <Digit value={hours} title="HOURS" addSeparator /> : null}
      <StyledSepartorContainer>
        <StyledSepartor />
        <StyledSepartor />
      </StyledSepartorContainer>
      {minutes !== undefined ? <Digit value={minutes} title="MINUTES" addSeparator /> : null}
      <StyledSepartorContainer>
        <StyledSepartor />
        <StyledSepartor />
      </StyledSepartorContainer>
      {seconds !== undefined ? <Digit value={seconds} title="SECONDS" /> : null}
    </StyledContainer>
  );
}
