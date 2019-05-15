import { useEffect } from 'react';
import useTimer from './useTimer';
import useStopwatch from './useStopwatch';
import useTime from './useTime';

export {
  useTimer,
  useStopwatch,
  useTime,
}

// This deprecated default export is just for old version before v1.1.0 for all new versions only named exports should be used
export default function deprecatedUseTimer(settings) {
  // didMount effect
  useEffect(() => {
    console.warn('react-timer-hook: default export useTimer is deprecated, use named exports { useTimer, useStopwatch, useTime } instead');
  },[]);

  if(settings.expiryTimestamp) {
    const values = useTimer(settings);
    return { ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: () => {} };
  } else {
    const values = useStopwatch(settings);
    return { ...values, startTimer: values.start, stopTimer: values.pause, resetTimer: values.reset };
  }
}