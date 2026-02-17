export interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export type BatchProcessor = (batch: number[]) => Promise<number[]>;

export type AsyncOperation<T = unknown> = () => Promise<T>;

export interface TimeoutError extends Error {
    timeoutMs: number;
}