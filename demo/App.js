import React from 'react';
import { useTimer } from '../src/index';


function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{ textAlign: 'center' }}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button type="button" onClick={start}>Start</button>
      <button type="button" onClick={pause}>Pause</button>
      <button type="button" onClick={resume}>Resume</button>
      <button
        type="button"
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default function App() {
  const time = new Date();
  // time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  time.setMilliseconds(time.getMilliseconds() + 100); // 6.5 seconds timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
