import React, { useEffect, useState } from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { Alert, Button, Modal, SafeAreaView, Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import Stoparica from "./Stoparica/Stoparica";
import { RootStackParamList } from "../Navigacija/types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import IzvajanjeVmesneTocke from "./IzvajanjeVmesneTocke/IzvajanjeVmesneTocke";
import { IzracunTock } from "./IzracunTock";
import IUporabnikPot from "../../models/IUporabnikPot";
import IUPVmesnaTocka from "../../models/IUPVmesnaTocka";
import userData from "../ProfilUporabnika/userData";
import IUser from "../../models/IUser";
import {posiljanjePodatkovUporabnikPot, preveriUporabnikPot} from "./posiljanjePodatkovUporabnikPot";
import { set } from "react-hook-form";
import { initialUser } from "../../models/initialValues";
import { initialUporabnikPot } from "../../models/initialValues";
import { Card } from "react-native-paper";

type IzvajanjePotiScreenProp = RouteProp<RootStackParamList, "IzvajanjePoti">;
type IzvajanjePotiNavigationProp = StackNavigationProp<
  RootStackParamList,
  "IzvajanjePoti"
>;

type NavProps = {
  route: IzvajanjePotiScreenProp;
};

const IzvajanjePoti: React.FC<NavProps> = ({ route }) => {
  const { pot } = route.params;
  const navigation = useNavigation<IzvajanjePotiNavigationProp>();

  const [gameStarted, setGameStarted] = useState<boolean>(true);
  const [gamePlayed, setGamePlayed] = useState<boolean>(false);
  const [indexOfMidwayPoint, setIndexOfMidwayPoint] = useState<number>(0);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timeUntilNextMidwayPoint, setTimeUntilNextMidwayPoint] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

  const [uporabnikPot, setUporabnikPot] = useState<IUporabnikPot>(initialUporabnikPot);
  const [thisUserData, setThisUserData] = useState<IUser>(initialUser);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    userData({setMessage, setData: setThisUserData});
  }, []);

  useEffect(() => {
    // console.log("PotID", pot._id);
    // console.log("UserID", thisUserData._id);
    setUporabnikPot({
      ...uporabnikPot,
      idPot: pot._id || '',
      idUporabnik: thisUserData._id,
      pot_naziv: pot.ime,
      uporabnik_naziv: thisUserData.username,
    });
  }, [thisUserData]);

  useEffect(() => {
    if (indexOfMidwayPoint == -1) {
      endGame();
    } else if (indexOfMidwayPoint != 0) {
        // Alert.alert('Naslednja točka', 
        //     'Med izvajanjem točke ne morate zapustiti igre, če jo želite dokončati in si s tem priigrati točke. Ali želite nadaljevati?', 
        //     [
        //       { text: 'Nadaljuj', onPress: () => {} },
        //       { text: 'Prekini', onPress: () => {stopGame()} }
        //     ],
        //     { cancelable: false }
        //   );
    };
  }, [indexOfMidwayPoint]);

  // useEffect(() => {console.log(uporabnikPot)}, [uporabnikPot]);
  const handleElapsedTime = (time: number) => {
    setElapsedTime(time);
  };

  const endGame = async () => {
    setGameStarted(false);
    setGamePlayed(true);

    const newUporabnikPot: IUporabnikPot = {
      ...uporabnikPot,
      koncana: true,
      celotna_distanca: distance,
      celotni_cas: elapsedTime,
      skupne_tocke: IzracunTock(pot.dolzina, distance, elapsedTime, points, pot.tocke),
    };
    console.log("koncana igra");
    // posiljanje podatkov na streznik
    posiljanjePodatkovUporabnikPot(newUporabnikPot);
  };

  const forceEndGame = () => {
    setGameStarted(false);
    setGamePlayed(true);
    const newUporabnikPot: IUporabnikPot = {
      ...initialUporabnikPot,
      idPot: pot._id || '',
      idUporabnik: thisUserData._id,
      koncana: false,
      prisilno_koncana: true,
    }
    posiljanjePodatkovUporabnikPot(newUporabnikPot);
  };

  const goBack = () => {
    setGameStarted(false);
    navigation.goBack();
  };

  // const stopGame = () => {
  //   goBack();
  //   // posiljanje podatkov na streznik
  //   console.log("zacasno ustavi igro");
  //   const newUporabnikPot: IUporabnikPot = {
  //     ...uporabnikPot,
  //     celotna_distanca: distance,
  //     celotni_cas: elapsedTime,
  //     koncana: false,
  //   };
  //   posiljanjePodatkovUporabnikPot(newUporabnikPot);
  // };

  const handleIndexChange = (index: number, newDistance: number, newPoints: number, userMidwayPoint: IUPVmesnaTocka) => {
    if (index < pot.vmesne_tocke.length) {
      setIndexOfMidwayPoint(index);
    } else {
      setIndexOfMidwayPoint(-1);
    }
    userMidwayPoint.distanca = newDistance;
    if (uporabnikPot.vmesne_tocke.length == 0) {
      userMidwayPoint.cas = elapsedTime;
    } else {
      userMidwayPoint.cas = elapsedTime - timeUntilNextMidwayPoint;
    };
    setTimeUntilNextMidwayPoint(elapsedTime);
    // console.log("userMidwayPoint", userMidwayPoint);
    setDistance(distance + newDistance);
    // console.log("points izvajanje poti", points);
    // console.log("new points izvajanje poti", newPoints);
    setPoints(points + newPoints);
    addMidwayPoint(userMidwayPoint);
  };

  const addMidwayPoint = (midwayPoint: IUPVmesnaTocka) => {
    setUporabnikPot({
      ...uporabnikPot,
      vmesne_tocke: [...uporabnikPot.vmesne_tocke, midwayPoint]
    });
  };

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.container}>
        {indexOfMidwayPoint > -1 && (
          <SafeAreaView>
            <IzvajanjeVmesneTocke
              index={indexOfMidwayPoint}
              vmesna_tocka={pot.vmesne_tocke[indexOfMidwayPoint]}
              onIndexChange={handleIndexChange}
            />
          </SafeAreaView>
        )}
        <View>
          {gamePlayed && (
            <View>
              <Card style={styles.cardPath}>
                <Card.Content>
                  <Text style={styles.titlePath}>{pot.ime}</Text>
                </Card.Content>
              </Card>
              <Card style={styles.cardLight}>
                <Card.Content>
                  <Text style={styles.cong}>Čestitke!</Text>
                  <Text style={styles.opr}>Pot je uspešno opravljena</Text>
                  <Text style={styles.text}>Težavnost: {pot.tezavnost}</Text>
                  <Text style={styles.text}>Dolžina poti: {distance} m</Text>
                  <Text style={styles.text}>Porabljen čas: {elapsedTime} s</Text>
                  <Text style={styles.text}>Število točk: {points}</Text>
                </Card.Content>
              </Card>
            </View>
          )}
        </View>

        <View>
          {gameStarted && (
            <View>
              <Stoparica
                startTime={startTime!}
                onElapsedTime={handleElapsedTime}
              />
            </View>
          )}
        </View>
        <View style={styles.bottomOfPage}>
        {/* <Button title="Končaj igro" onPress={forceEndGame} /> */}
        {gameStarted && (<TouchableOpacity onPress={forceEndGame} style={styles.purpleButton} >
          <Text style={styles.buttonText}>Končaj igro</Text>
        </TouchableOpacity>)}
        <TouchableOpacity onPress={goBack} style={styles.grayButton} >
          <Text style={styles.buttonText}>Nazaj</Text>
        </TouchableOpacity>
        {/* <Button title="Nazaj" onPress={goBack} /> */}
        </View>
      </View>
    </Modal>
  );
};

export default IzvajanjePoti;
