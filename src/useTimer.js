import { useState, useEffect } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';

export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart }) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(false);

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
  }

  function pause() {
    setIsRunning(false);
  }

  function start() {
    setIsRunning(true);
  }

  function resume() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds); // calculate new expiry timestamp based on last paused seconds count
    setExpiryTimestamp(time);
    setIsRunning(true);
  }

  function restart(newExpiryTimestamp) {
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

  useEffect(() => {
    if (autoStart) {
      setIsRunning(true);
    }
  }, [autoStart]);

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
