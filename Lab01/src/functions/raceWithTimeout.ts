import { TimeoutError } from '../types/index.js';

export const raceWithTimeout = async (
    promise: Promise<unknown>,
    timeoutMs: number
): Promise<unknown> => {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            const error = new Error(`Operation timed out after ${timeoutMs}ms`) as TimeoutError;
            error.timeoutMs = timeoutMs;
            reject(error);
        }, timeoutMs);
    });

    return await Promise.race([promise, timeoutPromise]);
};