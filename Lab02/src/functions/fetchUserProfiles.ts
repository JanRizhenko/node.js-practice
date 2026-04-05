import { delay } from './delay.js';
import { UserProfile } from '../types/index.js';

export const fetchUserProfiles = async (userIds: string[]): Promise<UserProfile[]> => {
    if (userIds.length === 0) {
        return [];
    }

    const profilePromises = userIds.map(async (id: string): Promise<UserProfile> => {
        const randomDelay = Math.floor(Math.random() * 101) + 50;
        await delay(randomDelay);

        return {
            id,
            name: `User ${id}`,
            email: `user_${id}@test.ua`
        };
    });

    return await Promise.all(profilePromises);
};