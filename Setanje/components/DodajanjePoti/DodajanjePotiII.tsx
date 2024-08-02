import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import DodajanjeTeksta from "./DodajanjeTeksta/DodajanjeTeksta";
import IPot from "../../models/IPot";
import style from "./style";
import DodajanjeTocke from "./DodajanjeTocke/DodajanjeTocke";
import IVmesnaTocka from "../../models/IVmesnaTocka";
import ILokacija from "../../models/ILokacija";

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

  const [enteredName, setEnteredName] = useState('');
  const [enteredDifficulty, setEnteredDifficulty] = useState('');
  const [enteredLength, setEnteredLength] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredPoints, setEnteredPoints] = useState('');

  const handleMidwayPoint = (
    midwayPoints: IVmesnaTocka[],
    dataStart: ILokacija
  ) => {
    setPot({
      ...pot,
      vmesne_tocke: midwayPoints,
      zacetna_lokacija: dataStart,
    });
    console.log('pot', pot);
  };

  const savePath = () => {
    //save to db
    console.log(pot);
    //reset form
    setPot(initialPot);
    setEnteredName('');
    setEnteredDifficulty('');
    setEnteredLength('');
    setEnteredDescription('');
    setEnteredPoints('');
  };

  return (
    <ScrollView style={style.container}>
      <Text>Dodajanje poti II</Text>
      <DodajanjeTeksta name="Ime poti" onEnteredValue={setEnteredName} value={enteredName} />
      <DodajanjeTeksta name="Tezavnost" onEnteredValue={setEnteredDifficulty} value={enteredDifficulty}/>
      <DodajanjeTeksta name="Dolzina poti" onEnteredValue={setEnteredLength} value={enteredLength}/>
      <DodajanjeTeksta name="Opis poti" onEnteredValue={setEnteredDescription} value={enteredDescription}/>
      <DodajanjeTeksta name="Tocke" onEnteredValue={setEnteredPoints} value={enteredPoints}/>
      <DodajanjeTocke midwayPoint={handleMidwayPoint} />
      <Button title="Dodaj pot" disabled={pot.vmesne_tocke.length === 0} onPress={() => savePath()} />
    </ScrollView>
  );
};

export default DodajanjePotiII;
