import { useState, useCallback, useEffect } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { MILLISEC_INTERVAL, SECOND_INTERVAL, PRECISION_COUNTER_LIMIT } from './constants';

export default function useStopwatch({ autoStart, offsetTimestamp, enableMilliseconds = false } = {}) {
  const [passedMilliseconds, setPassedMilliseconds] = useState(Time.getMillisecondsFromExpiry(offsetTimestamp) || 0);
  const [prevTime, setPrevTime] = useState(new Date());
  const [milliseconds, setMilliseconds] = useState(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime || 0));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [interval, setInterval] = useState(MILLISEC_INTERVAL);
  const [precisionCounter, setPrecisionCounter] = useState(0);

  useInterval(() => {
    setMilliseconds(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime));
    precisionCounter <= PRECISION_COUNTER_LIMIT && setPrecisionCounter(precisionCounter + 1);
  }, isRunning ? interval : null);

  useEffect(() => {
    // Initially interval is 1ms to handle expiryTimestamp with precision
    // Then we change from 1 millisecond to 1 second interval if enableMilliseconds is false and we are not interested in millisecond values
    if (!enableMilliseconds && interval === MILLISEC_INTERVAL && precisionCounter > PRECISION_COUNTER_LIMIT) {
      const { milliseconds: millisecondsVal } = Time.getTimeFromMilliseconds(milliseconds);
      millisecondsVal <= 50 && setInterval(SECOND_INTERVAL);
    }
  }, [milliseconds, enableMilliseconds, interval, precisionCounter]);

  const start = useCallback(() => {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setMilliseconds(passedMilliseconds + Time.getMillisecondsFromPrevTime(newPrevTime));
  }, [passedMilliseconds]);

  const pause = useCallback(() => {
    setPassedMilliseconds(milliseconds);
    setIsRunning(false);
    setPrecisionCounter(0);
    setInterval(MILLISEC_INTERVAL);
  }, [milliseconds]);

  const reset = useCallback((offset = 0, newAutoStart = true) => {
    const newPassedSeconds = Time.getMillisecondsFromExpiry(offset) || 0;
    const newPrevTime = new Date();
    setPrecisionCounter(0);
    setPrevTime(newPrevTime);
    setPassedMilliseconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setMilliseconds(newPassedSeconds + Time.getMillisecondsFromPrevTime(newPrevTime));
  }, []);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds, false), start, pause, reset, isRunning,
  };
}
