import React, { useState } from "react";
import { Text, Button, View } from "react-native";
import Zemljevid from "../Zemljevid/Zemljevid";
import LocationType from "../Zemljevid/ILocationType";
import { haversineDistance } from "../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";

interface PremikDoZacetneLokacijeProps {
  zacetna_tocka: {
    ime: string;
    lokacija: { lat: string; lng: string };
    uganka: string;
  };
}

const PremikDoZacetneLokacije: React.FC<PremikDoZacetneLokacijeProps> = ({ zacetna_tocka }) => {
  const [showStartButton, setShowStartButton] = useState<boolean>(false);

  const zacetna_lokacija: LocationType = {
    coords: {
      latitude: parseFloat(zacetna_tocka.lokacija.lat),
      longitude: parseFloat(zacetna_tocka.lokacija.lng),
    },
  };

  const handleLocationUpdate = (currentLocation: LocationType) => {
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
          <Button title="Začni igro" onPress={() => "zaceta igra"} />
        </View>
      )}
    </>
  );
};

export default PremikDoZacetneLokacije;