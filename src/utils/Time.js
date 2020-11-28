export default class Time {
  static getTimeFromSeconds(totalSeconds) {
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getSecondsFromExpiry(expiry) {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    const roundedValue = Math.ceil((milliSecondsDistance) / 100) * 100;
    if (roundedValue > 0) {
      return roundedValue / 1000;
    }
    return 0;
  }

  static getSecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = (now.getTimezoneOffset() * 60);
    return (currentTimestamp / 1000) - offset;
  }

  static getFormattedTimeFromSeconds(totalSeconds, format) {
    const { seconds: secondsValue, minutes, hours } = Time.getTimeFromSeconds(totalSeconds);
    let ampm = '';
    let hoursValue = hours;

    if (format === '12-hour') {
      ampm = hours >= 12 ? 'pm' : 'am';
      hoursValue = hours % 12;
    }

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }
}
