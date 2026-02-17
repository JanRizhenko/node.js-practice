import {delay} from './delay.js';
import {AsyncOperation} from '../types/index.js';

export const retryOperation = async (
    operation: AsyncOperation,
    maxRetries: number = 3
): Promise<unknown> => {
    let lastError: Error = new Error('Unknown error');

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Спроба ${attempt}...`);
            return await operation();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));

            if (attempt < maxRetries) {
                await delay(150);
            }
        }
    }

    throw lastError;
};