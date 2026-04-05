import { TimeoutError } from '../types/index.js';

export const raceWithTimeout = async <T>(
    promise: Promise<T>,
    timeoutMs: number
): Promise<T> => {
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
            const error = new Error(`Operation timed out after ${timeoutMs}ms`) as TimeoutError;
            error.timeoutMs = timeoutMs;
            reject(error);
        }, timeoutMs);
    });

    return await Promise.race([promise, timeoutPromise]);
};