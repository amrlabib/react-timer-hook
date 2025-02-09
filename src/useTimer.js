import { useState, useCallback, useEffect } from 'react';
import { Time, Validate } from './utils';
import { useInterval } from './hooks';

const MILLISEC_INTERVAL = 1;
const SECOND_INTERVAL = 1000;
function getIntervalFromExpiryTimestamp(expiryTimestamp) {
  if (!Validate.expiryTimestamp(expiryTimestamp)) {
    return null;
  }
  return MILLISEC_INTERVAL;
}

export default function useTimer({
  expiryTimestamp: expiry,
  onExpire,
  autoStart = true,
  enableMilliseconds = false,
} = {}) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [interval, setInterval] = useState(getIntervalFromExpiryTimestamp(expiryTimestamp));
  const [precisionCounter, setPrecisionCounter] = useState(0);

  const handleExpire = useCallback(() => {
    Validate.onExpire(onExpire) && onExpire();
    setIsRunning(false);
    setInterval(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
    setPrecisionCounter(0);
    setInterval(MILLISEC_INTERVAL);
  }, []);

  const restart = useCallback((newExpiryTimestamp, newAutoStart = true) => {
    setPrecisionCounter(0);
    setInterval(getIntervalFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setMilliseconds(Time.getMillisecondsFromExpiry(newExpiryTimestamp));
  }, []);

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

  useEffect(() => {
    // Initially interval is 1ms to handle expiryTimestamp with precision, example 10.4s timer
    // Then we change from 1 millisecond to 1 second interval if enableMilliseconds is false and we are not interested in millisecond values
    if (!enableMilliseconds && interval === MILLISEC_INTERVAL && precisionCounter > 60) {
      const { milliseconds: millisecondsVal } = Time.getTimeFromMilliseconds(milliseconds);
      millisecondsVal >= 950 && setInterval(SECOND_INTERVAL);
    }
  }, [milliseconds, enableMilliseconds, interval, precisionCounter]);

  useInterval(() => {
    const millisecondsValue = Time.getMillisecondsFromExpiry(expiryTimestamp);
    setMilliseconds(millisecondsValue);
    setPrecisionCounter(precisionCounter + 1);
    if (millisecondsValue <= 0) {
      handleExpire();
    }
  }, isRunning ? interval : null);

  return {
    ...Time.getTimeFromMilliseconds(milliseconds), start, pause, resume, restart, isRunning,
  };
}
