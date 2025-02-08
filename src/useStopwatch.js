import { useState, useCallback } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';

const MILLISEC_INTERVAL = 1;
const SECOND_INTERVAL = 1000;
export default function useStopwatch({ autoStart, offsetTimestamp, enableMilliseconds = false } = {}) {
  const [passedMilliseconds, setPassedMilliseconds] = useState(Time.getMillisecondsFromExpiry(offsetTimestamp) || 0);
  const [prevTime, setPrevTime] = useState(new Date());
  const [milliseconds, setMilliseconds] = useState(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime || 0));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [interval, setInterval] = useState(MILLISEC_INTERVAL);

  useInterval(() => {
    // Initially interval is 1ms to handle offsetTimestamp with precision
    // Then we change from 1 millisecond to 1 second interval if enableMilliseconds is false and we are not interested in millisecond values
    if (!enableMilliseconds && interval === MILLISEC_INTERVAL) {
      const { milliseconds: millisecondsVal } = Time.getTimeFromMilliseconds(milliseconds);
      millisecondsVal <= 50 && setInterval(SECOND_INTERVAL);
    }

    setMilliseconds(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime));
  }, isRunning ? interval : null);

  const start = useCallback(() => {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setMilliseconds(passedMilliseconds + Time.getMillisecondsFromPrevTime(newPrevTime));
  }, [passedMilliseconds]);

  const pause = useCallback(() => {
    setPassedMilliseconds(milliseconds);
    setIsRunning(false);
  }, [milliseconds]);

  const reset = useCallback((offset = 0, newAutoStart = true) => {
    const newPassedSeconds = Time.getMillisecondsFromExpiry(offset) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedMilliseconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setMilliseconds(newPassedSeconds + Time.getMillisecondsFromPrevTime(newPrevTime));
  }, []);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds, false), start, pause, reset, isRunning,
  };
}
