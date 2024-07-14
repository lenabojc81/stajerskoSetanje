import React, { useState } from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { Button, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import Stoparica from "./Stoparica/Stoparica";
import { RootStackParamList } from "../Navigacija/types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type IzvajanjePotiScreenProp = RouteProp<RootStackParamList, 'IzvajanjePoti'>;
type IzvajanjePotiNavigationProp = StackNavigationProp<RootStackParamList, 'IzvajanjePoti'>;

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

    const startLocationOfPath = {
        // pridobi iz uporabnikove vnesene lokacije
        coords: {
            latitude: 44.87567, //pot.zacetna_lokacija.lokacija.coords.latitude,
            longitude: 13.84981, //pot.zacetna_lokacija.lokacija.coords.longitude,
        }
    };

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
    }

    return (
        <View style={styles.container}>
            <Text>Izvajanje poti</Text>
            <SafeAreaView style={styles.container}>
                <Zemljevid endLocation={startLocationOfPath} />
            </SafeAreaView>
            <View>{gamePlayed && (
                <Text>Čas potovanja: {elapsedTime} sekund</Text>
            )}</View>
            <View>
                {gameStarted && (
                    <>
                        <Stoparica
                            startTime={startTime!}
                            onElapsedTime={handleElapsedTime}
                        />
                        <Button title="Končaj igro" onPress={endGame} />
                    </>
                )}
            </View>
            <View>
                <Button title="Nazaj" onPress={stopGame} />
            </View>
        </View>
    );
};

export default IzvajanjePoti;
