// database.ts
import * as SQLite from 'expo-sqlite';

export type User = {
  id: number;
  name: string;
};

let dbInstance: Promise<SQLite.SQLiteDatabase> | null = null;

export const openDatabase = async () => {
  if (!dbInstance) {
    dbInstance =  SQLite.openDatabaseAsync('SetanjeDB.db');
  }
  return dbInstance;
};

export const initDB = async (db: SQLite.WebSQLDatabase) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    DROP TABLE IF EXISTS Uporabniki;
    CREATE TABLE IF NOT EXISTS Uporabniki (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS Poti (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL,pricakovana_dolzina_minute INTEGER NOT NULL, pricakovana_dolzina_m INTEGER NOT NULL, tezavnost INTEGER NOT NULL, opis TEXT NOT NULL);
    INSERT INTO Uporabniki (name) VALUES ('John Doe');
    INSERT INTO Uporabniki (name) VALUES ('Jane Doe');
    INSERT INTO Uporabniki (name) VALUES ('Mike Smith');
  `);
};

export const fetchUsers = async (db: SQLite.WebSQLDatabase): Promise<User[]> => {
  const allRows = await db.getAllAsync('SELECT * FROM Uporabniki');
  return allRows.map(row => ({
    id: row.id,
    name: row.name,
  }));
};
