import { useState, useEffect, useRef } from 'react';
import { Time, Validate } from './utils';

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
        if (secondsValue <= 0) {
          clearIntervalRef();
          Validate.onExpire(onExpire) && onExpire();
        }
        setSeconds(secondsValue);
      }, 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function resume() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds((prevSeconds) => (prevSeconds - 1)), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    clearIntervalRef();
    setExpiryTimestamp(newExpiryTimestamp);
  }

  useEffect(() => {
    if (Validate.expiryTimestamp(expiryTimestamp)) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      start();
    }
    return clearIntervalRef;
  }, [expiryTimestamp]);


  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart,
  };
}
