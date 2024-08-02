import { getDbConnection } from './db';
import { ClosetItem } from './favorite';

export async function addRecentlyViewedOutfitSuggestion(
  userId: string,
  selectedItem: ClosetItem,
  generatedItems: ClosetItem[]
): Promise<void> {
  const db = await getDbConnection();
  try {
    await db.exec('BEGIN TRANSACTION');
    const result = await db.run(
      "INSERT INTO UserRecentlyViewedCombination (userId, viewedAt) VALUES (?, ?)",
      userId,
      new Date().toISOString()
    );

    console.log('recentCombinationId:');
    const recentCombinationId = result.lastID;

    const insertPromises = generatedItems.map((item) =>
      db.run(
        'INSERT INTO RecentlyViewedCombination (recentCombinationId, clothId, isGenerated) VALUES (?, ?, ?)',
        recentCombinationId,
        item.clothId,
        true
      )
    );
    await Promise.all(insertPromises);

    await db.run(
      'INSERT INTO RecentlyViewedCombination (recentCombinationId, clothId, isGenerated) VALUES (?, ?, ?)',
      recentCombinationId,
      selectedItem.clothId,
      false
    );

    await db.exec('COMMIT');
    console.log('Recently viewed outfit suggestion is added successfully');
  } catch (error) {
    await db.exec('ROLLBACK');
    console.error(
      'An error occurred while adding recently viewed outfit suggestion:',
      error
    );
  } finally {
    await db.close();
  }
}
