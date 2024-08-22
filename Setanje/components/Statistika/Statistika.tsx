import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import IUporabnikPot from "../../models/IUporabnikPot";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import IPot from "../../models/IPot";
import { pridobiPot } from "../IzvajanjePoti/posiljanjePodatkovUporabnikPot";
import styles from "./styles";
import { Card, List, Paragraph, Title } from "react-native-paper";

interface IStatistikaIgreProps {
    uporabnikPot: IUporabnikPot;
};

type StatistikaScreenRouteProp = RouteProp<RootStackParamList, 'Statistika'>;
type StatistikaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Statistika'>;

type NavProps = {
  route: StatistikaScreenRouteProp;
};

const initialPot: IPot = {
    dolzina: 0,
    ime: "",
    opis: "",
    tezavnost: 0,
    tocke: 0,
    vmesne_tocke: [],
    zacetna_lokacija: {
      lat: 0,
      lng: 0,
    },
  };


const Statistika: React.FC<NavProps> = ({route}) => {
    const { game } = route.params;
    const [pot, setPot] = useState<IPot>(initialPot);
    
    const navigation = useNavigation<StatistikaScreenNavigationProp>();

    useEffect(() => {
        pridobiPot({idPot: game.idPot, setPot: setPot});
    }, []);

    return (
        <View style={styles.container} >
          <Card style={styles.cardPath}>
            <Card.Content>
              <Title style={styles.titlePath}>{pot.ime}</Title>
            </Card.Content>
          </Card>
          <ScrollView>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>{pot.opis}</Paragraph>
              <Paragraph>Težavnost: {pot.tezavnost}</Paragraph>
              <Paragraph>Dolžina poti: {pot.dolzina} m</Paragraph>
              <Paragraph>Število točk: {pot.tocke}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.cardPath}>
            <Card.Content>
              <List.Subheader style={styles.titlePath}>Osebna statistika</List.Subheader>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>Prehojena pot: {game.celotna_distanca} m</Paragraph>
              <Paragraph>Porabljen čas: {game.celotni_cas} s</Paragraph>
              <Paragraph>Povprečna hoja: {(game.celotna_distanca/game.celotni_cas)*3.6} km/h</Paragraph>
              <Paragraph>Pridobljene točke: {game.skupne_tocke} ({(game.skupne_tocke*100/pot.tocke).toFixed(0)}%)</Paragraph>
            </Card.Content>
          </Card>
          {game.vmesne_tocke.map((tocka, index) => {
            return (
              <View key={index}>
                <Card style={styles.cardPath}>
                  <Card.Content>
                    <List.Subheader style={styles.titlePath}>Vmesna točka {index+1}</List.Subheader>
                  </Card.Content>
                </Card>
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Paragraph>Prehojena razdalja: {tocka.distanca} m</Paragraph>
                  <Paragraph>Porabljen čas: {tocka.cas} s</Paragraph>
                </Card.Content>
              </Card>
              </View>);
          })}
          </ScrollView>
        </View>
    );
};

export default Statistika;