import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';
import { FormattedTimeFromMillisecondsType } from './utils/Time';

export type useTimeSettingsType = {
  format?: '12-hour',
  interval?: number;
  utc?: boolean;
};

export default function useTime({ format, interval: customInterval = SECOND_INTERVAL, utc = false }: useTimeSettingsType = {}): FormattedTimeFromMillisecondsType {
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromTimeNow(utc));

  useInterval(() => {
    setMilliseconds(Time.getMillisecondsFromTimeNow(utc));
  }, customInterval);

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds, format),
  };
}
