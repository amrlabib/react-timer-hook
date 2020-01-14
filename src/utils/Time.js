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
    if (milliSecondsDistance > 0) {
      return Math.floor(milliSecondsDistance / 1000);
    }
    return 0;
  }
}
