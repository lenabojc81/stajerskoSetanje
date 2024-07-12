// App.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { openDatabase, initDB, fetchUsers, User } from "./database";
import MyTabs from "./components/Nav";
import { enableScreens } from "react-native-screens";
import { RootStackParamList } from "./components/Navigacija/types";
import { createStackNavigator } from '@react-navigation/stack';
import BottomNav from "./components/BottomTab/Bottomtab";
import Poti from "./components/Poti/poti";
import Pot from "./components/Poti/Pot/Pot";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  enableScreens();
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await openDatabase();
        await initDB(db);
        const users = await fetchUsers(db);
        setUsers(users);
      } catch (error) {
        console.error("Database setup failed:", error);
      } finally {
        setLoading(false);
      }
    };

    setupDatabase();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (

  //   <NavigationContainer>
  //       <MyTabs />
  //   </NavigationContainer>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='BottomNav' component={BottomNav} options={{headerShown: false}} />
        <Stack.Screen name='Poti' component={Poti} />
        <Stack.Screen name='Pot' component={Pot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default App;
