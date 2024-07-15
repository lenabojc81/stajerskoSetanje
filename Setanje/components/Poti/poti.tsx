import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { baseUrl } from "../../global";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import IPot from "../../models/IPot";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import UrediPot from "../UrediPot/UrediPot";
import { useForm } from "react-hook-form";
//`${baseUrl}/pridobiPoti`

type PotiScreenNavigationProp = StackNavigationProp<RootStackParamList, "Poti">;

const testPoti = [
  {
    id: "1",
    dolzina: "20km",
    ime: "Lojzetova pot",
    opis: "pot je dolga 5km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: "lahka",
    Tocke: "100",
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: [{ lat: "46.657398789705226", lng: "16.023557070370984" }],
        uganka: "uganka",
      },
    ],
  },
  {
    id: "2",
    dolzina: "10km",
    ime: "Štefkina pot",
    opis: "Pot je dolga 10km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: "srednje",
    Tocke: "100",
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: [{ lat: "46.657398789705226", lng: "16.023557070370984" }],
        uganka: "uganka",
      },
    ],
  },
  {
    id: "3",
    dolzina: "ggffff",
    ime: "Kekčeva pot",
    opis: "Pot je dolga 20km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: "težka",
    Tocke: "200",
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: [{ lat: "46.657398789705226", lng: "16.023557070370984" }],
        uganka: "uganka",
      },
    ],
  },
];

const Poti = () => {
  const [poti, setPoti] = useState<IPot[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { control, handleSubmit, reset } = useForm();
  const navigation = useNavigation<PotiScreenNavigationProp>();

  const fetchPoti = async () => {
    try {
      const response = await fetch(`${baseUrl}/pridobiPoti`);
      const data = await response.json();
      setPoti(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Napaka pri pridobivanju podatkov");
    }
  };

  useEffect(() => {
    fetchPoti();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prikaz Poti</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {poti.map((pot, index) => (
        <TouchableOpacity
          key={index}
          style={styles.pathItem}
          onPress={() => {navigation.navigate("Pot", { pot }); console.log(pot.vmesne_tocke)}}
        >
          <Text style={styles.pathName}>Ime poti: {pot.ime}</Text>
          <Text>Opis: {pot.opis}</Text>
          <View style={styles.container}>
                <Button title="UrediPot" onPress={() => navigation.navigate("UrediPot", { pot })} />
            </View>
        </TouchableOpacity>
        
      ))}
      
    </ScrollView>
  );
};

export default Poti;
