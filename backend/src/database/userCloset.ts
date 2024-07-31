import { getDbConnection } from "./db";

interface UserCloset {
    userId: string,
    clothId: number
}

export async function addUserCloset(
    userId: string,
    clothId: number
): Promise<void> {
    const db = await getDbConnection();
    try {
        const query = `
            INSERT INTO UserCloset (userId, clothId)
            VALUES (?, ?)
        `;
        await db.run(query, [userId, clothId]);
    } catch (error) {
        console.error("Error adding user closet:", error);
        throw error;
    } finally {
        await db.close();
    }
}