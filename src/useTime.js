import { useState, useEffect, useRef } from 'react';

/* ---------------------- useTime --------------------- */

export default function useTime(settings) {
  const { format } = settings || {};

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [ampm, setAmPm] = useState('');
  const intervalRef = useRef();

  function formatHours(hoursValue) {
    if (format === '12-hour') {
      const ampmValue = hoursValue >= 12 ? 'pm' : 'am';
      let formattedHours = hoursValue % 12;
      formattedHours = formattedHours || 12;
      return { hoursValue: formattedHours, ampmValue };
    }
    return { hoursValue, ampmValue: '' };
  }

  function setCurrentTime() {
    const now = new Date();
    const secondsValue = now.getSeconds();
    const minutesValue = now.getMinutes();
    const { hoursValue, ampmValue } = formatHours(now.getHours());

    setSeconds(secondsValue);
    setMinutes(minutesValue);
    setHours(hoursValue);
    setAmPm(ampmValue);
  }


  function start() {
    if (!intervalRef.current) {
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

  // didMount effect
  useEffect(() => {
    start();
    return reset;
  }, []);


  return {
    seconds, minutes, hours, ampm,
  };
}
