import {
  useState, useEffect, useRef, useCallback,
} from 'react';

/* --------------------- useStopwatch ----------------------- */

export default function useStopwatch(settings) {
  const { autoStart } = settings || {};

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

  const addDay = useCallback(() => {
    setDays((prevDays) => (prevDays + 1));
  }, []);

  const addHour = useCallback(() => {
    setHours((prevHours) => {
      if (prevHours === 23) {
        addDay();
        return 0;
      }
      return prevHours + 1;
    });
  }, [addDay]);

  const addMinute = useCallback(() => {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 59) {
        addHour();
        return 0;
      }
      return prevMinutes + 1;
    });
  }, [addHour]);

  const addSecond = useCallback(() => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        addMinute();
        return 0;
      }
      return prevSeconds + 1;
    });
  }, [addMinute]);

  const start = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => addSecond(), 1000);
    }
  }, [addSecond]);

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
  }, [start, autoStart]);

  return {
    seconds, minutes, hours, days, start, pause, reset,
  };
}
