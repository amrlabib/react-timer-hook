import { renderHook, act } from '@testing-library/react';
import useStopwatch from '../src/useStopwatch';

function getExpiryTimestamp(seconds: number): Date {
  const time = new Date();
  time.setSeconds(time.getSeconds() + seconds);
  return time;
}

describe('useStopwatch', () => {

	describe('autoStart', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

		test('autoStart default value is true', () => {
			const { result } = renderHook(() =>
        useStopwatch()
      );

      expect(result.current.isRunning).toBe(true);
		});

		test('setting autoStart to false', () => {
			const { result } = renderHook(() =>
        useStopwatch({ autoStart: false })
      );

      expect(result.current.isRunning).toBe(false);

      act(() => { jest.advanceTimersByTime(1000); });

      expect(result.current.seconds).toBe(0);
		});		
	});


	describe('offsetTimestamp', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('default offsetTimestamp correct values', () => {
			const { result } = renderHook(() =>
        useStopwatch()
      );

			expect(result.current.hours).toBe(0);
			expect(result.current.minutes).toBe(0);
			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);

			act(() => { jest.advanceTimersByTime(3000); });

			expect(result.current.hours).toBe(0);
			expect(result.current.minutes).toBe(0);
			expect(result.current.seconds).toBe(3);
		});

		test('custom offsetTimestamp correct values', () => {
			const { result } = renderHook(() =>
        useStopwatch({ offsetTimestamp: getExpiryTimestamp(60 * 5) })
      );

			expect(result.current.hours).toBe(0);
			expect(result.current.minutes).toBe(5);
			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);

			act(() => { jest.advanceTimersByTime(3000); });

			expect(result.current.hours).toBe(0);
			expect(result.current.minutes).toBe(5);
			expect(result.current.seconds).toBe(3);
		});

		test('negative offsetTimestamp values', () => {
			const { result } = renderHook(() =>
        useStopwatch({ autoStart: false, offsetTimestamp: getExpiryTimestamp(-60 * 5) })
      );

			expect(result.current.hours).toBe(0);
			expect(result.current.minutes).toBe(0);
			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);
		});
	});

	describe('interval', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

		test('100ms interval', () => {	
			const { result } = renderHook(() =>
        useStopwatch({ interval: 100  })
      );

			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);

			act(() => { jest.advanceTimersByTime(500); });

			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(500);

			act(() => { jest.advanceTimersByTime(1550); });

			expect(result.current.seconds).toBe(2);
			expect(result.current.milliseconds).toBe(0);
		});

		test('0ms interval', () => {	
			const { result } = renderHook(() =>
        useStopwatch({ interval: 0  })
      );

			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);

			act(() => { jest.advanceTimersByTime(500); });

			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);

			act(() => { jest.advanceTimersByTime(1550); });

			expect(result.current.seconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);
		});
	});


	describe('totalMilliseconds, totalSeconds, milliseconds, seconds, minutes, hours, days', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

		test('returning correct values with 1s interval', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			expect(result.current.totalMilliseconds).toBe(0);
			expect(result.current.totalSeconds).toBe(0);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(0);
			expect(result.current.minutes).toBe(0);
			expect(result.current.hours).toBe(0);
			expect(result.current.days).toBe(0);

			act(() => { jest.advanceTimersByTime(2000); }); // 2 seconds

			expect(result.current.totalMilliseconds).toBe(2000);
			expect(result.current.totalSeconds).toBe(2);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(2);
			expect(result.current.minutes).toBe(0);
			expect(result.current.hours).toBe(0);
			expect(result.current.days).toBe(0);

			act(() => { jest.advanceTimersByTime(2000); }); // 2 seconds

			expect(result.current.totalMilliseconds).toBe(4000);
			expect(result.current.totalSeconds).toBe(4);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(4);
			expect(result.current.minutes).toBe(0);
			expect(result.current.hours).toBe(0);
			expect(result.current.days).toBe(0);

			act(() => { jest.advanceTimersByTime(5*60*1000); }); // 5 minutes

			expect(result.current.totalMilliseconds).toBe(304000);
			expect(result.current.totalSeconds).toBe(304);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(4);
			expect(result.current.minutes).toBe(5);
			expect(result.current.hours).toBe(0);
			expect(result.current.days).toBe(0);


			act(() => { jest.advanceTimersByTime(2*60*60*1000); }); // 2 hours

			expect(result.current.totalMilliseconds).toBe(7504000);
			expect(result.current.totalSeconds).toBe(7504);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(4);
			expect(result.current.minutes).toBe(5);
			expect(result.current.hours).toBe(2);
			expect(result.current.days).toBe(0);

			act(() => { jest.advanceTimersByTime(1*24*60*60*1000); }); // 1 day

			expect(result.current.totalMilliseconds).toBe(93904000);
			expect(result.current.totalSeconds).toBe(93904);
			expect(result.current.milliseconds).toBe(0);
			expect(result.current.seconds).toBe(4);
			expect(result.current.minutes).toBe(5);
			expect(result.current.hours).toBe(2);
			expect(result.current.days).toBe(1);

		});
	});


	describe('isRunning', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

		test('isRunning is false after pause', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => result.current.pause());

      expect(result.current.isRunning).toBe(false);
		});

		test('isRunning is true after start', () => {	
			const { result } = renderHook(() =>
        useStopwatch({ autoStart: false })
      );

			act(() => result.current.start());

      expect(result.current.isRunning).toBe(true);
		});
	});

	describe('start', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());
		test('calling start will start the stopwatch', () => {	
			const { result } = renderHook(() =>
        useStopwatch({ autoStart: false })
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.isRunning).toBe(false);

			expect(result.current.seconds).toBe(0);

			act(() => result.current.start());

			expect(result.current.isRunning).toBe(true);

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.seconds).toBe(2);
		});


		test('calling start while running has no effect', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.isRunning).toBe(true);

			expect(result.current.seconds).toBe(5);

			act(() => result.current.start());

			expect(result.current.isRunning).toBe(true);

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.seconds).toBe(7);
		});


		test('calling start after pause will resume', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			act(() => result.current.pause());

			act(() => { jest.advanceTimersByTime(2000); });

			act(() => result.current.start());

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.seconds).toBe(7);
		});
	});

	describe('pause', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());
		test('calling pause will stop the stopwatch isRunning should be false', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			expect(result.current.isRunning).toBe(true);

			act(() => result.current.pause());

			expect(result.current.isRunning).toBe(false);
		});


		test('calling pause will not advance the stopwatch', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.seconds).toBe(5);

			act(() => result.current.pause());

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.seconds).toBe(5);
		});


		test('calling pause on paused stopwatch has no effect', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			expect(result.current.isRunning).toBe(true);

			act(() => result.current.pause());

			expect(result.current.isRunning).toBe(false);

			act(() => result.current.pause());

			expect(result.current.isRunning).toBe(false);
		});
	});


	describe('reset', () => {
		beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());
		test('calling reset will reset the stopwatch to 0', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.isRunning).toBe(true);
			expect(result.current.seconds).toBe(5);

			act(() => result.current.reset());

			expect(result.current.seconds).toBe(0);

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.isRunning).toBe(true);
			expect(result.current.seconds).toBe(2);
		});


		test('calling reset with autoStart false will reset to 0 without autoStart', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.isRunning).toBe(true);
			expect(result.current.seconds).toBe(5);

			act(() => result.current.reset(undefined, false));

			expect(result.current.seconds).toBe(0);

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.isRunning).toBe(false);
			expect(result.current.seconds).toBe(0);
		});

		test('calling reset with custom offsetTimestamp', () => {	
			const { result } = renderHook(() =>
        useStopwatch()
      );

			act(() => { jest.advanceTimersByTime(5000); });

			expect(result.current.isRunning).toBe(true);
			expect(result.current.seconds).toBe(5);

			act(() => result.current.reset(getExpiryTimestamp(3)));

			expect(result.current.seconds).toBe(3);

			act(() => { jest.advanceTimersByTime(2000); });

			expect(result.current.isRunning).toBe(true);
			expect(result.current.seconds).toBe(5);
		});
	});
});