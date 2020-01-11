import { useState, useEffect, useRef } from 'react';
import { Validate, Time } from './utils';


export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};

  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [timeDistance, setTimeDistance] = useState(Time.getDistanceForExpiry(expiryTimestamp));
  const [isResume, setIsResume] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function start() {
    setIsResume(false);
    setIsExpired(false);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setTimeDistance(Time.getDistanceForExpiry(expiryTimestamp)), 1000);
    }
  }

  function pause() {
    clearIntervalRef();
  }

  function resume() {
    setIsResume(true);
    if (!intervalRef.current && !isExpired) {
      intervalRef.current = setInterval(() => setTimeDistance((prevDist) => prevDist - 1000), 1000);
    }
  }

  function restart(newExpiryTimestamp) {
    setIsResume(false);
    setIsExpired(false);
    setExpiryTimestamp(newExpiryTimestamp);
    setTimeDistance(Time.getDistanceForExpiry(newExpiryTimestamp));
  }

  function expire() {
    setIsExpired(true);
    setTimeDistance(0);
    clearIntervalRef();
    Validate.onExpire(onExpire) && onExpire();
  }

  useEffect(() => {
    if (Validate.expiryTimestamp(expiryTimestamp)) {
      if (timeDistance < 1000 && !isExpired) {
        expire();
      } else if (isResume) {
        resume();
      } else if (!isExpired) {
        start();
      }
    }

    return clearIntervalRef;
  });

  return {
    ...Time.getTimeForDistance(timeDistance), start, pause, resume, restart,
  };
}
