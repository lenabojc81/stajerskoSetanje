import React from "react";
import { Text, Button } from "react-native";
import Zemljevid from "../Zemljevid/Zemljevid";

interface PremikDoZacetneLokacijeProps {
  zacetna_tocka: {
    ime: string;
    lokacija: { lat: string; lng: string };
    uganka: string;
  };
}

const PremikDoZacetneLokacije: React.FC<PremikDoZacetneLokacijeProps> = ({ zacetna_tocka }) => {
  const zacetna_lokacija = {
    coords: {
      latitude: parseFloat(zacetna_tocka.lokacija.lat),
      longitude: parseFloat(zacetna_tocka.lokacija.lng),
    },
  };

  return (
    <>
      <Text>
        Premik do začetne lokacije: Premaknite se do te lokacije, da začnete z
        igro.
      </Text>
      <Zemljevid endLocation={zacetna_lokacija} />
    </>
  );
};

export default PremikDoZacetneLokacije;
