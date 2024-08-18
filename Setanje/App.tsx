import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { openDatabase, initDB, fetchUsers, User } from "./database";
import { enableScreens } from "react-native-screens";
import { createStackNavigator } from '@react-navigation/stack';
import Poti from "./components/Poti/poti";
import Pot from "./components/Poti/Pot/Pot";
import Nav from "./components/Navigacija/Nav";
import IzvajanjePoti from "./components/IzvajanjePoti/IzvajanjePoti";
import EmailPasswordAuth from './components/LogReg/EmailPasswordAuth';
import GoogleAuth from './components/LogReg/GoogleAuth'; 
import { getToken } from "./components/LogReg/AuthServices";
import Lestvica from "./components/Lestvica/Lestvica";
import MyTabs from "./components/Navigacija/Nav";
import { useNavigation } from '@react-navigation/native';
import UrejanjePotiII from "./components/UrediPot/UrejanjePoti";
import { IconButton } from 'react-native-paper';
import ProfilUporabnika from "./components/ProfilUporabnika/ProfilUporabnika";
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
      <AuthStack.Screen name="GoogleLogin" component={GoogleAuth} />
      <AuthStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    </AuthStack.Navigator>
       ) :(
        <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" component={EmailPasswordAuth} />
        <AuthStack.Screen name="Register" component={EmailPasswordAuth} />
        <AuthStack.Screen name="GoogleLogin" component={GoogleAuth} />
        <AuthStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    )}
      
    </NavigationContainer>
  );
};

const MainStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
    screenOptions={{
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <IconButton
          icon="home"
          size={24}
         
        />
      </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Lestvica')}>
        <IconButton
          icon="trophy-outline"
          size={24}
        />
      </TouchableOpacity>
      ),
    }}
  >
    <Stack.Screen name="Setanje" component={MyTabs} options={{ headerShown: true }} />
    <Stack.Screen name="Lestvica" component={Lestvica} options={{ headerShown: true }} />
    <Stack.Screen name="Pot" component={Pot} />
    <Stack.Screen name="IzvajanjePoti" component={IzvajanjePoti} options={{ headerLeft: () => null }} />
    <Stack.Screen name="Poti" component={Poti} />
    <Stack.Screen name="UrejanjePotiII" component={UrejanjePotiII}  />
    <Stack.Screen name="ProfilUporabnika" component={ProfilUporabnika} />
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
  headerButtonText: {
    color: '#000',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default App;
