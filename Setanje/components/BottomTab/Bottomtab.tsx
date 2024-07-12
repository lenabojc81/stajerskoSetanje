import React from 'react';
import { View, Text, Button } from 'react-native';
import Domov from '../Domov/Domov';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function EmptyScreen() {
    return <View />;
} 

function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Domov} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={EmptyScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

export default BottomNav;