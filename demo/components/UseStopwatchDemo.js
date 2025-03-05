import React from 'react';
import { useStopwatch } from '../../src/index';
import Button from './Button';
import TimerStyled from './TimerStyled';

export default function UseStopwatchDemo({ interval }) {
  const time = new Date();
  time.setMilliseconds(time.getMilliseconds() + 10000);
  const {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true, interval, offsetTimestamp: 0 });


  return (
    <div>
      <h2>UseStopwatch Demo</h2>
      <TimerStyled milliseconds={milliseconds} seconds={seconds} minutes={minutes} hours={hours} days={days} enableMilliseconds={interval < 1000} />
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
