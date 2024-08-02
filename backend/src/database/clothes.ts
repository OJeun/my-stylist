import { getDbConnection } from "./db";

interface Cloth {
    userId?: string,
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

export async function getFirstClotheByUserIdAndTypeId(
    userId: string,
    typeId: number
): Promise<Cloth> {
    const db = await getDbConnection();
    try {
        const query = `
            SELECT * FROM Clothes
            WHERE userId = ? AND typeId = ?
            LIMIT 1
        `;
        const cloth = await db.get(query, [userId, typeId]);
        return cloth;
    } catch (error) {
        console.error("Error getting first cloth by userId and typeId:", error);
        throw error;
    } finally {
        await db.close();
    }
}

export async function getClothByUserIdAndClothId(
  userId: string,
  clothId: number
): Promise<Cloth> {
  const db = await getDbConnection();
  try {
    const query = `SELECT * FROM Clothes WHERE userId = ? AND clothId = ?`;
    const item = await db.get(query, [userId, clothId]);
    return item;
  } catch (error) {
    console.error('Error fetching cloth:', error);
    throw error;
  }
}

export async function getClothesByUserIdAndTypeId(
    userId: string,
    typeId: number
): Promise<Cloth[]> {
    const db = await getDbConnection();
    try {
        const query = `
            SELECT * FROM Clothes
            WHERE userId = ? AND typeId = ?
        `;
        const clothes = await db.all(query, [userId, typeId]);
        return clothes;
    } catch (error) {
        console.error("Error getting clothes by userId and typeId:", error);
        throw error;
    } finally {
        await db.close();
    }
}

export async function deleteCloth(userId: string, clothId: number): Promise<void> {
    const db = await getDbConnection();
    try {
      const query = `DELETE FROM Clothes WHERE userId = ? AND clothId = ?`;
      await db.run(query, [userId, clothId]);
    } catch (error) {
      console.error('Error deleting cloth:', error);
      throw error;
    }
}
