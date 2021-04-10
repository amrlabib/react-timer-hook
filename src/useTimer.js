import { useState } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';

export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart }) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
  }

  function pause() {
    setIsRunning(false);
  }

  function resume() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds); // calculate new expiry timestamp based on last paused seconds count
    setExpiryTimestamp(time);
    setIsRunning(true);
  }

  function start() {
    if (didStart) {
      setIsRunning(true);
    } else {
      resume();
      setDidStart(true);
    }
  }

  function restart(newExpiryTimestamp) {
    setIsRunning(autoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }

  useInterval(isRunning ? () => {
    const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
    if (secondsValue <= 0) {
      handleExpire();
    }
    setSeconds(secondsValue);
  } : () => {}, 1000);

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
