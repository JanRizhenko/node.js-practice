import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { retryOperation } from './retryOperation.js';

jest.mock('./delay.js', () => ({
    delay: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
}));

describe('retryOperation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should retry and return result after failure', async () => {
        const operation = jest.fn<() => Promise<string>>()
            .mockRejectedValueOnce(new Error('fail'))
            .mockResolvedValue('success');

        const result = await retryOperation(operation, 3);

        expect(result).toBe('success');
        expect(operation).toHaveBeenCalledTimes(2);
    });
    it('should wrap non-Error rejections in an Error', async () => {
        const operation = jest.fn<() => Promise<string>>()
            .mockImplementation(() => Promise.reject('oops'));

        await expect(retryOperation(operation, 1)).rejects.toThrow('oops');
    });
    it('should throw after all retries exhausted', async () => {
        const operation = jest.fn<() => Promise<string>>()
            .mockRejectedValue(new Error('permanent fail'));

        await expect(retryOperation(operation, 3)).rejects.toThrow('permanent fail');
        expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should use default maxRetries of 3', async () => {
        const operation = jest.fn<() => Promise<string>>()
            .mockRejectedValue(new Error('fail'));

        await expect(retryOperation(operation)).rejects.toThrow('fail');
        expect(operation).toHaveBeenCalledTimes(3);
    });
});