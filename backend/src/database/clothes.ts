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
    seasons: number[],
    typeId: number
): Promise<void> {
    const db = await getDbConnection();
    try {
        const query = `
            INSERT INTO Clothes (userId, description, imgSrc, typeId)
            VALUES (?, ?, ?, ?)
        `;
    const result = await db.run(query, [userId, description, imgSrc, typeId]);
    const clothId = result.lastID;

    for (const season of seasons) {
      const seasonQuery = `
                INSERT INTO ClothesSeason (clothId, seasonId)
                VALUES (?, ?)
            `;
      await db.run(seasonQuery, [clothId, season]);
    }
  } catch (error) {
    console.error('Error adding cloth:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export async function updateCloth(
  userId: string,
  clothId: number,
  description: string,
  seasons: number[]
): Promise<void> {
  const db = await getDbConnection();
  try {
    const updateClothQuery = `UPDATE Clothes SET description = ? WHERE userId = ? AND clothId = ?`;
    await db.run(updateClothQuery, [description, userId, clothId]);

    await db.run('BEGIN TRANSACTION');

    try {
      const deleteSeasonsQuery = `DELETE FROM ClothesSeason WHERE clothId = ?`;
      await db.run(deleteSeasonsQuery, [clothId]);

      for (const seasonId of seasons) {
        const insertSeasonQuery = `INSERT INTO ClothesSeason (clothId, seasonId) VALUES (?, ?)`;
        console.log('Running inserting season query:', insertSeasonQuery, [
          clothId,
          seasonId,
        ]);
        await db.run(insertSeasonQuery, [clothId, seasonId]);
      }
      await db.run('COMMIT');
    } catch (error) {
      await db.run('ROLLBACK');
      console.error('Transaction failed:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error updating cloth:', error);
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
            WHERE userId = ? AND typeId = ? AND imgSrc NOT NULL
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

export async function getAllClothesByTypeAndSeason(
    userId: string,
    typeId: number,
    seasonId: number
): Promise<Cloth[]> {
    const db = await getDbConnection();
    try {
        const query = `
            SELECT * FROM Clothes
            WHERE userId = ? AND typeId = ? AND season = ? AND imgSrc IS NOT NULL
        `;

        const clothes = await db.all(query, [userId, typeId, seasonId])
        return clothes
    } catch (error) {
        console.error("Error getting all clothes by type and season:", error);
        throw error;
    } finally {
        await db.close();
    }
}

export async function getAllClothesByTypeAndSeasons(
  userId: string,
  typeId: number,
  seasonIds: number[]
): Promise<Cloth[]> {
  const db = await getDbConnection();
  try {
    const questionMarksForSeasons = seasonIds.map(() => '?').join(', ');
    const query = `
      SELECT Clothes.*
      FROM Clothes
      INNER JOIN ClothesSeason ON Clothes.clothId = ClothesSeason.clothId
      WHERE Clothes.userId = ? 
      AND Clothes.typeId = ?
      AND ClothesSeason.seasonId IN (${questionMarksForSeasons})
      AND Clothes.imgSrc IS NOT NULL
    `;
    const clothes = await db.all(query, [userId, typeId, ...seasonIds]);
    return clothes;
  } catch (error) {
    console.error('Error getting all clothes by type and seasons:', error);
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
            WHERE userId = ? AND typeId = ? AND imgSrc NOT NULL
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

export async function deleteCloth(userId: string, typeId: number, clothId: number): Promise<void> {
    const db = await getDbConnection();
    const defaultImagePaths: { [key: number]: string } = {
        1: 'default_images/top.png',
        2: 'default_images/bottom.png',
        3: 'default_images/outer.png',
        4: 'default_images/shoes.png',
        5: 'default_images/bag.png',
        6: 'default_images/accessories.png',
    };

    const defaultImagePath = `http://localhost:8888/${defaultImagePaths[typeId]}` || '/default_images/default';
    try {
        db.run(
            `UPDATE Clothes 
            SET imgSrc = ?
            WHERE clothId = ? AND typeId = ?`,
            [null, clothId, typeId],
        );
    } catch (error) {
      console.error('Error deleting cloth:', error);
      throw error;
    }
}

export async function getClothSeasons(clothId: number): Promise<number[]> {
  const db = await getDbConnection();
  try {
    const query = `SELECT seasonId FROM ClothesSeason WHERE clothId = ?`;
    const rows = await db.all(query, [clothId]);
    return rows.map((row) => row.seasonId);
  } catch (error) {
    console.error('Error getting cloth seasons:', error);
    throw error;
  } finally {
    await db.close();
  }
}
