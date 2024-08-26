import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, Alert, TouchableOpacity } from "react-native";
import IPot from "../../../models/IPot";
import IVmesnaTocka from "../../../models/IVmesnaTocka";
import ILokacija from "../../../models/ILokacija";
import Zemljevid from "../Zemljevid/Zemljevid";
import { haversineDistance } from "../Zemljevid/MerjenjeDistance/RazdaljaMedDvemaTockama";
import ImageUpload from "../../LandmarkDetection/landmarkDetection";
import { baseUrl } from "../../../global";
import { SafeAreaView } from "react-native-safe-area-context";
import DodatnaVprasanja from "./DodatnaVprasanja/DodatnaVprasanja";
import { set } from "react-hook-form";
import IUPVmesnaTocka from "../../../models/IUPVmesnaTocka";
import IUporabnikPot from "../../../models/IUporabnikPot";
import IUPDodatnoVprasanje from "../../../models/IUPDodatnoVprasanje";
import styles from "./styles";
import { Card } from "react-native-paper";

interface IzvajanjeVmesneTockeProps {
  index: number;
  vmesna_tocka: IVmesnaTocka;
  onIndexChange: (index: number, distance: number, points: number, userMidwayPoint: IUPVmesnaTocka) => void;
  isAdmin: boolean;
}

interface IOdgovor {
  odgovor: string;
}

interface IMozniOdgovori {
  lokacija: ILokacija;
  odgovor: IOdgovor;
}


