import { useState, useEffect, useRef, useCallback } from 'react';
import { Time, Validate } from './utils';

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};
  const onExpireCallback = useCallback(onExpire, []);
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef();

  const clearIntervalRef = useCallback(() => {
    if (intervalRef.current) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const handleExpire = useCallback(() => {
    clearIntervalRef();
    Validate.onExpire(onExpireCallback) && onExpireCallback();
  }, [clearIntervalRef, onExpireCallback]);

  const start = useCallback(() => {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
        if (secondsValue <= 0) {
          handleExpire();
        }
        setSeconds(secondsValue);
      }, 1000);
    }
  }, [expiryTimestamp, handleExpire]);

  const pause = useCallback(() => {
    clearIntervalRef();
  }, [clearIntervalRef]);

  const resume = useCallback(() => {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => setSeconds((prevSeconds) => {
        const secondsValue = prevSeconds - 1;
        if (secondsValue <= 0) {
          handleExpire();
        }
        return secondsValue;
      }), 1000);
    }
  }, [handleExpire]);

  const restart = useCallback((newExpiryTimestamp) => {
    clearIntervalRef();
    setExpiryTimestamp(newExpiryTimestamp);
  }, [clearIntervalRef]);

  const handleExtraMilliSeconds = useCallback((secondsValue, extraMilliSeconds) => {
    setIsRunning(true);
    intervalRef.current = setTimeout(() => {
      const currentSeconds = Time.getSecondsFromExpiry(expiryTimestamp);
      setSeconds(currentSeconds);
      if (currentSeconds <= 0) {
        handleExpire();
      } else {
        intervalRef.current = undefined;
        start();
      }
    }, extraMilliSeconds);
  }, [expiryTimestamp, handleExpire, start]);

  useEffect(() => {
    if (Validate.expiryTimestamp(expiryTimestamp)) {
      const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
      const extraMilliSeconds = Math.floor((secondsValue - Math.floor(secondsValue)) * 1000);
      setSeconds(secondsValue);
      if (extraMilliSeconds > 0) {
        handleExtraMilliSeconds(secondsValue, extraMilliSeconds);
      } else {
        start();
      }
    }
    return clearIntervalRef;
  }, [expiryTimestamp, clearIntervalRef, start, handleExpire, handleExtraMilliSeconds]);

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning,
  };
}
