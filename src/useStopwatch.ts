import { useState, useCallback } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';
import { TimeFromMillisecondsType } from './utils/Time';

export type useStopwatchSettingsType = {
  autoStart?: boolean,
  offsetTimestamp?: Date,
  interval?: number,
};

export type useStopwatchResultType = TimeFromMillisecondsType & {
  start: () => void, 
  pause: () => void, 
  reset: (offset?: Date, newAutoStart?: boolean) => void, 
  isRunning: boolean,
};

export default function useStopwatch({ autoStart = true, offsetTimestamp, interval: customInterval = SECOND_INTERVAL }: useStopwatchSettingsType = {}): useStopwatchResultType {
  const offsetMilliseconds = offsetTimestamp ? Time.getMillisecondsFromExpiry(offsetTimestamp) : 0;
  const [prevTime, setPrevTime] = useState<number>(new Date().getTime() - new Date(offsetMilliseconds).getTime());
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
    setPrevTime(new Date().getTime() - new Date(milliseconds).getTime());
    setIsRunning(true);
  }, [milliseconds]);

  const pause = useCallback(() => {
    setMilliseconds(Time.getMillisecondsFromPrevTime(prevTime));
    setIsRunning(false);
  }, [prevTime]);

  const reset = useCallback((offset?: Date, newAutoStart = true) => {
    const newOffsetMilliseconds = offset ? Time.getMillisecondsFromExpiry(offset) : 0;
    const newPrevTime = new Date().getTime() - new Date(newOffsetMilliseconds).getTime();
    const newMilliseconds = Time.getMillisecondsFromPrevTime(newPrevTime);
    const millisecondsOffset = SECOND_INTERVAL - (newMilliseconds % SECOND_INTERVAL);
    setPrevTime(newPrevTime);
    setMilliseconds(newMilliseconds);
    setInterval(customInterval < millisecondsOffset ? customInterval : millisecondsOffset);
    setIsRunning(newAutoStart);
  }, [customInterval]);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds, false),start, pause, reset, isRunning,
  };
}
