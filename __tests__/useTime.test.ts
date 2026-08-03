import { renderHook, act } from '@testing-library/react';
import useTime from '../src/useTime';

function getLocalDateAtTime(hours: number, minutes: number, seconds: number, ms = 0): Date {
  const d = new Date();
  d.setHours(hours, minutes, seconds, ms);
  return d;
}

describe('useTime', () => {

  // ─── INPUTS ───────────────────────────────────────────────────────────────

  describe('format', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns 24-hour format by default', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 0));
      const { result } = renderHook(() => useTime());

      expect(result.current.hours).toBe(14);
      expect(result.current.ampm).toBe('');
    });

    test('returns 12-hour format when specified', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 0));
      const { result } = renderHook(() => useTime({ format: '12-hour' }));

      expect(result.current.hours).toBe(2);
      expect(result.current.ampm).toBe('pm');
    });
  });

  describe('interval', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('ticks every second by default', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45));
      const { result } = renderHook(() => useTime());

      expect(result.current.seconds).toBe(45);

      act(() => { jest.advanceTimersByTime(2000); });

      expect(result.current.seconds).toBe(47);
    });

    test('ticks at custom 100ms rate', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45, 0));
      const { result } = renderHook(() => useTime({ interval: 100 }));

      expect(result.current.milliseconds).toBe(0);

      act(() => { jest.advanceTimersByTime(500); });

      expect(result.current.milliseconds).toBe(500);
    });

    test('does not tick when set to 0', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45));
      const { result } = renderHook(() => useTime({ interval: 0 }));

      expect(result.current.seconds).toBe(45);

      act(() => { jest.advanceTimersByTime(5000); });

      expect(result.current.seconds).toBe(45);
    });
  });

  // ─── OUTPUTS ──────────────────────────────────────────────────────────────

  describe('milliseconds, seconds, minutes, hours', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('returns correct values from current time', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45, 0));
      const { result } = renderHook(() => useTime());

      expect(result.current.hours).toBe(14);
      expect(result.current.minutes).toBe(30);
      expect(result.current.seconds).toBe(45);
      expect(result.current.milliseconds).toBe(0);
    });

    test('returns correct milliseconds from current time', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45, 750));
      const { result } = renderHook(() => useTime({ interval: 100 }));

      expect(result.current.milliseconds).toBe(750);
    });

    test('updates values as time advances', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 45));
      const { result } = renderHook(() => useTime());

      expect(result.current.seconds).toBe(45);
      expect(result.current.minutes).toBe(30);

      act(() => { jest.advanceTimersByTime(30000); }); // 30 seconds

      expect(result.current.seconds).toBe(15);
      expect(result.current.minutes).toBe(31);
    });

    test('rolls over seconds and increments minutes', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 30, 59));
      const { result } = renderHook(() => useTime());

      expect(result.current.seconds).toBe(59);
      expect(result.current.minutes).toBe(30);

      act(() => { jest.advanceTimersByTime(1000); });

      expect(result.current.seconds).toBe(0);
      expect(result.current.minutes).toBe(31);
    });
  });

  describe('ampm', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('is empty string in 24-hour mode', () => {
      jest.setSystemTime(getLocalDateAtTime(14, 0, 0));
      const { result } = renderHook(() => useTime());

      expect(result.current.ampm).toBe('');
    });

    test('is am before noon', () => {
      jest.setSystemTime(getLocalDateAtTime(9, 0, 0));
      const { result } = renderHook(() => useTime({ format: '12-hour' }));

      expect(result.current.ampm).toBe('am');
    });

    test('is pm after noon', () => {
      jest.setSystemTime(getLocalDateAtTime(15, 0, 0));
      const { result } = renderHook(() => useTime({ format: '12-hour' }));

      expect(result.current.ampm).toBe('pm');
    });

    test('is pm at exactly noon', () => {
      jest.setSystemTime(getLocalDateAtTime(12, 0, 0));
      const { result } = renderHook(() => useTime({ format: '12-hour' }));

      expect(result.current.hours).toBe(0);
      expect(result.current.ampm).toBe('pm');
    });

    test('is am at midnight', () => {
      jest.setSystemTime(getLocalDateAtTime(0, 0, 0));
      const { result } = renderHook(() => useTime({ format: '12-hour' }));

      expect(result.current.hours).toBe(0);
      expect(result.current.ampm).toBe('am');
    });
  });
});
