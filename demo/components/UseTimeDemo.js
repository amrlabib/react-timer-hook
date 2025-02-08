import React from 'react';
import { useTime } from '../../src/index';
import TimerStyled from './TimerStyled';

export default function UseTimeDemo({ enableMilliseconds }) {
  const {
    milliseconds,
    seconds,
    minutes,
    hours,
  } = useTime({ enableMilliseconds });

  return (
    <div>
      <h2>UseTime Demo</h2>
      <div>
        <TimerStyled milliseconds={milliseconds} seconds={seconds} minutes={minutes} hours={hours} enableMilliseconds={enableMilliseconds} />
      </div>
    </div>
  );
}