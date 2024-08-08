import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import DodajanjeTeksta from "./DodajanjeTeksta/DodajanjeTeksta";
import IPot from "../../models/IPot";
import style from "./style";
import DodajanjeTocke from "./DodajanjeTocke/DodajanjeTocke";
import IVmesnaTocka from "../../models/IVmesnaTocka";
import ILokacija from "../../models/ILokacija";
import { Picker } from "@react-native-picker/picker";
import { baseUrl } from "../../global";
import { SafeAreaView } from "react-native-safe-area-context";
import { haversineDistance } from "../IzvajanjePoti/Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";

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

const DodajanjePotiII = () => {
  const [pot, setPot] = useState<IPot>(initialPot);
  const scrollViewRef = useRef<ScrollView>(null);

  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredDifficulty, setEnteredDifficulty] = useState<string>("0");
  const [enteredLength, setEnteredLength] = useState<number>(0);
  const [enteredDescription, setEnteredDescription] = useState<string>('');
  const [visibleMidwaypoint, setVisibleMidwaypoint] = useState<boolean>(false);

  const handleMidwayPoint = (
    midwayPoints: IVmesnaTocka[],
    dataStart: ILokacija
  ) => {
    setPot({
      ...pot,
      vmesne_tocke: midwayPoints,
      zacetna_lokacija: dataStart,
    });
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleDeleteAllMidwayPoints = () => {
    setPot({
      ...pot,
      vmesne_tocke: [],
      dolzina: 0,
    });
  };

  const handleDeleteOneMidwayPoint = (index: number) => {
    const newMidwayPoints = pot.vmesne_tocke.filter((_, i) => i !== index);
    setPot({
      ...pot,
      vmesne_tocke: newMidwayPoints,
    });
  };

  const validateFields = () => {
    if (enteredName === '') {
      Alert.alert('Napaka','Ime ne sme biti prazno.');
      return false;
    }
    else if (enteredDifficulty === "0") {
      Alert.alert('Napaka','Izberite težavnost.');
      return false;
    }
    // else if (enteredLength === '') {
    //   Alert.alert('Napaka','Dolzina ne sme biti prazna.');
    //   return false;
    // }
    else if (isNaN(Number(enteredLength))) {
      Alert.alert('Napaka','Dolzina mora biti število.');
      return false;
    }
    else if (enteredDescription === '') {
      Alert.alert('Napaka','Opis ne sme biti prazen.');
      return false;
    }
    return true;
  };

  const savePath = async () => {
    if (!validateFields()) {
      return;
    }

    let allDistance: number = 0;
    for (let i = 0; i < pot.vmesne_tocke.length; i++) {
      if (i === 0) {
        allDistance += haversineDistance(pot.zacetna_lokacija, pot.vmesne_tocke[i].lokacija);
      } else {
        allDistance += haversineDistance(pot.vmesne_tocke[i - 1].lokacija, pot.vmesne_tocke[i].lokacija);
      }
    };

    const newPot: IPot = {
      dolzina: Number((allDistance / 1000).toFixed(2)),
      ime: enteredName,
      opis: enteredDescription,
      tezavnost: Number(enteredDifficulty),
      // max tocke = 100 * tezavnost + 10 * st vmesnih tock
      tocke: 100 * Number(enteredDifficulty),
      vmesne_tocke: pot.vmesne_tocke,
      zacetna_lokacija: pot.zacetna_lokacija,
    };

    //save to db
    try {
      const response = await fetch(`${baseUrl}/api/paths/dodajPot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPot),
      });
      if (!response.ok) {
        console.error('Napaka pri pošiljanju podatkov');
      }
      const responseData = await response.json();
      resetForm();
    } catch (error) {
      console.error('Napaka pri pošiljanju podatkov', error);
    };
  };

  const resetForm = () => {
    setPot(initialPot);
    setEnteredName('');
    setEnteredDifficulty("0");
    setEnteredLength(0);
    setEnteredDescription('');
    setVisibleMidwaypoint(false);
  };

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{paddingBottom: 30}} style={style.container}>
      <Text>Dodajanje poti II</Text>
      <DodajanjeTeksta name="Ime poti" onEnteredValue={setEnteredName} value={enteredName} />
      <View>
        <Text>Težavnost</Text>
        <Picker
          selectedValue={enteredDifficulty}
          onValueChange={(itemValue) => setEnteredDifficulty(itemValue)}
        >
          <Picker.Item label="lahko" value="1" />
          <Picker.Item label="srednje težko" value="2" />
          <Picker.Item label="težko" value="3" />
        </Picker>
      </View>
      {/* <DodajanjeTeksta name="Dolzina poti (km)" onEnteredValue={setEnteredLength} value={enteredLength}/> */}
      <DodajanjeTeksta name="Opis poti" onEnteredValue={setEnteredDescription} value={enteredDescription}/>
      <Button title="Dodaj točke" onPress={() => setVisibleMidwaypoint(true)} />
      {visibleMidwaypoint && <DodajanjeTocke midwayPoint={handleMidwayPoint} handleDeleteAllMidwayPoints={handleDeleteAllMidwayPoints} handleDeleteOneMidwayPoint={handleDeleteOneMidwayPoint} />}
      <View>
      <Button title="Dodaj pot" disabled={pot.vmesne_tocke.length === 0} onPress={() => savePath()} />
      </View>
    </ScrollView>
  );
};

export default DodajanjePotiII;
