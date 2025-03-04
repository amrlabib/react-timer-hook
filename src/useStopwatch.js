import { useState, useCallback } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';

export default function useStopwatch({ autoStart, offsetTimestamp, interval: customInterval = SECOND_INTERVAL } = {}) {
  const [passedMilliseconds, setPassedMilliseconds] = useState(Time.getMillisecondsFromExpiry(offsetTimestamp) || 0);
  const [prevTime, setPrevTime] = useState(new Date());
  const [milliseconds, setMilliseconds] = useState(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime || 0));
  const [isRunning, setIsRunning] = useState(autoStart);
  const millisecondsInitialOffset = SECOND_INTERVAL - (milliseconds % SECOND_INTERVAL);
  const [interval, setInterval] = useState(customInterval < millisecondsInitialOffset ? customInterval : millisecondsInitialOffset);

  useInterval(() => {
    if (interval !== customInterval) {
      setInterval(customInterval);
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
    setPassedMilliseconds(passedMilliseconds + Time.getMillisecondsFromPrevTime(prevTime));
    setIsRunning(false);
  }, [passedMilliseconds, prevTime]);

  const reset = useCallback((offset = 0, newAutoStart = true) => {
    const newPassedMilliseconds = Time.getMillisecondsFromExpiry(offset) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedMilliseconds(newPassedMilliseconds);
    const newMilliseconds = newPassedMilliseconds + Time.getMillisecondsFromPrevTime(newPrevTime);
    setMilliseconds(newMilliseconds);
    setInterval(newMilliseconds % SECOND_INTERVAL || customInterval);
    setIsRunning(newAutoStart);
  }, [customInterval]);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds, false), start, pause, reset, isRunning,
  };
}
