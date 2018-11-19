import React from 'react';
import useTimer  from './useTimer';

export default function App() {
  const {
    seconds,
    minutes,
    hours,
    days,
    startTimer,
    stopTimer,
    resetTimer,
  } = useTimer({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook Demo</h1>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
