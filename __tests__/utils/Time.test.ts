import { Time } from '@utils';

test('test getTimeFromMilliseconds 600000 milliseconds results for timer', () => {
  expect(Time.getTimeFromMilliseconds(600000)).toEqual({
    totalMilliseconds: 600000,
    totalSeconds: 600,
    milliseconds: 0,
    seconds: 0,
    minutes: 10,
    hours: 0,
    days: 0,
  });
});