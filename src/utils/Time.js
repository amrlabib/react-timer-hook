
export default class Time {
  static getTimeForDistance(distanceValue) {
    const days = Math.floor(distanceValue / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distanceValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distanceValue % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceValue % (1000 * 60)) / 1000);

    return {
      seconds,
      minutes,
      hours,
      days,
    };
  }

  static getDistanceForExpiry(expiry) {
    const now = new Date().getTime();
    const distance = expiry - now;
    return distance - 1;
  }
}
