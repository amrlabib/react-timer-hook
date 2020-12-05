import React from 'react';
import styled from 'styled-components';
import Digit from './Digit';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledSepartorContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 5px 10px 5px;
`;

const StyledSepartor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 6px;
  margin: 5px 0;
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
