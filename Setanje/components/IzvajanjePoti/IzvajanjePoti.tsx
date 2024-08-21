import React, { useEffect, useState } from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { Button, Modal, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import Stoparica from "./Stoparica/Stoparica";
import { RootStackParamList } from "../Navigacija/types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import IzvajanjeVmesneTocke from "./IzvajanjeVmesneTocke/IzvajanjeVmesneTocke";
import { IzracunTock } from "./IzracunTock";
import IUporabnikPot from "../../models/IUporabnikPot";
import IUPDodatnoVprasanje from "../../models/IUPDodatnoVprasanje";
import IUPVmesnaTocka from "../../models/IUPVmesnaTocka";
import userData from "../ProfilUporabnika/userData";
import IUser from "../../models/IUser";
import { baseUrl } from "../../global";

type IzvajanjePotiScreenProp = RouteProp<RootStackParamList, "IzvajanjePoti">;
type IzvajanjePotiNavigationProp = StackNavigationProp<
  RootStackParamList,
  "IzvajanjePoti"
>;

type NavProps = {
  route: IzvajanjePotiScreenProp;
};

const initialUporabnikPot: IUporabnikPot = {
  idUporabnik: '',
  idPot: '',
  koncana: false,
  prisilno_koncana: false,
  admin: false,
  celotna_distanca: 0,
  celotni_cas: 0,
  skupne_tocke: 0,
  vmesne_tocke: [],
};

const initialUser: IUser = {
  __v: 0,
  _id: '',
  email: '',
  password: '',
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

    //preveri ce je uporabnik ze kdaj igral to pot in ce je jo je koncal
  }, []);

  useEffect(() => {
    // console.log("PotID", pot._id);
    // console.log("UserID", thisUserData._id);
    setUporabnikPot({
      ...uporabnikPot,
      idPot: pot._id || '',
      idUporabnik: thisUserData._id,
    });
  }, [thisUserData]);

  useEffect(() => {
    if (indexOfMidwayPoint == -1) {
      // setUporabnikPot({
      //   ...uporabnikPot,
      //   celotna_distanca: distance,
      //   celotni_cas: elapsedTime,
      //   koncana: true,
      //   skupne_tocke: IzracunTock(pot.dolzina, distance, elapsedTime, points, pot.tocke),
      // })
      endGame();
    }
  }, [indexOfMidwayPoint]);

  // useEffect(() => {console.log(uporabnikPot)}, [uporabnikPot]);

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

    // posiljanje podatkov na streznik
    try {
      const response = await fetch(`${baseUrl}/api/userPath/dodajUporabnikPot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUporabnikPot),
      });
      if (response.ok) {
        console.log('successfully added');
      }
    } catch (error) {
      console.error(error);
    };
  };

  const handleElapsedTime = (time: number) => {
    setElapsedTime(time);
  };

  const stopGame = () => {
    setGameStarted(false);
    navigation.goBack();
    // posiljanje podatkov na streznik
  };

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
        <Text>Izvajanje poti</Text>
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
              <Text>predvidena distanca: {pot.dolzina}</Text>
              <Text>Prehojena razdalja: {distance} metrov</Text>
              <Text>Čas potovanja: {elapsedTime} sekund</Text>
              <Text>Število točk: {points}</Text>
            </View>
          )}
        </View>
        {indexOfMidwayPoint == -1 && <Text>konec igre</Text>}
        <View>
          {gameStarted && (
            <View>
              <Stoparica
                startTime={startTime!}
                onElapsedTime={handleElapsedTime}
              />
              {/* ustvari novo metodo, ki prepreci navadnemu userju, da bi se kdaj igral to igro */}
              <Button title="Končaj igro" onPress={endGame} />
            </View>
          )}
        </View>
        <View>
          {/* prikaz zgolj pri prehodu na novo vmesni tocko in ustavi igro, tj. lahko nadaljuje od tiste tocke */}
          <Button title="Nazaj" onPress={stopGame} />
        </View>
      </View>
    </Modal>
  );
};

export default IzvajanjePoti;
