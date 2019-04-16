import { useState, useEffect, useRef } from 'react';

export default function deprecatedUseTimer(settings) {
  // didMount effect
  useEffect(() => {
    console.warn('react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch } instead');
  },[]);

  if(settings.expiryTimestamp) {
    const values = useTimer(settings);
    return { ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: () => {} };
  } else {
    const values = useStopwatch(settings);
    return { ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: values.reset };
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
    if(autoStart) {
      start();
    }
    return reset;
  },[]);

  return { seconds, minutes, hours, days, start, pause, reset };
}

/* ---------------------- useTimer --------------------- */

export function useTimer(settings) {
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


/* ---------------------- useTime --------------------- */

export function useTime(settings) {
  const { format } = settings || {};
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [ampm, setAmPm] = useState('');

  const intervalRef = useRef();
  function start() {
    if(!intervalRef.current) {
      setCurrentTime();
      intervalRef.current = setInterval(() => setCurrentTime(), 1000);
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
    setAmPm('');
  }

  function formatHours(hours) {
    if (format === '12-hour') {
      const ampm = hours >= 12 ? 'pm' : 'am';
      var formattedHours = hours % 12;
      formattedHours = formattedHours || 12;
      return { hours: formattedHours, ampm };
    }
    return { hours, ampm: '' };
  }


  function setCurrentTime() {
    var now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const { hours, ampm } = formatHours(now.getHours());


    setSeconds(seconds);
    setMinutes(minutes);
    setHours(hours);
    setAmPm(ampm);
  }

  // didMount effect
  useEffect(() => {
    start();
    return reset;
  },[]);


  return { seconds, minutes, hours, ampm };
}
