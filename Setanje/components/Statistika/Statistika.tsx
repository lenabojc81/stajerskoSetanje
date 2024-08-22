import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import IUporabnikPot from "../../models/IUporabnikPot";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import IPot from "../../models/IPot";
import { pridobiPot } from "../IzvajanjePoti/posiljanjePodatkovUporabnikPot";

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
        <View>
            <Text>Statistika igre</Text>
            <Text>{pot.ime}</Text>
            <Text>{pot.opis}</Text>
        </View>
    );
};

export default Statistika;