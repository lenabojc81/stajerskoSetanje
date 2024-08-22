import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { openDatabase, initDB, fetchUsers, User } from "./database";
import { enableScreens } from "react-native-screens";
import { createStackNavigator } from '@react-navigation/stack';
import Poti from "./components/Poti/poti";
import Pot from "./components/Poti/Pot/Pot";
import IzvajanjePoti from "./components/IzvajanjePoti/IzvajanjePoti";
import EmailPasswordAuth from './components/LogReg/EmailPasswordAuth';
import { getToken } from "./components/LogReg/AuthServices";
import Lestvica from "./components/Lestvica/Lestvica";
import MyTabs from "./components/Navigacija/Nav";
import UrejanjePotiII from "./components/UrediPot/UrejanjePoti";
import ProfilUporabnika from "./components/ProfilUporabnika/ProfilUporabnika";
import DodajanjePotiII from "./components/DodajanjePoti/DodajanjePoti";

enableScreens();

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

    const checkToken = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkToken();
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
    <NavigationContainer>
      {isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="Main">
          <AuthStack.Screen name="Login" component={EmailPasswordAuth} />
          <AuthStack.Screen name="Register" component={EmailPasswordAuth} />
          <AuthStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen name="Login" component={EmailPasswordAuth} />
          <AuthStack.Screen name="Register" component={EmailPasswordAuth} />
          <AuthStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* Hide the header on the "Setanje" screen */}
      <Stack.Screen name="Setanje" component={MyTabs} options={{ headerShown: false }} />
      {/* Show the header only on these specific screens */}
      <Stack.Screen name="Lestvica" component={Lestvica} options={{ headerShown: true }} />
      <Stack.Screen name="Pot" component={Pot} />
      <Stack.Screen name="IzvajanjePoti" component={IzvajanjePoti} options={{ headerShown: false }} />
      <Stack.Screen name="Poti" component={Poti} />
      <Stack.Screen name="UrejanjePoti" component={UrejanjePotiII} />
      <Stack.Screen name="ProfilUporabnika" component={ProfilUporabnika} />
      <Stack.Screen name="DodajanjePoti" component={DodajanjePotiII} />
      <Stack.Screen name="Statistika" component={Statistika} />
      <Stack.Screen name="SeznamiOdigranihIger" component={SeznamOdigranihIger} options={{headerShown: false}}/>
      <Stack.Screen name="UrejanjePotiII" component={UrejanjePotiII} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
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
});

export default App;
