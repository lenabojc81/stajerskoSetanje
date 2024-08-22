import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icons for bottom tabs
import Domov from '../Domov/Domov';
import Poti from '../Poti/poti'; // List of all paths
import Lestvica from '../Lestvica/Lestvica'; // Leaderboard/Statistics
import ProfilUporabnika from '../ProfilUporabnika/ProfilUporabnika'; // User Profile

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Leaderboard') {
            iconName = 'trophy-outline';
          } else if (route.name === 'Paths') {
            iconName = 'list';
          } else if (route.name === 'Statistics') {
            iconName = 'stats-chart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide labels to match your wireframe
        headerShown: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={Domov} />
      <Tab.Screen name="Leaderboard" component={Lestvica} />
      <Tab.Screen name="Paths" component={Poti} />
      <Tab.Screen name="Statistics" component={PersonalStats} />
      <Tab.Screen name="Profile" component={ProfilUporabnika} />
    </Tab.Navigator>
  );
};

const PersonalStats = () => {
  return (
    <View style={styles.container}>
      <Text>Statistics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'space-around',
    paddingBottom: 10,
    height: 60,
  },
});

export default MyTabs;
