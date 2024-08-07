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
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gamePlayed, setGamePlayed] = useState<boolean>(false);
  const [indexOfMidwayPoint, setIndexOfMidwayPoint] = useState<number>(0);

  const endGame = async () => {
    setGameStarted(false);
    setGamePlayed(true);
    // posiljanje podatkov na streznik
  };

  const handleElapsedTime = (time: number) => {
    setElapsedTime(time);
  };

  const stopGame = () => {
    setGameStarted(false);
    navigation.goBack();
    // posiljanje podatkov na streznik
  };

  const handleIndexChange = (index: number) => {
    if (index < pot.vmesne_tocke.length) {
      setIndexOfMidwayPoint(index);
    } else {
      setIndexOfMidwayPoint(-1);
    }
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
          {gamePlayed && <Text>Čas potovanja: {elapsedTime} sekund</Text>}
        </View>
        {indexOfMidwayPoint == -1 && <Text>konec igre</Text>}
        <View>
          {gameStarted && (
            <View>
              <Stoparica
                startTime={startTime!}
                onElapsedTime={handleElapsedTime}
              />
              <Button title="Končaj igro" onPress={endGame} />
            </View>
          )}
        </View>
        <View>
          <Button title="Nazaj" onPress={stopGame} />
        </View>
      </View>
    </Modal>
  );
};

export default IzvajanjePoti;
