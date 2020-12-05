import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import UseTimerDemo from './components/UseTimerDemo';
import UseStopwatchDemo from './components/UseStopwatchDemo';
import UseTimeDemo from './components/UseTimeDemo';

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    background-color: #232323;
    font-family: Arial;
    color: white;
  }
`;

const StyledApp = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.h1`
  text-align: center;
  color: white;
`;

const StyledSeparator = styled.div`
  height: 3px;
  background-color: white;
  margin-top: 30px;
`;

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  // time.setMilliseconds(time.getMilliseconds() + 100); // 6.5 seconds timer
  return (
    <StyledApp>
      <GlobalStyle />
      <StyledHeader>react-timer-hook</StyledHeader>
      <UseTimerDemo expiryTimestamp={time} />
      <StyledSeparator />
      <UseStopwatchDemo />
      <StyledSeparator />
      <UseTimeDemo />
      <StyledSeparator />
    </StyledApp>
  );
}
