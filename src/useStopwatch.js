import { useState, useCallback } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';

export default function useStopwatch({ autoStart, offsetTimestamp, interval: customInterval = SECOND_INTERVAL } = {}) {
  const offsetMilliseconds = Time.getMillisecondsFromExpiry(offsetTimestamp) || 0;
  const [prevTime, setPrevTime] = useState(new Date() - new Date(offsetMilliseconds));
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromPrevTime(prevTime || 0));
  const [isRunning, setIsRunning] = useState(autoStart);
  const millisecondsInitialOffset = SECOND_INTERVAL - (milliseconds % SECOND_INTERVAL);
  const [interval, setInterval] = useState(customInterval < millisecondsInitialOffset ? customInterval : millisecondsInitialOffset);

  useInterval(() => {
    if (interval !== customInterval) {
      setInterval(customInterval);
    }

    setMilliseconds(Time.getMillisecondsFromPrevTime(prevTime));
  }, isRunning ? interval : null);

  const start = useCallback(() => {
    setPrevTime(new Date() - new Date(milliseconds));
    setIsRunning(true);
  }, [milliseconds]);

  const pause = useCallback(() => {
    setMilliseconds(Time.getMillisecondsFromPrevTime(prevTime));
    setIsRunning(false);
  }, [prevTime]);

  const reset = useCallback((offset = 0, newAutoStart = true) => {
    const newOffsetMilliseconds = Time.getMillisecondsFromExpiry(offset) || 0;
    const newPrevTime = new Date() - new Date(newOffsetMilliseconds);
    const newMilliseconds = Time.getMillisecondsFromPrevTime(newPrevTime);
    const millisecondsOffset = SECOND_INTERVAL - (newMilliseconds % SECOND_INTERVAL);
    setPrevTime(newPrevTime);
    setMilliseconds(newMilliseconds);
    setInterval(customInterval < millisecondsOffset ? customInterval : millisecondsOffset);
    setIsRunning(newAutoStart);
  }, [customInterval]);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds, false), start, pause, reset, isRunning,
  };
}
