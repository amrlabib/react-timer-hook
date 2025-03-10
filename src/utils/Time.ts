
export type TimeFromMillisecondsType = {
  totalMilliseconds: number,
  totalSeconds: number,
  milliseconds: number,
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
};

export type FormattedTimeFromMillisecondsType = {
  milliseconds: number,
  seconds: number,
  minutes: number,
  hours: number,
  ampm?: 'pm' | 'am' ,
};


export default class Time {
  static getTimeFromMilliseconds(millisecs: number, isCountDown = true): TimeFromMillisecondsType {
    const totalSeconds = isCountDown ? Math.ceil(millisecs / 1000) : Math.floor(millisecs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor(millisecs % 1000);

    return {
      totalMilliseconds: millisecs,
      totalSeconds,
      milliseconds,
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getMillisecondsFromExpiry(expiry: Date): number {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry.getTime() - now;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromPrevTime(prevTime: number): number {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromTimeNow(): number {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = (now.getTimezoneOffset() * 60 * 1000);
    return currentTimestamp - offset;
  }

  static getFormattedTimeFromMilliseconds(milliseconds: number, format?: '12-hour'): FormattedTimeFromMillisecondsType {
    const {
      milliseconds: millisecVal,
      seconds: secondsValue,
      minutes,
      hours,
    } = Time.getTimeFromMilliseconds(milliseconds);
    let ampm;
    let hoursValue = hours;

    if (format === '12-hour') {
      ampm = hours >= 12 ? 'pm' : 'am';
      hoursValue = hours % 12;
    }

    return {
      milliseconds: millisecVal,
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }
}
