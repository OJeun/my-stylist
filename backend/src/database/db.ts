import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;


export async function getDbConnection(): Promise<Database> {
  const db = await open({
    filename: `${__dirname}/db.sqlite`,
    driver: sqlite3.Database,
  });
  console.log('Database connection established');
  return db;
}

export async function initializeDatabase(): Promise<void> {
    const db = await getDbConnection();

    const schemaFilePath = path.join(__dirname, 'schema.sql');
    console.log(__dirname)
    const schema = fs.readFileSync(schemaFilePath, 'utf8');
    await db.exec(schema);
}