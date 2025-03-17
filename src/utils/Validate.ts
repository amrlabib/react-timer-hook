export default class Validate {
  static expiryTimestamp(expiryTimestamp: Date) {
    const isValid = (new Date(expiryTimestamp)).getTime() > 0;
    if (!isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp);
    }
    return isValid;
  }

  static onExpire(onExpire: () => void) {
    const isValid = onExpire && typeof onExpire === 'function';
    if (onExpire && !isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid onExpire settings function', onExpire);
    }
    return isValid;
  }
}
