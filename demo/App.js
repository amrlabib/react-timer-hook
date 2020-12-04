import React from 'react';
import styled from 'styled-components';
import UseTimerDemo from './components/UseTimerDemo';
import UseStopwatchDemo from './components/UseStopwatchDemo';
import UseTimeDemo from './components/UseTimeDemo';

const StylesApp = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #232323;
`;

export default function App() {
  const time = new Date();
  // time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  time.setMilliseconds(time.getMilliseconds() + 100); // 6.5 seconds timer
  return (
    <StylesApp>
      <UseTimerDemo expiryTimestamp={time} />
      <UseStopwatchDemo />
      <UseTimeDemo />
    </StylesApp>
  );
}
