import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Zemljevid from "../Zemljevid/Zemljevid";
import ILokacija from "../../../models/ILokacija";
import { haversineDistance } from "../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";
import IPot from "../../../models/IPot";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigacija/types";
import { useNavigation } from "@react-navigation/native";
import { Text, Button, Card, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import IUser from "../../../models/IUser";
import userData from "../../ProfilUporabnika/userData";
import { preveriUporabnikPot } from "../posiljanjePodatkovUporabnikPot";
import IUporabnikPot from "../../../models/IUporabnikPot";
import { set } from "react-hook-form";

type ZacetnaLokacijaNavigationProp = StackNavigationProp<RootStackParamList, 'ZacetnaLokacija'>;

interface PremikDoZacetneLokacijeProps {
  pot: IPot;
}

const PremikDoZacetneLokacije: React.FC<PremikDoZacetneLokacijeProps> = ({ pot }) => {
  const [showStartButton, setShowStartButton] = useState<boolean>(false);

  const navigation = useNavigation<ZacetnaLokacijaNavigationProp>();

  const handleLocationUpdate = (currentLocation: ILokacija) => {
    const distanceToStart = haversineDistance(currentLocation, pot.zacetna_lokacija);
    if (distanceToStart <= 50) {
      setShowStartButton(true);
    } else {
      setShowStartButton(false);
    }
  };

  return (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <Paragraph>
            Premik do začetne lokacije: Premaknite se do te lokacije, da začnete z igro.
          </Paragraph>
        </Card.Content>
      </Card>
      <Zemljevid endLocation={pot.zacetna_lokacija} onLocationUpdate={handleLocationUpdate} />
      {showStartButton && (
        <View>
          <Button mode="contained" onPress={() => navigation.push('IzvajanjePoti', {pot})} >
            Začni z igro
          </Button>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#E0EFDE"
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
export default PremikDoZacetneLokacije;