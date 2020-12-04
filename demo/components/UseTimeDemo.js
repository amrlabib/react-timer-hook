import React from 'react';
import { useTime } from '../../src/index';
import StyledTimer from './StyledTimer';

export default function UseTimeDemo() {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTime({ format: '12-hour'});

  return (
    <div style={{textAlign: 'center'}}>
      <p>Current Time Demo</p>
      <div style={{fontSize: '100px'}}>
        <StyledTimer seconds={seconds} minutes={minutes} hours={hours}/>
        <span>{ampm}</span>
      </div>
    </div>
  );
}