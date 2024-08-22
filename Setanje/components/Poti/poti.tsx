import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { baseUrl } from "../../global";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import IPot from "../../models/IPot";
import { RootStackParamList } from "../Navigacija/types";
import { StackNavigationProp } from "@react-navigation/stack";
import UrediPot from "../UrediPot/UrediPot";
import { set, useForm } from "react-hook-form";
import { Card, Button } from 'react-native-paper';
import UrejanjePotiII from "../UrediPot/UrejanjePoti";
//`${baseUrl}/pridobiPoti`


type PotiScreenNavigationProp = StackNavigationProp<RootStackParamList, "Poti">;

const testPoti: IPot[] = [
  {
    _id: "1",
    dolzina: 20,
    ime: "Lojzetova pot",
    opis: "pot je dolga 5km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: 1,
    tocke: 100,
    zacetna_lokacija: { lat: 46.657398789705226, lng: 16.023557070370984 },
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: { lat: 46.657398789705226, lng: 16.023557070370984 },
        uganka: "uganka",
        odgovor: { odgovor: "odgovor", tip_odgovor: "tip" },
        dodatna_vprasanja: [
          {
            vprasanje: "vprasanje",
            odgovori: [
              { odgovor: "odgovor", pravilen: true },
              { odgovor: "odgovor", pravilen: false },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: "2",
    dolzina: 10,
    ime: "Štefkina pot",
    opis: "Pot je dolga 10km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: 2,
    tocke: 100,
    zacetna_lokacija: { lat: 46.459245, lng: 15.618544 },
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: { lat: 46.459245, lng: 15.618544 },
        uganka: "uganka",
        odgovor: { odgovor: "odgovor", tip_odgovor: "tip" },
        dodatna_vprasanja: [
          {
            vprasanje: "vprasanje",
            odgovori: [
              { odgovor: "odgovor1", pravilen: true },
              { odgovor: "odgovor2", pravilen: false },
              { odgovor: "odgovor3", pravilen: false },
              { odgovor: "odgovor4", pravilen: false },
            ],
          },
        ],
      },
      {
        ime: "pin2",
        lokacija: { lat: 46.459245, lng: 15.618544 },
        uganka: "uganka2",
        odgovor: { odgovor: "odgovor", tip_odgovor: "tip" },
        dodatna_vprasanja: [
          {
            vprasanje: "vprasanje",
            odgovori: [
              { odgovor: "odgovor1", pravilen: true },
              { odgovor: "odgovor2", pravilen: false },
              { odgovor: "odgovor3", pravilen: false },
              { odgovor: "odgovor4", pravilen: false },
            ],
          },
        ],
      }
    ],
  },
  {
    _id: "3",
    dolzina: 10,
    ime: "Kekčeva pot",
    opis: "Pot je dolga 20km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: 5,
    tocke: 200,
    zacetna_lokacija: { lat: 46.657398789705226, lng: 16.023557070370984 },
    vmesne_tocke: [
      {
        ime: "pin",
        lokacija: { lat: 46.657398789705226, lng: 16.023557070370984 },
        uganka: "uganka",
        odgovor: { odgovor: "odgovor", tip_odgovor: "tip" },
        dodatna_vprasanja: [
          {
            vprasanje: "vprasanje",
            odgovori: [
              { odgovor: "odgovor", pravilen: true },
              { odgovor: "odgovor", pravilen: false },
              { odgovor: "odgovor", pravilen: false },
              { odgovor: "odgovor", pravilen: false },
            ],
          },
        ],
      },
    ],
  },
];



// Poti.tsx
// Extracted fetchPoti function
export const fetchPoti = async (): Promise<IPot[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/paths/pridobiPoti`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid content type, expected application/json");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Error fetching paths");
  }
};

const Poti = () => {
  const [poti, setPoti] = useState<IPot[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<PotiScreenNavigationProp>();

  const loadPoti = async () => {
    try {
      const fetchedPoti = await fetchPoti();
      setPoti(fetchedPoti);
    } catch (error: any) {
      setErrorMsg(error.message || "Error fetching paths");
    }
  };

  useEffect(() => {
    loadPoti();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setErrorMsg("");
    await loadPoti();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Poti</Text>
      {errorMsg != "" && <Text style={styles.error}>{errorMsg}</Text>}
      {poti.map((pot, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("Pot", { pot })}
        >
          <Card key={index} style={styles.card}>
            <Card.Title title={`Ime poti: ${pot.ime}`} />
            <Card.Content>
              <Text>Težavnost: {pot.tezavnost}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("UrejanjePotiII", { pot })}
                style={styles.button}
              >
                Uredi Pot
              </Button>
            </Card.Actions>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Poti;