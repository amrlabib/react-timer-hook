import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import UseTimerDemo from './components/UseTimerDemo';
import UseStopwatchDemo from './components/UseStopwatchDemo';
import UseTimeDemo from './components/UseTimeDemo';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: Arial;
    text-align: left;
    color: #404549;
  }
  h2 {
    margin-top: 20px;
  }
`;

const Container = styled.div`
  width: 1170px;
  margin-left: auto;
  margin-right: auto;
`;

const HeaderBG = styled.div`
  background-color: #404549;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h1 {
    margin: 20px 0;
  }
`;

const H1 = styled.h1`
  color: white;
`;

const Separator = styled.div`
  height: 0px;
  margin-top: 30px;
  border: dashed 2px #404549;
`;

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      <GlobalStyle />
      <HeaderBG>
        <Container>
          <Header>
            <H1>react-timer-hook</H1>
            <div>
              <iframe src="https://ghbtns.com/github-btn.html?user=amrlabib&repo=react-timer-hook&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160" height="30" title="GitHub" />
              <iframe src="https://ghbtns.com/github-btn.html?user=amrlabib&repo=react-timer-hook&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="126" height="30" title="GitHub" />
            </div>
          </Header>
        </Container>
      </HeaderBG>
      <Container>
        <p>
          React timer hook is a custom <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">react hook</a> built to handle timer, stopwatch, and time logic/state in your react component.
        </p>
        <UseTimerDemo expiryTimestamp={time} />
        <Separator />
        <UseStopwatchDemo />
        <Separator />
        <UseTimeDemo />
      </Container>
    </div>
  );
}
