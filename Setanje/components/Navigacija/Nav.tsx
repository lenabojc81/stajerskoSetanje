import * as React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icons for bottom tabs
import Domov from '../Domov/Domov';
import Poti from '../Poti/poti'; // List of all paths
import IzvajanjePoti from '../IzvajanjePoti/IzvajanjePoti'; // Start button
import Lestvica from '../Lestvica/Lestvica'; // Statistics
import ProfilUporabnika from '../ProfilUporabnika/ProfilUporabnika'; // Account Page

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'List') {
            iconName = 'list';
          } else if (route.name === 'Statistics') {
            iconName = 'stats-chart';
          } else if (route.name === 'Account') {
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
      <Tab.Screen name="List" component={Poti} />
      <Tab.Screen
        name="Play"
        component={IzvajanjePoti}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.startButtonContainer}>
              <View style={styles.startButton}>
                <Ionicons name="play" size={28} color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Statistics" component={Lestvica} />
      <Tab.Screen name="Account" component={ProfilUporabnika} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'space-around',
    paddingBottom: 10,
    height: 60,
  },
  startButtonContainer: {
    position: 'relative',
    top: -20, // Moves the button up to overlap the tab bar
    alignItems: 'center',
    flex: 1,
  },
  startButton: {
    backgroundColor: '#6200ee',
    borderRadius: 35,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyTabs;
