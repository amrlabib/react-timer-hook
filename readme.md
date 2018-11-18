## react-timer-hook

React timer hook is a custom react hook built to handle timers and count down logic in your react component.

---

## Setup

`yarn add react-timer-hook` OR `npm install react-timer-hook`

---

## Example

```javascript
import React from 'react';
import useTimer  from 'react-timer-hook';

export default function App() {
  const now = new Date()
  const after10Days = now.setDate(now.getDate() + 10);


  const { seconds, minutes, hours, days, startTimer, stopTimer, resetTimer } = useTimer({
    autoStart: true,
    expiryTimestamp: after10Days,
  });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook Demo</h1>
      <br/>
      <br/>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <br/>
      <br/>
      <button onClick={startTimer}>Start</button>
      <br/>
      <br/>
      <button onClick={stopTimer}>Stop</button>
      <br/>
      <br/>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

---

## Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| autoStart | boolean | No | if set to `true` timer will auto start |
| expiryTimestamp | number(timestamp) | No | if set a countdown timer will start, instead of normal timer |

---

## Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| startTimer | function | function to be called to start timer |
| stopTimer | function | function to be called to stop timer |
| resetTimer | function | function to be called to reset timer, this reset will not make sense with countdown timer |
