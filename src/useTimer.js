import { useState } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';

const DEFAULT_DELAY = 1000;
export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart }) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  const [delay, setDelay] = useState(extraMilliSeconds > 0 ? extraMilliSeconds : 1000);

  function handleExpire() {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setDelay(null);
  }

  function pause() {
    setIsRunning(false);
  }

  function restart(newExpiryTimestamp, newAutoStart) {
    const secondsValue = Time.getSecondsFromExpiry(newExpiryTimestamp);
    const extraMilliSecondsValue = Math.floor((secondsValue - Math.floor(secondsValue)) * 1000);
    setDelay(extraMilliSecondsValue > 0 ? extraMilliSecondsValue : 1000);
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(secondsValue);
  }

  function resume() {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + (seconds * 1000));
    restart(time, true);
  }

  function start() {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }

  useInterval(() => {
    if (delay !== DEFAULT_DELAY) {
      setDelay(DEFAULT_DELAY);
    }
    const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
    setSeconds(secondsValue);
    if (secondsValue <= 0) {
      handleExpire();
    }
  }, isRunning ? delay : null);

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
