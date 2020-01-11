import { useState, useEffect, useRef } from 'react';

/* ---------------------- useTime --------------------- */

export default function useTime(settings) {
  const { format } = settings || {};

  function formatHours(hours) {
    if (format === '12-hour') {
      const ampm = hours >= 12 ? 'pm' : 'am';
      let formattedHours = hours % 12;
      formattedHours = formattedHours || 12;
      return { hours: formattedHours, ampm };
    }
    return { hours, ampm: '' };
  }

  function getCurrentTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const { hours, ampm } = formatHours(now.getHours());
    return {
      seconds,
      minutes,
      hours,
      ampm,
    };
  }

  const [time, setTime] = useState(getCurrentTime());
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setTime(getCurrentTime()), 1000);
    }
  }

  useEffect(() => {
    start();
    return clearIntervalRef;
  });

  return time;
}
