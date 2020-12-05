import React from 'react';
import { useStopwatch } from '../../src/index';
import Button from './Button';
import StyledTimer from './StyledTimer';

export default function UseStopwatchDemo() {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <h2>UseStopwatch Demo</h2>
      <StyledTimer seconds={seconds} minutes={minutes} hours={hours} days={days} />
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
