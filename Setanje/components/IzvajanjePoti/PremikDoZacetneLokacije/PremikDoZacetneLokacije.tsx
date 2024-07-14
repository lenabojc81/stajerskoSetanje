import React, { useState } from "react";
import { Text, Button, View } from "react-native";
import Zemljevid from "../Zemljevid/Zemljevid";
import ILokacija from "../../../models/ILokacija";
import { haversineDistance } from "../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";
import IPot from "../../../models/IPot";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigacija/types";
import { useNavigation } from "@react-navigation/native";

type ZacetnaLokacijaNavigationProp = StackNavigationProp<RootStackParamList, 'ZacetnaLokacija'>;

interface PremikDoZacetneLokacijeProps {
  pot: IPot;
}

const PremikDoZacetneLokacije: React.FC<PremikDoZacetneLokacijeProps> = ({ pot }) => {
  const [showStartButton, setShowStartButton] = useState<boolean>(false);

  const navigation = useNavigation<ZacetnaLokacijaNavigationProp>();

  const zacetna_lokacija: ILokacija = {
    coords: {
      latitude: parseFloat(pot.vmesne_tocke[0].lokacija.lat),
      longitude: parseFloat(pot.vmesne_tocke[0].lokacija.lng),
    },
    // coords: {
    //   latitude: pot.vmesne_tocke[0].lokacija.coords.latitude,
    //   longitude: pot.vmesne_tocke[0].lokacija.coords.longitude,
    // },
  };

  const handleLocationUpdate = (currentLocation: ILokacija) => {
    const distanceToStart = haversineDistance(currentLocation.coords, zacetna_lokacija.coords);
    if (distanceToStart <= 50) {
      setShowStartButton(true);
    } else {
      setShowStartButton(false);
    }
  };

  return (
    <>
      <Text>
        Premik do začetne lokacije: Premaknite se do te lokacije, da začnete z
        igro.
      </Text>
      <Zemljevid endLocation={zacetna_lokacija} onLocationUpdate={handleLocationUpdate} />
      {showStartButton && (
        <View>
          <Button title="Začni igro" onPress={() => navigation.push('IzvajanjePoti', {pot})} />
        </View>
      )}
    </>
  );
};

export default PremikDoZacetneLokacije;