const IzvajanjeVmesneTocke: React.FC<IzvajanjeVmesneTockeProps> = ({
  index,
  vmesna_tocka,
  onIndexChange,
  isAdmin,
}) => {
  const [selectedEndLocation, setSelectedEndLocation] =
    React.useState<ILokacija | null>(null);
  const [showAIButton, setShowAIButton] = React.useState<boolean>(false);
  const [mozniOdgovori, setMozniOdgovori] = useState<IMozniOdgovori[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1);
  const [locationAtEnd, setLocationAtEnd] = useState<ILokacija | null>(null);
  const [rightLocation, setRightLocation] = useState<boolean>(false);
  const [indexOfAdditionalQuestion, setIndexOfAdditionalQuestion] =
    useState<number>(0);
  const [visibleAdditionalQuestion, setVisibleAdditionalQuestion] =
    useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [additionalPoints, setAdditionalPoints] = useState<number>(0);
  const [picture, setPicture] = useState<boolean>(false);

  const [changeAnswerCounter, setChangeAnswerCounter] = useState<number>(0);
  const [userAdditionalPoints, setUserAdditionalPoints] = useState<IUPDodatnoVprasanje[]>([]);

  // useEffect(() => {
  //   console.log("userAdditionalPoints", userAdditionalPoints.length);
  // }, [userAdditionalPoints]);

  useEffect(() => {
    fetchAnswers();
  }, [vmesna_tocka]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [indexOfAdditionalQuestion]);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const fetchAnswers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/paths/pridobiOdgovore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipOdgovora: vmesna_tocka.odgovor.tip_odgovor,
          neOdgovor: vmesna_tocka.odgovor.odgovor,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let extract: IMozniOdgovori[] = data.map(
        (item: any) => item.vmesne_tocke
      );
      extract.push({
        lokacija: vmesna_tocka.lokacija,
        odgovor: { odgovor: vmesna_tocka.odgovor.odgovor },
      });
      extract.sort(() => Math.random() - 0.5);
      setMozniOdgovori(extract);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationUpdate = (currentLocation: ILokacija) => {
    if (selectedEndLocation == null) return;
    const distanceToStart = haversineDistance(
      currentLocation,
      selectedEndLocation
    );
    if (distanceToStart <= 50 && selectedAnswer == vmesna_tocka.odgovor.odgovor) {
      setShowAIButton(true);
      setLocationAtEnd(currentLocation);
    } else if (distanceToStart <= 50) {
      setShowAIButton(false);
      Alert.alert("Napačen odgovor", "Spremenite svoj odgovor na uganko");
    } else {
      setShowAIButton(false);
    }
  };

  const handleDistanceUpdate = (distance: number) => {
    setDistance(distance);
  };

  const selectedDestination = (mo: IMozniOdgovori, index: number) => {
    setSelectedEndLocation(mo.lokacija);
    setSelectedButtonIndex(index);
    setSelectedAnswer(mo.odgovor.odgovor);
  };

  const resetAnswer = () => {
    setSelectedEndLocation(null);
    setSelectedButtonIndex(-1);
    setSelectedAnswer("");
    setPicture(false);
    setShowAIButton(false);

    //odbitek tock
    setAdditionalPoints(additionalPoints - 10);
    setChangeAnswerCounter(changeAnswerCounter + 1);
  };

  const nextMidwayPoint = (correct: boolean, additionalQuestionUser: IUPDodatnoVprasanje) => {
    setSelectedEndLocation(null);
    setShowAIButton(false);
    setMozniOdgovori([]);
    setSelectedAnswer("");
    setPicture(false);
    setSelectedButtonIndex(-1);
    setLocationAtEnd(null);
    setRightLocation(false);

    let allUserAdditionalQuestions = [...userAdditionalPoints, additionalQuestionUser];
    // console.log("allUserAdditionalQuestions", allUserAdditionalQuestions);

    let userMidwayPoint: IUPVmesnaTocka = {
      najkrajsa_distanca: 0,
      distanca: distance,
      cas: 0,
      st_spremenjenih_odgovorov: changeAnswerCounter,
      dodatna_vprasanja: allUserAdditionalQuestions,
    }
    // console.log("userMidwayPoint", userMidwayPoint);

    if (correct) {
      onIndexChange(index + 1, distance, additionalPoints + 10, userMidwayPoint);
    } else {
      onIndexChange(index + 1, distance, additionalPoints, userMidwayPoint);
    }
    
    setDistance(0);
    setAdditionalPoints(0);
    setChangeAnswerCounter(0);
    setUserAdditionalPoints([]);
  };

  useEffect(() => {
    if (isAdmin && picture) {
      setRightLocation(true);
      setVisibleAdditionalQuestion(true);
    } else {
      checkLocation();
    }
  }, [picture]);

  const checkLocation = () => {
    if (locationAtEnd == null) return;
    const distance = haversineDistance(locationAtEnd, vmesna_tocka.lokacija);
    if (distance <= 50) {
      setRightLocation(true);
      setVisibleAdditionalQuestion(true);
    } else {
      setRightLocation(false);
    }
  };

  const checkIALocation = (location: ILokacija) => {
    if (location == null) return;
    const distance = haversineDistance(location, vmesna_tocka.lokacija);
    if (distance <= 250) {
      setRightLocation(true);
      setVisibleAdditionalQuestion(true);
    } else {
      setRightLocation(true);
    }
  }

  const handleIndexOfAdditionalQuestion = (index: number, correct: boolean, additionalQuestionUser: IUPDodatnoVprasanje) => {
    // console.log("correct", correct);
    if (correct) {
      setAdditionalPoints(additionalPoints + 10);
    };
    if (
      indexOfAdditionalQuestion ==
      vmesna_tocka.dodatna_vprasanja.length - 1
    ) {
      setIndexOfAdditionalQuestion(0);
      setVisibleAdditionalQuestion(false);
      nextMidwayPoint(correct, additionalQuestionUser);
    } else {
      setIndexOfAdditionalQuestion(indexOfAdditionalQuestion + 1);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.question}>
              {vmesna_tocka.uganka}?
            </Text>
          </Card.Content>
        </Card>
        {selectedButtonIndex == -1 &&
          mozniOdgovori.map((mo, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => selectedDestination(mo, index)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{mo.odgovor.odgovor}</Text>
            </TouchableOpacity>
          ))}
      </View>
      {selectedEndLocation != null && (
        <View>
          <Text style={styles.selectedAnswer}>{selectedAnswer}</Text>
            <TouchableOpacity onPress={() => resetAnswer()} style={styles.button}>
              <Text style={styles.buttonText}>Spremeni odgovor</Text>
            </TouchableOpacity>
          <SafeAreaView>
            <Zemljevid
              endLocation={selectedEndLocation}
              onLocationUpdate={handleLocationUpdate}
              onDistanceUpdate={handleDistanceUpdate}
            />
            {/* <Text>{distance.toFixed(2)}</Text> */}
          </SafeAreaView>
        </View>
      )}

      {(showAIButton || (isAdmin && selectedEndLocation != null)) && (
        <View>
          <ImageUpload handlePicture={setPicture} isAdmin={isAdmin} handleLandmarkDetails={checkIALocation}/>
          {/* <Button title="preveri okolico" onPress={checkLocation} /> */}
        </View>
      )}
      {rightLocation && (
        <View>
          {visibleAdditionalQuestion && (
            <DodatnaVprasanja
              index={indexOfAdditionalQuestion}
              additionalQuestion={
                vmesna_tocka.dodatna_vprasanja[indexOfAdditionalQuestion]
              }
              onIndexChange={handleIndexOfAdditionalQuestion}
              setUserAdditionalPoints={setUserAdditionalPoints}
            />
          )}
          {/* <Button title="na naslednjo točko" onPress={() => nextMidwayPoint(true, )} /> */}
        </View>
      )}
    </ScrollView>
  );
};

export default IzvajanjeVmesneTocke;
