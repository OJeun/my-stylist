import { getDbConnection } from "./db";

interface Cloth {
    clothId: string,
    description: string,
    imgSrc: string,
    season: number,
    typeId: number
}

export async function addCloth(
    userId: string,
    description: string,
    imgSrc: string,
    season: number,
    typeId: number
): Promise<void> {
    const db = await getDbConnection();
    try {
        const query = `
            INSERT INTO Clothes (userId, description, imgSrc, season, typeId)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.run(query, [userId, description, imgSrc, season, typeId]);
    } catch (error) {
        console.error("Error adding cloth:", error);
        throw error;
    } finally {
        await db.close();
    }
}  