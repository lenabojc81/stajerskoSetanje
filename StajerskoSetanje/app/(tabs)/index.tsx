
import db from '../../Database/baza'; // Prepričajte se, da je pot pravilna
import { useEffect, useState } from 'react';
import GoogleLogin from '@/components/google_login';
import { View } from 'react-native';



export default function HomeScreen() {
const [uporabniki, setUporabniki] = useState(null);
const id = 5;

  useEffect(() => {
     db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM Uporabniki where id = 2;`,
                [],
                (_, result) => {

                    const rows = result.rows._array;

                    setUporabniki(rows as any);
                    console.log("To so uporabniki", uporabniki);
                },
               
            );
        });
  }, [id]);
  return (
    <View >
    <GoogleLogin />
    </View>
  );
}
