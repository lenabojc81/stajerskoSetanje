import React, { useEffect, useState } from 'react';
import { View, Button, Text, StatusBar, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import db, { initializeDatabase } from '../Database/baza';

// Define the UserInfo type
type UserInfo = {
  name: string;
  email: string;
  googleId: string;
};

const insertUser = (name: string, priimek: string, uporabnisko_ime: string, googleId: string) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Uporabniki (name, priimek, uporabnisko_ime, googleId) VALUES (?, ?, ?, ?);',
      [name, priimek, uporabnisko_ime, googleId],
      (_, result) => console.log('User inserted successfully', result),
     
    );
  });
};

const fetchUserByGoogleId = (googleId: string, callback: (user: UserInfo | null) => void) => {
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

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '427616683093-ip5pkedj9is5qe8l5kqipqpup5d7haeh.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/vivien_stampfer/StajerskoSetanje',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${id_token}` },
      })
        .then(response => response.json())
        .then(async data => {
          console.log('Google user data:', data);
          await SecureStore.setItemAsync('userToken', id_token);
          console.log('Token stored in SecureStore');
          fetchUserByGoogleId(data.sub, (existingUser) => {
            if (existingUser) {
              console.log('User already exists in the database');
              setUserInfo(existingUser);
            } else {
              insertUser(data.name, '', data.email, data.sub);
              setUserInfo({ name: data.name, email: data.email, googleId: data.sub });
            }
            setLoggedIn(true);
          });
        })
        .catch(err => console.error('Error fetching Google user info:', err));
    }
  }, [response]);

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setLoggedIn(false);
      setUserInfo(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button
                disabled={!request}
                title="Login with Google"
                onPress={() => {
                  promptAsync();
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && userInfo && (
                <>
                  <Text>Welcome, {userInfo.name}</Text>
                  <Button onPress={signOut} title="LogOut" color="red" />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f0f0f0',
  },
  body: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
});

export default Login;
