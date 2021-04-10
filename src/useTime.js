import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';

export default function useTime({ format }) {
  const [seconds, setSeconds] = useState(Time.getSecondsFromTimeNow());

  useInterval(() => {
    setSeconds(Time.getSecondsFromTimeNow());
  }, 1000);

  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format),
  };
}
