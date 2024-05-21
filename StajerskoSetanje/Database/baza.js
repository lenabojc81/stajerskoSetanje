
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('baza.db');

export const initializeDatabase = () => {
  console.log('Initializing database...');
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Uporabniki (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        priimek TEXT, 
        uporabnisko_ime VARCHAR(45), 
        geslo VARCHAR(45), 
        telefonska_stevilka TEXT, 
        drzava TEXT, 
        googleId TEXT
      );`,
      [],
      () => { console.log('Table Uporabniki created successfully'); },
      (_, error) => { console.log('Error creating table Uporabniki:', error); }
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Pot (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        naziv TEXT, 
        pricakovana_dolzina_minute INT, 
        tezavnost TEXT, 
        opis_poti TEXT, 
        tema TEXT, 
        zacetna_lokacija TEXT
      );`,
      [],
      () => { console.log('Table Pot created successfully'); },
      (_, error) => { console.log('Error creating table Pot:', error); }
    );
    tx.executeSql(
      `INSERT INTO Uporabniki (name, priimek, uporabnisko_ime,geslo,telefonska_stevilka,drzava,googleId) VALUES (?, ?, ?, ?, ?, ?,?);`,
      [
          'SampleUsername',
          'sample@email.com',
          '	password123',
          '123456789',
          'Slovenija',
          '1234567890',
          '1234567890'
          
      ],
      (_, insertResult) => {
          // Success callback for the INSERT statement
          console.log('Row inserted successfully:', insertResult);
      },
      (_, error) => {
          // Error callback for the INSERT statement
          console.error('Error inserting row:', error);
      }
  );






  tx.executeSql(
    `SELECT * FROM Uporabniki;`,
    [],
    (_, result) => {

        const rows = result.rows._array;

        console.log('Users:', rows);
    },
    (_, error) => {
      
        console.error('Error fetching activities:', error);
    }
);
  });
};
export default db;
