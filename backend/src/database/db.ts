import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function getDbConnection(): Promise<Database> {
  const db = await open({
    filename: `${__dirname}/db.sqlite`,
    driver: sqlite3.Database,
  });

  db.run("PRAGMA foreign_keys = ON;");
  return db;
}

export async function initializeDatabase(): Promise<void> {
  const db = await getDbConnection();

  const schemaFilePath = path.join(__dirname, "schema.sql");
  console.log(__dirname);
  const schema = fs.readFileSync(schemaFilePath, "utf8");
  await db.exec(schema);


  const checkClothingTypeTableQuery = `SELECT COUNT(*) as count FROM ClothingType`;
  const result = await db.get(checkClothingTypeTableQuery);

  if (result.count === 0) {
    const insertQuery = `
          INSERT INTO ClothingType (typeId, typeName) VALUES
          (0, 'default'),
          (1, 'top'),
          (2, 'bottom'),
          (3, 'outer'),
          (4, 'shoes'),
          (5, 'bag'),
          (6, 'accessories')
      `;
    await db.run(insertQuery);
  }

  const checkSeasonTableQuery = `SELECT COUNT(*) as count FROM Season`;
  const seasonResult = await db.get(checkSeasonTableQuery);

  if (seasonResult.count === 0) {
    const insertSeasonQuery = `
          INSERT INTO Season (seasonId, seasonName) VALUES
          (0, 'default'),
          (1, 'spring/fall'),
          (2, 'summer'),
          (3, 'winter')
      `;
    await db.run(insertSeasonQuery);
  }
}
