import React from 'react';
import { useTime } from '../../src/index';
import TimerStyled from './TimerStyled';

export default function UseTimeDemo({ interval }: { interval: number}) {
  const {
    milliseconds,
    seconds,
    minutes,
    hours,
  } = useTime({ interval });

  return (
    <div>
      <h2>UseTime Demo</h2>
      <div>
        <TimerStyled milliseconds={milliseconds} seconds={seconds} minutes={minutes} hours={hours} enableMilliseconds={interval < 1000} />
      </div>
    </div>
  );
}