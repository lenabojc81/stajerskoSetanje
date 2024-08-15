// nav.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs/src';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { openDatabase, initDB, fetchUsers, User } from '../../database';
import ImageUpload from '../visionApi';
import Poti from '../Poti/poti';
import IzvajanjePoti from '../IzvajanjePoti/IzvajanjePoti';
import Domov from '../Domov/Domov';
import EmailPasswordAuth from '../LogReg/EmailPasswordAuth'; // Adjust the path as necessary
import GoogleAuth from '../LogReg/GoogleAuth'; // Adjust the path as necessary
import { createStackNavigator } from '@react-navigation/stack';
import UrediPot from '../UrediPot/UrediPot';
import Lestvica from '../Lestvica/Lestvica';
import DodajanjePoti from '../DodajanjePoti/DodajanjePoti';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const HomeScreen = () => (
//   <View style={styles.screen}>
//     <Text>Home Screen</Text>
//   </View>
// );

const UsersScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await openDatabase();
        await initDB(db);
        const users = await fetchUsers(db);
        setUsers(users);
      } catch (error) {
        console.error('Database setup failed:', error);
      } finally {
        setLoading(false);
      }
    };

    setupDatabase();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Domov} options={{headerShown: false}}/>
      <Tab.Screen name="AI" component={ImageUpload} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Dodajanje poti" component={DodajanjePoti} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="UrediPot" component={UrediPot} />
      {/* <Tab.Screen name="Poti" component={Poti} />
      <Tab.Screen name="Izvajanje poti" component={IzvajanjePoti} /> */}
  

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={EmailPasswordAuth} />
      <Stack.Screen name="Register" component={EmailPasswordAuth} /> 
     <Stack.Screen name="GoogleLogin" component={GoogleAuth} />
      <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


export default MyTabs;