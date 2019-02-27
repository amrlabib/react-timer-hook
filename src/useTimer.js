import { useState, useEffect, useRef } from 'react';

export default function deprecatedUseTimer(settings) {
  // didMount effect
  useEffect(() => {
    console.warn('react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch } instead');
  },[]);

  if(settings.expiryTimestamp) {
    return useTimer(settings);
  } else {
    return useStopwatch(settings);
  }
}

/* --------------------- useStopwatch ----------------------- */

export function useStopwatch(settings) {
  const { autoStart } = settings || {};

  // Seconds
  const [seconds, setSeconds] = useState(0);
  function addSecond() {
    setSeconds(prevSeconds => {
      if(prevSeconds === 59) {
        addMinute();
        return 0;
      }
      return prevSeconds + 1;
    });
  }

  // Minutes
  const [minutes, setMinutes] = useState(0);
  function addMinute() {
    setMinutes(prevMinutes => {
      if (prevMinutes === 59) {
        addHour();
        return 0;
      }
      return prevMinutes + 1;
    });
  }

  // Hours
  const [hours, setHours] = useState(0);
  function addHour() {
    setHours(prevHours => {
      if (prevHours === 23) {
        addDay();
        return 0;
      }
      return prevHours + 1;
    });
  }

  // Days
  const [days, setDays] = useState(0);
  function addDay() {
    setDays(prevDays => {
      return prevDays + 1;
    });
  }

  // Control functions
  const intervalRef = useRef();

  function start() {
    if(!intervalRef.current) {
      intervalRef.current = setInterval(() => addSecond(), 1000);
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

  // didMount effect
  useEffect(() => {
    start();
    return stop;
  },[]);

  return { seconds, minutes, hours, days, start, pause, reset };
}

/* ---------------------- useTimer --------------------- */

export function useTimer(settings) {
  const { expiryTimestamp, onExpire } = settings || {};

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  const intervalRef = useRef();

  function start() {
    if(isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      calculateExpiryDate();
      intervalRef.current = setInterval(() => calculateExpiryDate(), 1000);
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
    return stop;
  },[]);


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

  return { seconds, minutes, hours, days, start, pause, reset };
}
