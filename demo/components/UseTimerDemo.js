import React from 'react';
import { useTimer } from '../../src/index';
import TimerStyled from './TimerStyled';
import Button from './Button';

export default function UseTimerDemo({ expiryTimestamp }: Object) {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div>
      <h2>UseTimer Demo</h2>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} days={days} />
      <Button type="button" onClick={start}>Start</Button>
      <Button type="button" onClick={pause}>Pause</Button>
      <Button type="button" onClick={resume}>Resume</Button>
      <Button
        type="button"
        onClick={() => {
          // Restarts to 10 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 600);
          restart(time);
        }}
      >
        Restart
      </Button>
    </div>
  );
}