
export default class Validate {
	// Validate expiryTimestamp
  static expiryTimestamp(expiryTimestamp) {
    const isValid = (new Date(expiryTimestamp)).getTime() > 0;
    if(!isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp);
    }
    return isValid;
  }

  // Validate onExpire
  static onExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function';
    if(onExpire && !isValid) {
      console.warn('react-timer-hook: { useTimer } Invalid onExpire settings function', onExpire);
    }
    return isValid;
  }
}