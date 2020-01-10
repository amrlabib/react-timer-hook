import { useState, useEffect, useRef } from 'react';
import Validate from './validate';

/* ---------------------- useTimer --------------------- */

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};

  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });
  const [isResume, setIsResume] = useState(false);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function reset() {
    clearIntervalRef();
    setTime({
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
    });
  }

  function updateTime() {
    setTime((prevTime) => {
      const {
        seconds, minutes, hours, days,
      } = prevTime;

      if (seconds > 0) {
        return {
          ...prevTime,
          seconds: seconds - 1,
        };
      }

      if (seconds === 0 && minutes > 0) {
        return {
          seconds: 59,
          minutes: minutes - 1,
          hours,
          days,
        };
      }

      if (seconds === 0 && minutes === 0 && hours > 0) {
        return {
          seconds: 59,
          minutes: 59,
          hours: hours - 1,
          days,
        };
      }

      if (seconds === 0 && minutes === 0 && hours === 0 && days > 0) {
        return {
          seconds: 59,
          minutes: 59,
          hours: 23,
          days: days - 1,
        };
      }

      if (days === 0) {
        Validate.onExpire(onExpire) && onExpire();
        return {
          seconds: 0,
          minutes: 0,
          hours: 0,
          days: 0,
        };
      }

      return prevTime;
    });
  }

  // Timer expiry date calculation
  function calculateExpiryDate() {
    const now = new Date().getTime();
    const distance = expiryTimestamp - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (seconds < 0) {
      reset();
      Validate.onExpire(onExpire) && onExpire();
    } else {
      setTime({
        seconds,
        minutes,
        hours,
        days,
      });
    }
  }

  function start() {
    setIsResume(false);
    if (Validate.expiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      intervalRef.current = setInterval(() => calculateExpiryDate(), 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function resume() {
    setIsResume(true);
    if (Validate.expiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      intervalRef.current = setInterval(() => updateTime(), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    setIsResume(false);
    reset();
    setExpiryTimestamp(newExpiryTimestamp);
  }


  useEffect(() => {
    if (isResume) {
      console.warn('resume useEffect');
      resume();
    } else {
      console.warn('start useEffect');
      start();
    }

    return clearIntervalRef;
  });


  return {
    ...time, start, pause, resume, restart,
  };
}
