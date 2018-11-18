import React from 'react';
import useTimer  from './useTimer';

export default function App() {
  const now = new Date()
  const after10Days = now.setDate(now.getDate() + 10);
  const { seconds, minutes, hours, days, startTimer, stopTimer, resetTimer } = useTimer({
    autoStart: true,
    expiryTimestamp: after10Days,
  });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook Demo</h1>
      <br/>
      <br/>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <br/>
      <br/>
      <button onClick={startTimer}>Start</button>
      <br/>
      <br/>
      <button onClick={stopTimer}>Stop</button>
      <br/>
      <br/>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
