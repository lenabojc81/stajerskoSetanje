import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import Poti from '../Poti/poti';
import styles from './styles';
import { RootStackParamList } from '../Navigacija/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Domov = ({ navigation}: { navigation: HomeScreenNavigationProp}) => {
 return (
    <View style={styles.container}>
      
      <Poti />
    </View>
 );
}

export default Domov;