import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import db, { initializeDatabase } from '../Database/baza'; 
import { useNavigation } from '@react-navigation/native';
import home from './home';
import { Redirect } from 'expo-router';




const insertUser = (name: string, priimek: string, uporabnisko_ime: string, googleId: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Uporabniki (name, priimek, uporabnisko_ime, googleId) VALUES (?, ?, ?, ?);',
      [name, priimek, uporabnisko_ime, googleId],
      (tx, result) => console.log('User inserted successfully', result),
       
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
      },
      
    );
  });
};

const google_login = () => {

console.log('google_login');


  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '427616683093-ip5pkedj9is5qe8l5kqipqpup5d7haeh.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/vivien_stampfer/StajerskoSetanje', 
    scopes: ['profile', 'email'],
  });

 /* useEffect(() => {
    initializeDatabase();
  }, []);
*/
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${id_token}` },
      })
        .then(response => response.json())
        .then(async data => {
          console.log(data);

          // Shranjevanje tokena v SecureStore
          await SecureStore.setItemAsync('userToken', id_token);

          console.log('token shranjen');

          // Send the token to your backend for verification and user info storage
          fetch('YOUR_SERVER_ENDPOINT/verifyToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: id_token }),
          })
            .then(serverResponse => serverResponse.json())
            .then(async serverData => {
              if (serverData.valid) {
                const { name, sub: googleId, email } = serverData.payload;


                console.log('User info:', name, googleId, email);

                // vstavljanje v lokalno bazo
                insertUser(name, '', email, googleId);
               
              
              } else {
                console.error('Token validation failed');
              }
            })
            .catch(err => console.error('Error verifying token:', err));
        })
        .catch(err => console.error('Error fetching user info:', err));
    }
  }, [response]);

 

  return (
    <View>
      <Text>Google Login</Text>
      <Text>Google Login</Text>
      <Text>Google Login</Text>
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

export default google_login;
