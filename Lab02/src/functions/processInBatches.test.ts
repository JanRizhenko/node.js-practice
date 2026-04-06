import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { processInBatches } from './processInBatches.js';

describe('processInBatches', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return empty array when items is empty', async () => {
        const processor = jest.fn<(batch: number[]) => Promise<number[]>>();

        const result = await processInBatches([], 3, processor);

        expect(result).toEqual([]);
        expect(processor).not.toHaveBeenCalled();
    });

    it('should return first batch without processing', async () => {
        const processor = jest.fn<(batch: number[]) => Promise<number[]>>()
            .mockResolvedValue([20, 40, 60]);

        const result = await processInBatches([1, 2, 3, 4, 5, 6], 3, processor);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });

    it('should process subsequent batches with processor', async () => {
        const processor = jest.fn<(batch: number[]) => Promise<number[]>>()
            .mockResolvedValue([8, 10]);

        const result = await processInBatches([1, 2, 3, 4, 5], 3, processor);

        expect(processor).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(5);
    });

    it('should return correct total length', async () => {
        const processor = jest.fn<(batch: string[]) => Promise<string[]>>()
            .mockResolvedValue(['X', 'X', 'X']);

        const result = await processInBatches(
            ['a', 'b', 'c', 'd', 'e', 'f'],
            3,
            processor
        );

        expect(result).toHaveLength(6);
    });
});