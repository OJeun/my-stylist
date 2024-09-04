import { Cloth } from './clothes';
import { getDbConnection } from './db';

export interface RecentlyViewedCombination {
  recentlyViewedOutfitCombinationId: number;
  userId: string;
  selectedItem: Cloth;
  generatedItems: Cloth[];
}

export async function addRecentlyViewedOutfitSuggestion(
  userId: string,
  selectedItem: Cloth,
  generatedItems: Cloth[]
): Promise<void> {
  const db = await getDbConnection();
  try {
    // Delete the oldest data row if it's more than 5
    await deleteOldRecentlyViewedOutfit(userId, 5);

    const result = await db.run(
      'INSERT INTO UserRecentlyViewedCombination (userId, viewedAt) VALUES (?, ?)',
      userId,
      new Date().toISOString()
    );

    const recentCombinationId = result.lastID;

    for (const item of generatedItems) {
      await db.exec('BEGIN TRANSACTION');
      try {
        await db.run(
          'INSERT INTO RecentlyViewedCombination (recentCombinationId, clothId, isGenerated) VALUES (?, ?, ?)',
          recentCombinationId,
          item.clothId,
          true
        );
        await db.exec('COMMIT');
      } catch (error) {
        await db.exec('ROLLBACK');
        throw error;
      }
    }

    await db.exec('BEGIN TRANSACTION');
    try {
      await db.run(
        'INSERT INTO RecentlyViewedCombination (recentCombinationId, clothId, isGenerated) VALUES (?, ?, ?)',
        recentCombinationId,
        selectedItem.clothId,
        false
      );
      await db.exec('COMMIT');
    } catch (error) {
      await db.exec('ROLLBACK');
      throw error;
    }

    console.log(
      `Recently viewed is added with ${
        generatedItems.length + 1
      } items`
    );
  } catch (error) {
    console.error(
      'An error occurred while adding recently viewed outfit suggestion:',
      error
    );
  } finally {
    await db.close();
  }
}

export async function getRecentlyViewedOutfitSuggestion(
  userId: string
): Promise<RecentlyViewedCombination[]> {
  const db = await getDbConnection();
  try {
    const result = await db.all(
      'SELECT * FROM UserRecentlyViewedCombination WHERE userId = ? ORDER BY viewedAt DESC',
      userId
    );

    const recentlyViewedOutfit = await Promise.all(
      result.map(async (row) => {
        const recentlyViewedOutfitCombinationId = row.recentCombinationId;

        const selectedItem = await db.get(
          'SELECT Clothes.clothId, Clothes.typeId, Clothes.imgSrc FROM Clothes JOIN RecentlyViewedCombination ON RecentlyViewedCombination.clothId = Clothes.clothId WHERE recentCombinationId = ? AND isGenerated = 0',
          recentlyViewedOutfitCombinationId
        );

        const generatedItems = await db.all(
          'SELECT Clothes.clothId, Clothes.typeId, Clothes.imgSrc FROM Clothes JOIN RecentlyViewedCombination ON RecentlyViewedCombination.clothId = Clothes.clothId WHERE recentCombinationId = ? AND isGenerated = 1',
          recentlyViewedOutfitCombinationId
        );
        return {
          recentlyViewedOutfitCombinationId,
          userId,
          selectedItem,
          generatedItems,
        };
      })
    );

    return recentlyViewedOutfit;
  } catch (error) {
    console.error(
      'An error occurred while fetching recently viewed outfit suggestion:',
      error
    );
    return [];
  } finally {
    await db.close();
  }
}

async function deleteOldRecentlyViewedOutfit(userId: string, limit: number) {
  const db = await getDbConnection();
  let rows = await db.all(
    'SELECT * FROM UserRecentlyViewedCombination WHERE userId = ? ORDER BY viewedAt ASC',
    userId
  );

  while (rows.length >= limit) {
    await db.run(
      'DELETE FROM UserRecentlyViewedCombination WHERE recentCombinationId = ?',
      rows[0].recentCombinationId
    );
    console.log('Old recently viewed data is deleted');
    rows = await db.all(
      'SELECT * FROM UserRecentlyViewedCombination WHERE userId = ? ORDER BY viewedAt ASC',
      userId
    );
  }
}

