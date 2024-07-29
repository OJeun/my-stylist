import path from 'path';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

let db: Database | null = null;

export async function getDbConnection(): Promise<Database> {
  if (db) return db;

  db = new Database('./src/database/db.sqlite')

  return db;
}

export async function initializeDatabase(): Promise<void> {
    const db = await getDbConnection();

    const schemaFilePath = path.join(__dirname, 'schema.sql');
    console.log(__dirname)
    const schema = fs.readFileSync(schemaFilePath, 'utf8');
    await db.exec(schema);
}