import { useState } from 'react';
import { Time } from './utils';
import { useInterval } from './hooks';
import { SECOND_INTERVAL } from './constants';
import { FormattedTimeFromMillisecondsType } from './utils/Time';

export type useTimeSettingsType = {
  format?: '12-hour',
  interval?: number;
};

export default function useTime({ format, interval: customInterval = SECOND_INTERVAL }: useTimeSettingsType = {}): FormattedTimeFromMillisecondsType {
  const [milliseconds, setMilliseconds] = useState(Time.getMillisecondsFromTimeNow());

  useInterval(() => {
    setMilliseconds(Time.getMillisecondsFromTimeNow());
  }, customInterval);

  return {
    ...Time.getFormattedTimeFromMilliseconds(milliseconds, format),
  };
}
