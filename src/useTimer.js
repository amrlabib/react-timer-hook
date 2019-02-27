import { useState, useEffect, useRef } from 'react';

export default function useTimer(settings) {
  const { autoStart, expiryTimestamp, onExpire } = settings || {};

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

  function subtractSecond() {
    setSeconds(prevSeconds => {
      if (prevSeconds === 0) {
        if (shouldStop()) {
          return 0;
        }
        subtractMinute();
        return 59;
      }
      return prevSeconds - 1;
    })
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

  function subtractMinute() {
    setMinutes(prevMinutes => {
      if (prevMinutes === 0) {
        subtractHour();
        return 59;
      }
      return prevMinutes - 1;
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

  function subtractHour() {
    setHours(prevHours => {
      if (prevHours === 0) {
        subtractDay();
        return 23;
      }
      return prevHours - 1;
    });
  }

  // Days
  const [days, setDays] = useState(0);
  function addDay() {
    setDays(prevDays => {
      return prevDays + 1;
    });
  }

  function subtractDay() {
    setDays(prevDays => {
      return prevDays - 1;
    });
  }

  // Control functions
  const intervalRef = useRef();
  function start(isFunctionTrigger) {
    if (expiryTimestamp && isValidExpiryTimestamp(expiryTimestamp)) {
       calculateExpiryDate();
       runCountdownTimer();
    } else if(autoStart) {
      runTimer();
    }
  }

  function runCountdownTimer() {
    if(!intervalRef.current) {
      intervalRef.current = setInterval(() => subtractSecond(), 1000);
    }
  }

  function startTimer() {
    if (expiryTimestamp) {
      runCountdownTimer();
    } else {
      runTimer();
    }
    
  }

  function stopTimer() {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function runTimer() {
    if(!intervalRef.current) {
      intervalRef.current = setInterval(() => addSecond(), 1000);
    }
  }

  function resetTimer() {
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
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setDays(days);
  }

  // didMount effect
  useEffect(() => {
    start();
    return stopTimer;
  },[]);

  // Determines if the timer should stop
  function shouldStop() {
    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
      resetTimer();
      isValidOnExpire(onExpire) && onExpire();
      return true;
    }
    return false;
  }

  // Validate expiryTimestamp
  function isValidExpiryTimestamp(expiryTimestamp) {
    const isValid = expiryTimestamp && (new Date(expiryTimestamp)).getTime() > 0;
    if(expiryTimestamp && !isValid) {
      console.warn('react-timer-hook: Invalid expiryTimestamp settings passed', expiryTimestamp);
    }
    return isValid;
  }

  // Validate onExpire
  function isValidOnExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function';
    if(onExpire && !isValid) {
      console.warn('react-timer-hook: Invalid onExpire settings function passed', onExpire);
    }
    return isValid;
  }

  return { seconds, minutes, hours, days, startTimer, stopTimer, resetTimer };
}
