import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';

export default function useStopwatch({ autoStart, offsetTimestamp }) {
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(offsetTimestamp || 0));
  const [isRunning, setIsRunning] = useState(autoStart);

  useInterval(() => {
    setSeconds((prevSeconds) => (prevSeconds + 1));
  }, isRunning ? 1000 : null);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset(offset = 0, newAutoStart = true) {
    setIsRunning(newAutoStart);
    setSeconds(Time.getSecondsFromExpiry(offset));
  }

  return {
    ...Time.getTimeFromSeconds(seconds), start, pause, reset, isRunning,
  };
}
