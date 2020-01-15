import { useState, useEffect, useRef } from 'react';
import { Time } from './utils';

export default function useTime(settings) {
  const { format } = settings || {};

  const [seconds, setSeconds] = useState(Time.getSecondsFromTimeNow());
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setSeconds(Time.getSecondsFromTimeNow()), 1000);
    }
  }

  // didMount effect
  useEffect(() => {
    start();
    return clearIntervalRef;
  }, []);


  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format),
  };
}
