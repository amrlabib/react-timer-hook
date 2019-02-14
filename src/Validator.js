export default class Validator {
  // Validate expiryTimestamp
  static isValidExpiryTimestamp(expiryTimestamp) {
    const isValid = expiryTimestamp && (new Date(expiryTimestamp)).getTime() > 0;
    if(!isValid) {
      console.warn('react-timer-hook: Invalid expiryTimestamp settings passed', expiryTimestamp);
    }
    return isValid;
  }

  // Validate onExpire
  static isValidOnExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function';
    if(!isValid) {
      console.warn('react-timer-hook: Invalid onExpire settings function passed', onExpire);
    }
    return isValid;
  }
}
