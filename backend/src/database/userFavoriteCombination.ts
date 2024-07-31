import { getDbConnection } from "./db";

interface UserFavoriteCombination {
    favoriteCombinationId: number,
    userId: string
}

export async function addUserFavoriteCombination(
    userId: string,
): Promise<void> {
    const db = await getDbConnection();
    try {
        const query = `
            INSERT INTO UserFavoriteCombination (userId)
            VALUES (?)
        `;
        await db.run(query, [userId]);
    } catch (error) {
        console.error("Error adding user favorite combination:", error);
        throw error;
    } finally {
        await db.close();
    }
}