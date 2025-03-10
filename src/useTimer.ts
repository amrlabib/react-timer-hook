import { useState, useCallback, useEffect } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';
import { TimeFromMillisecondsType } from './utils/Time';

export type useTimerSettingsType = {
  expiryTimestamp: Date,
  onExpire?: () => void,
  autoStart?: boolean,
  interval: number,
}

export type useTimerResultType = TimeFromMillisecondsType & {
  start: () => void, 
  pause: () => void,
  resume: () => void, 
  restart: (newExpiryTimestamp: Date, newAutoStart: boolean) => void,
  isRunning: boolean,
};

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire = () => {},
  autoStart = true,
  interval: customInterval = SECOND_INTERVAL,
}: useTimerSettingsType): useTimerResultType {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [interval, setInterval] = useState<number | null>(customInterval);

  const handleExpire = useCallback(() => {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setInterval(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp: Date, newAutoStart = true) => {
    setInterval(customInterval);
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setMilliseconds(Time.getMillisecondsFromExpiry(newExpiryTimestamp));
  }, [customInterval]);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + milliseconds);
    restart(time);
  }, [milliseconds, restart]);

  const start = useCallback(() => {
    if (didStart) {
      setMilliseconds(Time.getMillisecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(() => {
    const millisecondsValue = Time.getMillisecondsFromExpiry(expiryTimestamp);
    setMilliseconds(millisecondsValue);
    if (millisecondsValue <= 0) {
      handleExpire();
    } else if (interval && millisecondsValue < interval) {
      setInterval(millisecondsValue);
    }
  }, isRunning ? interval : null);

  useEffect(() => {
    Validate.expiryTimestamp(expiryTimestamp);
  }, [expiryTimestamp]);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds), start, pause, resume, restart, isRunning,
  };
}
