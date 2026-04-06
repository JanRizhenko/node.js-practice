import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { fetchUserProfiles } from './fetchUserProfiles.js';

jest.mock('./delay.js', () => ({
    delay: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
}));

describe('fetchUserProfiles', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return array of users', async () => {
        const userIds = ['101', '102', '103'];
        const result = await fetchUserProfiles(userIds);
        expect(result).toHaveLength(3);
    })
    it('should throw if userIds is empty', async () => {
        await expect(fetchUserProfiles([])).rejects.toThrow('userIds cannot be empty');
    });
    it('should return correct profile format', async () => {
        const result = await fetchUserProfiles(['101']);
        expect(result[0]).toEqual({
            id: '101',
            name: 'User 101',
            email: 'user_101@test.ua'
        });
    });
})