import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';

const MILLISEC_INTERVAL = 1;
const SECOND_INTERVAL = 1000;
export default function useTime({ format, enableMilliseconds = false } = {}) {
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromTimeNow());

  useInterval(() => {
    setMilliseconds(Time.getMillisecondsFromTimeNow());
  }, enableMilliseconds ? MILLISEC_INTERVAL : SECOND_INTERVAL);

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds, format),
  };
}
