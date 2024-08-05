import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IPot from "../../../models/IPot";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../../Navigacija/types';
import PremikDoZacetneLokacije from '../../IzvajanjePoti/PremikDoZacetneLokacije/PremikDoZacetneLokacije';


type PotScreenRouteProp = RouteProp<RootStackParamList, 'Pot'>;
type PotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pot'>;

type NavProps = {
  route: PotScreenRouteProp;
};

const Pot: React.FC<NavProps> = ({ route }) => {
  const { pot } = route.params;
  const navigation = useNavigation<PotScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ime poti: {pot.ime}</Text>
      <Text>Id: {pot._id}</Text>
      <Text>Težavnost: {pot.tezavnost}</Text>
      <Text>Dolžina poti: {pot.dolzina}</Text>
      <Text>Opis: {pot.opis}</Text>
      <Text>Število točk: {pot.tocke}</Text>
    <Text>Vmesna točka 1: {pot.vmesne_tocke[0].ime}</Text>
    <Text>Lokacija: {pot.vmesne_tocke[0].lokacija.lat}, {pot.vmesne_tocke[0].lokacija.lng}</Text>
    <Text>Uganka: {pot.vmesne_tocke[0].uganka}</Text>
    <PremikDoZacetneLokacije pot={pot}/>
    </View>
  );
};

export default Pot;