import { useState, useEffect, useRef } from 'react';

/* ---------------------- useTime --------------------- */

export default function useTime(settings) {
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
