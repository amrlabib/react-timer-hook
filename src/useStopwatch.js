import { useState, useEffect, useRef } from 'react';
import { Time } from './utils';

/* --------------------- useStopwatch ----------------------- */

export default function useStopwatch(settings) {
  const { autoStart } = settings || {};

  const [timeDistance, setTimeDistance] = useState(0);
  const [isInitialStart, setIsInitialStart] = useState(true);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    setIsInitialStart(false);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setTimeDistance((prevDistance) => prevDistance + 1001), 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function reset() {
    setIsInitialStart(true);
    clearIntervalRef();
    setTimeDistance(0);
  }


  useEffect(() => {
    if (!isInitialStart || (isInitialStart && autoStart)) {
      start();
    }

    return clearIntervalRef;
  });

  return {
    ...Time.getTimeForDistance(timeDistance), start, pause, reset,
  };
}
