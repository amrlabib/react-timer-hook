import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';

export default function useTime({ format, interval: customInterval = SECOND_INTERVAL } = {}) {
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromTimeNow());

  useInterval(() => {
    setMilliseconds(Time.getMillisecondsFromTimeNow());
  }, customInterval);

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds, format),
  };
}
