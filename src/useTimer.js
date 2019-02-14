import { useState, useEffect, useRef } from 'react';
import Validator from './Validator.js';

export default function useTimer(settings) {
  const { autoStart, expiryTimestamp, onExpire } = settings;

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
  function startTimer() {
    if (expiryTimestamp) {
      Validator.isValidExpiryTimestamp(expiryTimestamp) && runCountdownTimer();
    } else if(autoStart) {
      runTimer();
    }
  }

  function stopTimer() {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function runCountdownTimer() {
    if(!intervalRef.current) {
      calculateExpiryDate();
      intervalRef.current = setInterval(() => calculateExpiryDate(), 1000);
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
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
    }
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
      resetTimer();
      Validator.isValidOnExpire(onExpire) && onExpire();
    } else {
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setDays(days);
    }
  }

  // didMount effect
  useEffect(() => {
    startTimer();
    return stopTimer;
  },[]);

  return { seconds, minutes, hours, days, startTimer, stopTimer, resetTimer };
}
