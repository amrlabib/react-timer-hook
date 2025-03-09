import { useState, useCallback, useEffect } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart = true,
  interval: customInterval = SECOND_INTERVAL,
} = {}) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [interval, setInterval] = useState(customInterval);

  const handleExpire = useCallback(() => {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setInterval(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp, newAutoStart = true) => {
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
    } else if (millisecondsValue < interval) {
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
