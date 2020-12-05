import React from 'react';
import styled from 'styled-components';
import { useTime } from '../../src/index';
import StyledTimer from './StyledTimer';

const StyledRow = styled.div`
  flex: 1;
  display: flex;
  // justify-content: center;
  align-items: center;
`;

const StyledText = styled.span`
  font-size: 60px;
  color: white;
  margin-left: 20px;
  margin-top: 12px;
`;

export default function UseTimeDemo() {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTime({ });

  return (
    <div>
      <h2>UseTime Demo</h2>
      <StyledRow>
        <StyledTimer seconds={seconds} minutes={minutes} hours={hours} />
        <StyledText>{ampm}</StyledText>
      </StyledRow>
    </div>
  );
}