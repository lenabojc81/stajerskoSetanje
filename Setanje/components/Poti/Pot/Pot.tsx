import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IPot from "../../../models/IPot";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../../Navigacija/types';
import PremikDoZacetneLokacije from '../../IzvajanjePoti/PremikDoZacetneLokacije/PremikDoZacetneLokacije';
import { Card, Title, Paragraph, List, Button } from 'react-native-paper';
import IUser from '../../../models/IUser';
import IUporabnikPot from '../../../models/IUporabnikPot';
import userData from '../../ProfilUporabnika/userData';
import { preveriUporabnikPot } from '../../IzvajanjePoti/posiljanjePodatkovUporabnikPot';
import { initialUser } from '../../../models/initialValues';

type PotScreenRouteProp = RouteProp<RootStackParamList, 'Pot'>;
type PotScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Pot'>;

type NavProps = {
  route: PotScreenRouteProp;
};

const Pot: React.FC<NavProps> = ({ route }) => {
  const { pot } = route.params;
  const {isAdmin} = route.params;
  const navigation = useNavigation<PotScreenNavigationProp>();

  const [message, setMessage] = useState<string>('');
  const [thisUserData, setThisUserData] = useState<IUser>(initialUser);
  const [uporabnikPot, setUporabnikPot] = useState<IUporabnikPot | null>(null);

  useEffect(() => {
    userData({ setMessage, setData: setThisUserData });
  }, []);

  useEffect(() => {
    if (thisUserData._id != '' && pot._id != undefined) {  
      preveriUporabnikPot({idUporabnik: thisUserData._id, idPot: pot._id, setUporabnikPot});
    };
  }, [thisUserData]);

  return (
    <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        <Title>{pot.ime}</Title>
        <Paragraph>Težavnost: {pot.tezavnost}</Paragraph>
        <Paragraph>Dolžina poti: {pot.dolzina}</Paragraph>
        <Paragraph>Opis: {pot.opis}</Paragraph>
        <Paragraph>Število točk: {pot.tocke}</Paragraph>
      </Card.Content>
    </Card>
    {(uporabnikPot===null || isAdmin) && <PremikDoZacetneLokacije pot={pot} isAdmin={isAdmin} />}
    {uporabnikPot!==null && (
      <Card style={styles.cardRed}>
        <Card.Content>
          <Title>Že opravljena pot</Title>
          <Paragraph>Poti ne morete ponovno opravljati. Podrobno statistiko izvajanja si lahko ogledate med opravljenimi potmi.</Paragraph>
          {/* <Button mode="contained" onPress={() => navigation.navigate('SeznamiOdigranihIger')}>Opravljene poti</Button> */}
        </Card.Content>
      </Card>
    )}
    </View>
  );
};

export default Pot;