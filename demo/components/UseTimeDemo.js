import React from 'react';
import { useTime } from '../../src/index';
import TimerStyled from './TimerStyled';

export default function UseTimeDemo() {
  const {
    seconds,
    minutes,
    hours,
  } = useTime({ });

  return (
    <div>
      <h2>UseTime Demo</h2>
      <div>
        <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
      </div>
    </div>
  );
}