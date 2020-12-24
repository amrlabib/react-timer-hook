interface TimerSettings {
    expiryTimestamp: number;
    onExpire?: () => void;
}

interface TimerResult {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    resume: () => void;
    restart: (newExpiryTimestamp: number) => void;
}

export function useTimer(settings: TimerSettings): TimerResult

interface StopwatchSettings {
    autoStart?: boolean;
    offsetTimestamp?: number;
}

interface StopwatchResult {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    reset: () => void;
}

export function useStopwatch(settings?: StopwatchSettings): StopwatchResult

interface TimeSettings {
    format?: '12-hour';
}

interface TimeResult {
    seconds: number;
    minutes: number;
    hours: number;
    ampm: '' | 'pm' | 'am';
}

export function useTime(settings?: TimeSettings): TimeResult
