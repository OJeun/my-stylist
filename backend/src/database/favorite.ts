import { getDbConnection } from "./db";

export interface ClosetItem {
  clothId: string;
  category: string;
  season: string;
  imageSrc: string;
}

export async function addFavoriteCombination(
  userId: string,
  selectedItem: ClosetItem,
  generatedItems: ClosetItem[]
): Promise<void> {
  const db = await getDbConnection();
  try {
    await db.exec("BEGIN TRANSACTION");
    const result = await db.run(
      "INSERT INTO userFavouriteCombination (userId) VALUES (?)",
      userId
    );

    const favouriteCombinationId = result.lastID;

    const insertPromises = generatedItems.map((item) =>
      db.run(
        "INSERT INTO FavouriteCombinationClothes (favouriteCombinationId, clothesId, isGenerated) VALUES (?, ?)",
        favouriteCombinationId,
        item.clothId,
        true
      )
    );
    await Promise.all(insertPromises);

    await db.run(
        "INSERT INTO FavouriteCombinationClothes (favouriteCombinationId, clothesId, isGenerated) VALUES (?, ?)",
        favouriteCombinationId,
        selectedItem.clothId,
        false
      )

    await db.exec("COMMIT");
    console.log("Favourite items saved successfully");
  } catch (error) {
    await db.exec('ROLLBACK');
    console.error('An error occurred while saving favourite items:', error)
  } finally {
    await db.close();
  }
}
