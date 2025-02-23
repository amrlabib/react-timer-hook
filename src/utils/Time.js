import Validate from './Validate';

export default class Time {
  static getTimeFromMilliseconds(millisecs, isCountDown = true) {
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

  static getMillisecondsFromExpiry(expiry) {
    if (!Validate.expiryTimestamp(expiry)) {
      return 0;
    }

    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromPrevTime(prevTime) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    return milliSecondsDistance > 0 ? milliSecondsDistance : 0;
  }

  static getMillisecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = (now.getTimezoneOffset() * 60 * 1000);
    return currentTimestamp - offset;
  }

  static getFormattedTimeFromMilliseconds(milliseconds, format) {
    const {
      milliseconds: millisecVal,
      seconds: secondsValue,
      minutes,
      hours,
    } = Time.getTimeFromMilliseconds(milliseconds);
    let ampm = '';
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
