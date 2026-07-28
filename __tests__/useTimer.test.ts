import { renderHook, act } from '@testing-library/react';
import useTimer from '../src/useTimer';

function getExpiryTimestamp(seconds: number): Date {
  const time = new Date();
  time.setSeconds(time.getSeconds() + seconds);
  return time;
}

describe('useTimer', () => {

  // ─── INPUTS ───────────────────────────────────────────────────────────────

  describe('expiryTimestamp', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns correct days, hours, minutes, seconds breakdown', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(90061), autoStart: false })
      );

      expect(result.current.days).toBe(1);
      expect(result.current.hours).toBe(1);
      expect(result.current.minutes).toBe(1);
      expect(result.current.seconds).toBe(1);
    });

    test('counts down every second', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      expect(result.current.seconds).toBe(10);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.seconds).toBe(7);
    });

    test('stops at zero and does not go negative', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(3) })
      );

      act(() => { jest.advanceTimersByTime(10000); });

      expect(result.current.days).toBe(0);
      expect(result.current.hours).toBe(0);
      expect(result.current.minutes).toBe(0);
      expect(result.current.seconds).toBe(0);
    });

    test('all time values are zero when expiry is in the past', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(-10), autoStart: false })
      );

      expect(result.current.days).toBe(0);
      expect(result.current.hours).toBe(0);
      expect(result.current.minutes).toBe(0);
      expect(result.current.seconds).toBe(0);
    });
  });

  describe('autoStart', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('timer starts running by default', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      expect(result.current.isRunning).toBe(true);
    });

    test('timer does not run when set to false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      expect(result.current.isRunning).toBe(false);
    });

    test('does not tick when set to false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      act(() => { jest.advanceTimersByTime(5000); });

      expect(result.current.seconds).toBe(10);
    });
  });

  describe('onExpire', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('is called exactly once when the timer reaches zero', () => {
      const onExpire = jest.fn();

      renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(3), onExpire })
      );

      act(() => { jest.advanceTimersByTime(3000); });
      expect(onExpire).toHaveBeenCalledTimes(1);

      act(() => { jest.advanceTimersByTime(5000); });
      expect(onExpire).toHaveBeenCalledTimes(1);
    });

    test('is not called before the timer reaches zero', () => {
      const onExpire = jest.fn();

      renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(3), onExpire })
      );

      act(() => { jest.advanceTimersByTime(2000); });

      expect(onExpire).not.toHaveBeenCalled();
    });

    test('is not called when expiry is in the past', () => {
      const onExpire = jest.fn();

      renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(-10), onExpire })
      );

      act(() => { jest.advanceTimersByTime(5000); });

      expect(onExpire).not.toHaveBeenCalled();
    });
  });

  describe('interval', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('ticks every second by default', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { jest.advanceTimersByTime(300); });
      expect(result.current.seconds).toBe(10);
      expect(result.current.milliseconds).toBe(0);

      act(() => { jest.advanceTimersByTime(5700); });
      expect(result.current.seconds).toBe(4);
      expect(result.current.milliseconds).toBe(0);
    });

    test('ticks at custom 200ms rate', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), interval: 200 })
      );

      act(() => { jest.advanceTimersByTime(300); });
      expect(result.current.seconds).toBe(10);
      expect(result.current.milliseconds).toBe(800);

      act(() => { jest.advanceTimersByTime(5700); });
      expect(result.current.seconds).toBe(4);
      expect(result.current.milliseconds).toBe(0);
    });

    test('ticks at 1ms rate', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), interval: 1 })
      );

      act(() => { jest.advanceTimersByTime(15); });
      expect(result.current.seconds).toBe(10);
      expect(result.current.milliseconds).toBe(985);

      act(() => { jest.advanceTimersByTime(7700); });
      expect(result.current.seconds).toBe(3);
      expect(result.current.milliseconds).toBe(285);
    });

    test('does not tick when set to 0', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), interval: 0 })
      );

      act(() => { jest.advanceTimersByTime(5000); });

      expect(result.current.seconds).toBe(10);
    });
  });

  // ─── OUTPUTS (values) ─────────────────────────────────────────────────────

  describe('totalSeconds', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns correct value from expiryTimestamp', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(300) })
      );

      expect(result.current.totalSeconds).toBe(300);

      act(() => { jest.advanceTimersByTime(2000); });
      expect(result.current.totalSeconds).toBe(298);

      act(() => { jest.advanceTimersByTime(10000); });
      expect(result.current.totalSeconds).toBe(288);
    });

    test('is zero when expiry is in the past', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(-300) })
      );

      expect(result.current.totalSeconds).toBe(0);

      act(() => { jest.advanceTimersByTime(2000); });
      expect(result.current.totalSeconds).toBe(0);
    });
  });

  describe('totalMilliseconds', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns correct value from expiryTimestamp', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(90), interval: 100 })
      );

      expect(result.current.totalMilliseconds).toBe(90000);

      act(() => { jest.advanceTimersByTime(2600); });
      expect(result.current.totalMilliseconds).toBe(87400);
    });

    test('is zero when expiry is in the past', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(-300) })
      );

      expect(result.current.totalMilliseconds).toBe(0);

      act(() => { jest.advanceTimersByTime(2000); });
      expect(result.current.totalMilliseconds).toBe(0);
    });
  });

  describe('isRunning', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('is true by default', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      expect(result.current.isRunning).toBe(true);
    });

    test('becomes false when timer reaches zero', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(3) })
      );

      expect(result.current.isRunning).toBe(true);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.isRunning).toBe(false);
    });

    test('is false when expiry is in the past', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(-10) })
      );

      expect(result.current.isRunning).toBe(false);
    });

    test('is false when autoStart is false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      expect(result.current.isRunning).toBe(false);
    });
  });

  // ─── OUTPUTS (functions) ──────────────────────────────────────────────────

  describe('start', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('starts the timer when autoStart is false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      expect(result.current.isRunning).toBe(false);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.seconds).toBe(10);

      act(() => { result.current.start(); });

      expect(result.current.isRunning).toBe(true);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.seconds).toBe(7);
    });

    test('resets to original expiry when called after timer already started', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { jest.advanceTimersByTime(3000); });
      act(() => { result.current.pause(); });
      expect(result.current.seconds).toBe(7);

      act(() => { jest.advanceTimersByTime(4000); });

      expect(result.current.seconds).toBe(7);

      act(() => { result.current.start(); });
      expect(result.current.seconds).toBe(3);
    });
  });

  describe('pause', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('sets isRunning to false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      expect(result.current.isRunning).toBe(true);

      act(() => { result.current.pause(); });

      expect(result.current.isRunning).toBe(false);
    });

    test('time does not change after pausing', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { jest.advanceTimersByTime(3000); });
      expect(result.current.seconds).toBe(7);

      act(() => { result.current.pause(); });

      act(() => { jest.advanceTimersByTime(5000); });
      expect(result.current.seconds).toBe(7);
    });

    test('has no effect when already paused', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { result.current.pause(); });
      act(() => { result.current.pause(); });

      expect(result.current.isRunning).toBe(false);

      act(() => { jest.advanceTimersByTime(5000); });
      expect(result.current.seconds).toBe(10);
    });
  });

  describe('resume', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('sets isRunning to true', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      expect(result.current.isRunning).toBe(false);

      act(() => { result.current.resume(); });

      expect(result.current.isRunning).toBe(true);
    });

    test('continues countdown from where it was paused', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { jest.advanceTimersByTime(3000); });
      expect(result.current.seconds).toBe(7);

      act(() => { result.current.pause(); });

      act(() => { jest.advanceTimersByTime(5000); });
      expect(result.current.seconds).toBe(7);

      act(() => { result.current.resume(); });

      act(() => { jest.advanceTimersByTime(2000); });
      expect(result.current.seconds).toBe(5);
    });
  });

  describe('restart', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('resets time to new expiryTimestamp', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      expect(result.current.seconds).toBe(10);

      act(() => { result.current.restart(getExpiryTimestamp(20)); });

      expect(result.current.seconds).toBe(20);
    });

    test('starts automatically after restart by default', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10), autoStart: false })
      );

      act(() => { result.current.restart(getExpiryTimestamp(20)); });

      expect(result.current.isRunning).toBe(true);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.seconds).toBe(17);
    });

    test('does not start when autoStart is false', () => {
      const { result } = renderHook(() =>
        useTimer({ expiryTimestamp: getExpiryTimestamp(10) })
      );

      act(() => { result.current.restart(getExpiryTimestamp(20), false); });

      expect(result.current.isRunning).toBe(false);

      act(() => { jest.advanceTimersByTime(3000); });

      expect(result.current.seconds).toBe(20);
    });
  });

});
