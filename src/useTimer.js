import { useState, useEffect, useRef } from 'react';
import Validate from './validate';

/* ---------------------- useTimer --------------------- */

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};

  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef();

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

  function subtractDay() {
    setDays((prevDays) => {
      if (prevDays > 0) {
        return prevDays - 1;
      }
      reset();
      Validate.onExpire(onExpire) && onExpire();
      return 0;
    });
  }

  function subtractHour() {
    setHours((prevHours) => {
      if (prevHours === 0) {
        subtractDay();
        return 23;
      }

      if (prevHours > 0) {
        return prevHours - 1;
      }
      return 0;
    });
  }

  function subtractMinute() {
    setMinutes((prevMinutes) => {
      if (prevMinutes === 0) {
        subtractHour();
        return 59;
      }

      if (prevMinutes > 0) {
        return prevMinutes - 1;
      }
      return 0;
    });
  }

  function subtractSecond() {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        subtractMinute();
        return 59;
      }

      if (prevSeconds > 0) {
        return prevSeconds - 1;
      }
      return 0;
    });
  }

  // Timer expiry date calculation
  function calculateExpiryDate() {
    const now = new Date().getTime();
    const distance = expiryTimestamp - now;
    const daysValue = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hoursValue = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesValue = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondsValue = Math.floor((distance % (1000 * 60)) / 1000);
    if (secondsValue < 0) {
      reset();
      Validate.onExpire(onExpire) && onExpire();
    } else {
      setSeconds(secondsValue);
      setMinutes(minutesValue);
      setHours(hoursValue);
      setDays(daysValue);
    }
  }

  function start() {
    if (Validate.expiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      calculateExpiryDate();
      intervalRef.current = setInterval(() => calculateExpiryDate(), 1000);
    }
  }

  function pause() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function resume() {
    if (Validate.expiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      intervalRef.current = setInterval(() => subtractSecond(), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    reset();
    setExpiryTimestamp(newExpiryTimestamp);
  }

  // didMount effect
  useEffect(() => {
    start();
    return reset;
  });


  return {
    seconds, minutes, hours, days, start, pause, resume, restart,
  };
}
