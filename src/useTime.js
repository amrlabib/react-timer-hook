import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { MILLISEC_INTERVAL, SECOND_INTERVAL } from './constants';

export default function useTime({ format, enableMilliseconds = false } = {}) {
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromTimeNow());

  useInterval(() => {
    setMilliseconds(Time.getMillisecondsFromTimeNow());
  }, enableMilliseconds ? MILLISEC_INTERVAL : SECOND_INTERVAL);

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds, format),
  };
}
