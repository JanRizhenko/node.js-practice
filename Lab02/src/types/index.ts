export interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export type BatchProcessor<T> = (batch: T[]) => Promise<T[]>;

export type AsyncOperation<T> = () => Promise<T>;

export interface TimeoutError extends Error {
    timeoutMs: number;
}