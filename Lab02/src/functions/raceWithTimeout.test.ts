import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { raceWithTimeout } from './raceWithTimeout.js';

describe('raceWithTimeout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('should return result when promise resolves before timeout', async () => {
        const promise = Promise.resolve('success');

        const result = await raceWithTimeout<string>(promise, 1000);

        expect(result).toBe('success');
    });

    it('should throw TimeoutError when promise takes too long', async () => {
        const promise = new Promise<string>(resolve =>
            setTimeout(() => resolve('late'), 500)
        );

        await expect(raceWithTimeout<string>(promise, 50))
            .rejects.toThrow('Operation timed out after 50ms');
    });

    it('should include timeoutMs in error', async () => {
        const promise = new Promise<string>(resolve =>
            setTimeout(() => resolve('late'), 500)
        );

        try {
            await raceWithTimeout<string>(promise, 50);
        } catch (error) {
            expect((error as any).timeoutMs).toBe(50);
        }
    });
});