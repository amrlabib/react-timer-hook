import { useState, useEffect, useRef } from 'react';

export default function useStopwatch(settings) {
  const { autoStart } = settings || {};

  // Days
  const [days, setDays] = useState(0);
  function addDay() {
    setDays((prevDays) => (prevDays + 1));
  }

  // Hours
  const [hours, setHours] = useState(0);
  function addHour() {
    setHours((prevHours) => {
      if (prevHours === 23) {
        addDay();
        return 0;
      }
      return prevHours + 1;
    });
  }

  // Minutes
  const [minutes, setMinutes] = useState(0);
  function addMinute() {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 59) {
        addHour();
        return 0;
      }
      return prevMinutes + 1;
    });
  }

  // Seconds
  const [seconds, setSeconds] = useState(0);
  function addSecond() {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        addMinute();
        return 0;
      }
      return prevSeconds + 1;
    });
  }

  // Control functions
  const intervalRef = useRef();

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => addSecond(), 1000);
    }
  }

  function pause() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function reset() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setDays(0);
  }

  // didMount effect
  useEffect(() => {
    if (autoStart) {
      start();
    }
    return reset;
  }, []);

  return {
    seconds, minutes, hours, days, start, pause, reset,
  };
}
