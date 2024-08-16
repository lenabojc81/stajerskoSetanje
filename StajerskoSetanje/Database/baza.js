
import SQLite from 'react-native-sqlite-storage';

// Open the database (make sure this is done before any transactions)
const db = SQLite.openDatabase({ name: 'baza.db', location: 'default' });

// Function to initialize database schema and perform initial operations
export const initializeDatabase = () => {
  console.log('Initializing database...');
  db.transaction(tx => {
    // Create tables if they do not exist
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

    // Insert initial data or perform other operations
    tx.executeSql(
      `INSERT INTO Uporabniki (name, priimek, uporabnisko_ime, geslo, telefonska_stevilka, drzava, googleId) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      ['SampleName', 'SampleLastName', 'SampleUsername', 'password123', '123456789', 'Slovenija', '1234567890'],
      (_, insertResult) => {
        // Success callback for the INSERT statement
        console.log('Row inserted successfully:', insertResult);
      },
      (_, error) => {
        // Error callback for the INSERT statement
        console.error('Error inserting row:', error);
      }
    );

    // Select data or perform other operations
    tx.executeSql(
      `SELECT * FROM Uporabniki;`,
      [],
      (_, result) => {
        const rows = result.rows.raw(); // Get all rows as an array of objects
        console.log('Users:', rows);
      },
      (_, error) => {
        console.error('Error fetching users:', error);
      }
    );
  }, 
  // Error callback for the transaction
  (_, error) => {
    console.error('Transaction error:', error);
  }, 
  // Success callback for the transaction
  () => {
    console.log('Transaction completed successfully');
  });
};

// Call the initialization function
initializeDatabase();

export default db;
