import { BatchProcessor } from '../types/index.js';

export const processInBatches = async (
    items: number[],
    batchSize: number,
    processor: BatchProcessor
): Promise<number[]> => {
    if (items.length === 0) {
        return [];
    }

    const results: number[] = [];
    const totalBatches = Math.ceil(items.length / batchSize);

    for (let i = 0; i < items.length; i += batchSize) {
        const batchNumber = Math.floor(i / batchSize) + 1;
        const batch = items.slice(i, Math.min(i + batchSize, items.length));

        console.log(`Обробка партії ${batchNumber}/${totalBatches}...`);

        if (batchNumber === 1) {
            results.push(...batch);
        } else {
            const processedBatch = await processor(batch);
            results.push(...processedBatch);
        }
    }

    return results;
};