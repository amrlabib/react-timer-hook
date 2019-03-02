## react-timer-hook

React timer hook is a custom [react hook](https://reactjs.org/docs/hooks-intro.html), built to handle time related logic in your react component:

1. Timers (countdown timer) `useTimer`
2. Stopwatch (count up timer) `useStopwatch`
3. Time (return current time) `useTime`


#### Note:

React hooks is available from react version 16.8.0

---

## Setup

`yarn add react-timer-hook`

OR

`npm install --save react-timer-hook`

---

## `useTimer`

### Example

```javascript
import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    resume
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
    </div>
  );
}

export default function App() {
  var t = new Date();
  t.setSeconds(t.getSeconds() + 600); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={t} />
    </div>
  );
}
```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| expiryTimestamp | number(timestamp) | YES | this will define for how long the timer will be running   |
| onExpire | Function | No | callback function to be executed once countdown timer is expired |

### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| pause | function | function to be called to pause timer |
| start | function | function if called after pause the timer will continue based on original expiryTimestamp |
| resume | function | function if called after pause the timer will continue countdown from last paused state |


---

## `useStopwatch`

### Example

```javascript
import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch() {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook</h1>
      <p>Stopwatch Demo</p>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}
```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| autoStart | boolean | No | if set to `true` stopwatch will auto start |

### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| days | number | days value |
| start | function | function to be called to start stopwatch |
| pause | function | function to be called to pause stopwatch |
| reset | function | function to be called to reset stopwatch to 0:0:0:0 |


---


## `useTime`

### Example

```javascript
import React from 'react';
import { useTime } from 'react-timer-hook';

function MyTime() {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTime({ format: '12-hour'});

  return (
    <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook </h1>
      <p>Current Time Demo</p>
      <div style={{fontSize: '100px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span><span>{ampm}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyTime />
    </div>
  );
}
```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| format | string | No | if set to `12-hour` time will be formatted with am/pm |

### Values

| key | Type | Description |
| --- | --- | ---- |
| seconds | number | seconds value |
| minutes | number | minutes value |
| hours | number | hours value |
| ampm | string | am/pm value if `12-hour` format is used |


---

### Deprecation Warning:

Starting from `v1.1.0` and above default export `useTimer` is deprecated, your old code will still work but it is better to start using named exports `{ useTimer, useStopwatch }`
