import React from 'react';
import { useStopwatch } from '../../src/index';
import Button from './Button';
import TimerStyled from './TimerStyled';

export default function UseStopwatchDemo({ interval }: { interval: number}) {
  const {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch();


  return (
    <div>
      <h2>UseStopwatch Demo</h2>
      <TimerStyled milliseconds={milliseconds} seconds={seconds} minutes={minutes} hours={hours} days={days} enableMilliseconds={interval < 1000} />
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={() => reset}>Reset</Button>
    </div>
  );
}
