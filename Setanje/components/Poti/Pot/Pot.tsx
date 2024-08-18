import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IPot from "../../../models/IPot";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../../Navigacija/types';
import PremikDoZacetneLokacije from '../../IzvajanjePoti/PremikDoZacetneLokacije/PremikDoZacetneLokacije';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';

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
    <Card style={styles.card}>
      <Card.Content>
        <Title>{pot.ime}</Title>
        <Paragraph>Id: {pot._id}</Paragraph>
        <Paragraph>Težavnost: {pot.tezavnost}</Paragraph>
        <Paragraph>Dolžina poti: {pot.dolzina}</Paragraph>
        <Paragraph>Opis: {pot.opis}</Paragraph>
        <Paragraph>Število točk: {pot.tocke}</Paragraph>
      </Card.Content>
    </Card>
    <Card style={styles.card}>
        <Card.Content>
          <List.Subheader>Vmesna točka 1</List.Subheader>
          <Paragraph>Ime: {pot.vmesne_tocke[0].ime}</Paragraph>
          <Paragraph>Lokacija: {pot.vmesne_tocke[0].lokacija.lat}, {pot.vmesne_tocke[0].lokacija.lng}</Paragraph>
          <Paragraph>Uganka: {pot.vmesne_tocke[0].uganka}</Paragraph>
        </Card.Content>
      </Card>
    <PremikDoZacetneLokacije pot={pot}/>
    </View>
  );
};

export default Pot;