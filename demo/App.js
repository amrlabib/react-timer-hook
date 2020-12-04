import React from 'react';
import UseTimerDemo from './components/UseTimerDemo';
import UseStopwatchDemo from './components/UseStopwatchDemo';
import UseTimeDemo from './components/UseTimeDemo';


export default function App() {
  const time = new Date();
  // time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  time.setMilliseconds(time.getMilliseconds() + 100); // 6.5 seconds timer
  return (
    <div>
      <UseTimerDemo expiryTimestamp={time} />
      <UseStopwatchDemo />
      <UseTimeDemo />
    </div>
  );
}
