/*import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import db from '../Database/baza.js'; // Uvoz funkcij iz db.tsx

const insertUser = (name: string, priimek: string, uporabnisko_ime: string, googleId: string ) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Uporabniki (name, priimek, uporabnisko_ime, googleId) VALUES (?, ?, ?, ?);',
        [name, priimek, uporabnisko_ime, googleId]
      );
    });
  };
const fetchUserByGoogleId = (googleId: string, callback: (user: any) => void) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Uporabniki WHERE googleId = ?;',
            [googleId],
            (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                    callback(_array[0]);
                } else {
                    callback(null);
                }
            }
        );
    })
};
export function GoogleLogin() {
const [user, setUsers] = useState(null);

      function DisplayUser() {

        return(
            <View>
                <Text>nekaj</Text>
            </View>
        )
      }
  
    return (

        <DisplayUser />     
    );
  }
  
 
  

/*

const GoogleLogin = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Zamenjajte s svojim Client ID
  });

  useEffect(() => {
    baza.initializeDatabase();
    baza.fetchPot();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${id_token}` },
      })
        .then(response => response.json())
        .then(data => {
          const { sub, given_name, family_name, email } = data;
          baza.fetchUserByGoogleId(sub, (user) => {
            if (user) {
              onLogin(user);
            } else {
              baza.insertUser(given_name, family_name, email, sub);
              baza.fetchUserByGoogleId(sub, onLogin);
            }
          });
        });
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};
*/
//export default GoogleLogin;
