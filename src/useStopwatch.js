import { useState, useEffect, useRef } from 'react';
import { Time } from './utils';

export default function useStopwatch(settings) {
  const { autoStart, offsetTimestamp } = settings || {};

  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(offsetTimestamp || 0));
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => setSeconds((prevSeconds) => (prevSeconds + 1)), 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function reset(offset: number) {
    clearIntervalRef();
    setSeconds(Time.getSecondsFromExpiry(offset || 0));
    if (autoStart) {
      start();
    }
  }

  // didMount effect
  useEffect(() => {
    if (autoStart) {
      start();
    }
    return clearIntervalRef;
  }, []);

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, reset, isRunning,
  };
}
