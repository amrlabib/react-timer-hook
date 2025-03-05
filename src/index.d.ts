interface TimerSettings {
    autoStart?: boolean;
    expiryTimestamp: Date;
    onExpire?: () => void;
    enableMilliseconds?: boolean;
}

interface TimerResult {
    totalMilliseconds: number;
    totalSeconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    resume: () => void;
    restart: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
}

export function useTimer(settings: TimerSettings): TimerResult

interface StopwatchSettings {
    autoStart?: boolean;
    offsetTimestamp?: Date;
    enableMilliseconds?: boolean;
}

interface StopwatchResult {
    totalMilliseconds: number;
    totalSeconds: number;
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    reset: (offsetTimestamp?: Date, autoStart?: boolean) => void;
}

export function useStopwatch(settings?: StopwatchSettings): StopwatchResult

interface TimeSettings {
    format?: '12-hour';
}

interface TimeResult {
    milliseconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    ampm: '' | 'pm' | 'am';
}

export function useTime(settings?: TimeSettings): TimeResult
