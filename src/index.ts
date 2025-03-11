import { useEffect } from 'react';
import useTimer, { useTimerSettingsType } from './useTimer';
import useStopwatch from './useStopwatch';
import useTime from './useTime';

export {
  useTimer,
  useStopwatch,
  useTime,
};

// This deprecated default export is just to avoid breaking old versions code before v1.1.0
export default function useTimerDeprecated(settings: useTimerSettingsType) {
  // didMount effect
  useEffect(() => {
    console.warn('react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch, useTime } instead');
  }, []);

  if (settings.expiryTimestamp) {
    const values = useTimer(settings);
    return {
      ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: () => {},
    };
  }

  const values = useStopwatch(settings);
  return {
    ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: values.reset,
  };
}
