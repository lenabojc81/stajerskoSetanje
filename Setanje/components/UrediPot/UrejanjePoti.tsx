import React, { useEffect, useState, useRef } from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { View, ScrollView, Alert } from "react-native";
import UrejanjeTeksta from "./UrejanjeTeksta/UrejanjeTeksta";
import IPot from "../../models/IPot";
import style from "./style";
import UrejanjeTocke from "./UrejanjeTocke/UrejanjeTocke";
import IVmesnaTocka from "../../models/IVmesnaTocka";
import ILokacija from "../../models/ILokacija";
import { Picker } from "@react-native-picker/picker";
import { baseUrl } from "../../global";
import { SafeAreaView } from "react-native-safe-area-context";
import { haversineDistance } from "../IzvajanjePoti/Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";
import { TextInput, Button, Text, Divider, Dialog, Portal, IconButton, Card } from "react-native-paper";
import IzvajanjeVmesneTocke from "../IzvajanjePoti/IzvajanjeVmesneTocke/IzvajanjeVmesneTocke";


const UrejanjePotiII = () => {
   // const { Pot } = route.params;
  //  console.log(Pot);
  const route = useRoute();
  const { pot } = route.params;
 //console.log("to je izbrana pot", pot);

  const [potU, setPotU] = useState<IPot>(pot);
  const scrollViewRef = useRef<ScrollView>(null);

 // console.log("shranjena pot v potU",potU);



  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredDifficulty, setEnteredDifficulty] = useState<string>("0");
  const [enteredLength, setEnteredLength] = useState<number>(0);
  const [enteredDescription, setEnteredDescription] = useState<string>('');
  const [visibleMidwaypoint, setVisibleMidwaypoint] = useState<boolean>(false);


 // console.log("to je pot", pot);

  useEffect(() => {
    if (potU) {
      setEnteredName(potU.ime || '');
      setEnteredDifficulty(potU.tezavnost.toString() || "0");
      setEnteredLength(potU.dolzina || 0);
      setEnteredDescription(potU.opis || '');
    }
  }, [potU]);

//console.log("to so vmesne točke poti UUUU", potU.vmesne_tocke);

  const handleMidwayPoint = (
    midwayPoints: IVmesnaTocka[],
    dataStart: ILokacija
  ) => {
    setPotU({
      ...potU,
      vmesne_tocke: midwayPoints,
      zacetna_lokacija: dataStart,
    });
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const handleDeleteAllMidwayPoints = () => {
    setPotU({
      ...potU,
      vmesne_tocke: [],
      dolzina: 0,
    });
  };

  const handleDeleteOneMidwayPoint = (index: number) => {
    const newMidwayPoints = potU.vmesne_tocke.filter((_, i) => i !== index);
    setPotU({
      ...potU,
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
    let numOfAdditionalQuestions: number = 0;
    for (let i = 0; i < pot.vmesne_tocke.length; i++) {
      if (i === 0) {
        allDistance += haversineDistance(potU.zacetna_lokacija, potU.vmesne_tocke[i].lokacija);
      } else {
        allDistance += haversineDistance(potU.vmesne_tocke[i - 1].lokacija, potU.vmesne_tocke[i].lokacija);
      }
      numOfAdditionalQuestions += potU.vmesne_tocke[i].dodatna_vprasanja.length;
    };

    const posodobljenaPot: IPot = {
      dolzina: Number((allDistance / 1000).toFixed(2)),
      ime: enteredName,
      opis: enteredDescription,
      tezavnost: Number(enteredDifficulty),
      // max tocke = 100 * tezavnost + 10 * st vmesnih tock
      tocke: 100 * Number(enteredDifficulty) + 10 * numOfAdditionalQuestions,
      vmesne_tocke: potU.vmesne_tocke,
      zacetna_lokacija: potU.zacetna_lokacija,
    };

    //posodobi v bazi
    try {
      const response = await fetch(`${baseUrl}/api/paths/posodobiPot/${pot._id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(posodobljenaPot),
      });

      if (!response.ok) {
          console.error('Napaka pri posodabljanju poti');
          Alert.alert('Napaka', 'Posodabljanje poti ni uspelo.');
          return;
      }

      const responseData = await response.json();
      Alert.alert('Uspeh', 'Pot je uspešno posodobljena.');
      resetForm();
  } catch (error) {
      console.error('Napaka pri pošiljanju podatkov', error);
      Alert.alert('Napaka', 'Pri posodabljanju poti je prišlo do napake.');
  }
};

  const resetForm = () => {
    setPotU(potU);
    setEnteredName('');
    setEnteredDifficulty("0");
    setEnteredLength(0);
    setEnteredDescription('');
    setVisibleMidwaypoint(false);
  };

  return (
    <SafeAreaView style={style.safeArea}>
    <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 30 }} style={style.container}>
      <Card style={style.card}>
        <Card.Title title="Dodajanje Poti II" />
        <Card.Content>
          <TextInput
            label="Ime poti"
            value={enteredName}
            onChangeText={setEnteredName}
            mode="outlined"
            style={style.input}
          />
          <Text>Težavnost</Text>
          <View style={style.pickerContainer}>
            <Picker
              selectedValue={enteredDifficulty}
              onValueChange={(itemValue) => setEnteredDifficulty(itemValue)}
              style={style.picker}
            >
              <Picker.Item label="lahko" value="1" />
              <Picker.Item label="srednje težko" value="2" />
              <Picker.Item label="težko" value="3" />
            </Picker>
          </View>
          <TextInput
            label="Opis poti"
            value={enteredDescription}
            onChangeText={setEnteredDescription}
            mode="outlined"
            multiline
            style={style.input}
          />
             {!visibleMidwaypoint && <Button mode="contained" onPress={() => setVisibleMidwaypoint(true)} style={style.button} >
            Uredi točke
          </Button>}
          {visibleMidwaypoint && (
            <UrejanjeTocke
              midwayPoint={handleMidwayPoint}
              handleDeleteAllMidwayPoints={handleDeleteAllMidwayPoints}
              handleDeleteOneMidwayPoint={handleDeleteOneMidwayPoint}
              existingPoints={potU.vmesne_tocke}
            />
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" disabled={potU.vmesne_tocke.length === 0} onPress={savePath} style={style.button}>
            Posodobi pot
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  </SafeAreaView>
  );
};

export default UrejanjePotiII;
