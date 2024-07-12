import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IPot from "../IPot";
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../../Navigacija/types';
import Zemljevid from '../../IzvajanjePoti/Zemljevid/Zemljevid';
import PremikDoZacetneLokacije from '../../IzvajanjePoti/PremikDoZacetneLokacije/PremikDoZacetneLokacije';


type PotScreenRouteProp = RouteProp<RootStackParamList, 'Pot'>;
type PotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pot'>;

type Props = {
  route: PotScreenRouteProp;
  navigation: PotScreenNavigationProp;
};

const Pot: React.FC<Props> = ({ route, navigation }) => {
  const { pot } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ime poti: {pot.ime}</Text>
      <Text>Id: {pot._id}</Text>
      <Text>Težavnost: {pot.tezavnost}</Text>
      <Text>Dolžina poti: {pot.dolzina}</Text>
      <Text>Opis: {pot.opis}</Text>
      <Text>Število točk: {pot.Tocke}</Text>
    <Text>Vmesna točka 1: {pot.vmesne_tocke[0].ime}</Text>
    <Text>Lokacija: {pot.vmesne_tocke[0].lokacija.lat}, {pot.vmesne_tocke[0].lokacija.lng}</Text>
    <Text>Uganka: {pot.vmesne_tocke[0].uganka}</Text>
    <PremikDoZacetneLokacije zacetna_tocka={pot.vmesne_tocke[0]} />
    </View>
  );
};

export default Pot;