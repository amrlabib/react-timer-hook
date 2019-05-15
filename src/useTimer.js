import { useState, useEffect, useRef } from 'react';

/* ---------------------- useTimer --------------------- */

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);

  const [seconds, setSeconds] = useState(0);
  function subtractSecond() {
    setSeconds(prevSeconds => {
      if(prevSeconds === 0) {
        subtractMinute();
        return 59;
      } else if(prevSeconds > 0) {
        return prevSeconds - 1;
      }
      return 0;
    });
  }


  const [minutes, setMinutes] = useState(0);
  function subtractMinute() {
    setMinutes(prevMinutes => {
      if (prevMinutes === 0) {
        subtractHour();
        return 59;
      } else if(prevMinutes > 0) {
        return prevMinutes - 1;
      }
      return 0;
    });
  }

  const [hours, setHours] = useState(0);
  function subtractHour() {
    setHours(prevHours => {
      if (prevHours === 0) {
        subtractDay();
        return 23;
      } else if(prevHours > 0) {
        return prevHours - 1;
      }
      return 0;
    });
  }

  const [days, setDays] = useState(0);
  function subtractDay() {
    setDays(prevDays => {
      if(prevDays > 0) {
        return prevDays - 1;
      }
      reset();
      isValidOnExpire(onExpire) && onExpire();
      return 0;
    });
  }

  const intervalRef = useRef();

  function start() {
    if(isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      calculateExpiryDate();
      intervalRef.current = setInterval(() => subtractSecond(), 1000);
    }
  }

  function pause() {
    if(intervalRef.current) {
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

  function resume() {
    if(isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      intervalRef.current = setInterval(() => subtractSecond(), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    reset();
    setExpiryTimestamp(newExpiryTimestamp);
  }


  // Timer expiry date calculation
  function calculateExpiryDate() {
    var now = new Date().getTime();
    var distance = expiryTimestamp - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(seconds < 0) {
      reset();
      isValidOnExpire(onExpire) && onExpire();
    } else {
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setDays(days);
    }
  }

  // didMount effect
  useEffect(() => {
    start();
    return reset;
  },[expiryTimestamp]);


  // Validate expiryTimestamp
  function isValidExpiryTimestamp(expiryTimestamp) {
    const isValid = (new Date(expiryTimestamp)).getTime() > 0;
    if(!isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp);
    }
    return isValid;
  }

  // Validate onExpire
  function isValidOnExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function';
    if(onExpire && !isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid onExpire settings function', onExpire);
    }
    return isValid;
  }

  return { seconds, minutes, hours, days, start, pause, resume, restart };
}
