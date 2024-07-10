import React, { useState } from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { Button, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import PremikDoZacetneLokacije from "./PremikDoZacetneLokacije/PremikDoZacetneLokacije";
import Stoparica from "./Stoparica/Stoparica";

const IzvajanjePoti = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [gamePlayed, setGamePlayed] = useState<boolean>(false);

    const startLocationOfPath = {
        // pridobi iz baze glede na id poti
        coords: {
            latitude: 44.87567,
            longitude: 13.84981,
        }
    };

    const startGame = () => {
        setStartTime(new Date());
        setGameStarted(true);
    };

    const endGame = async () => {
        setGameStarted(false);
        setGamePlayed(true);

        // posiljanje podatkov na streznik
    };

    const handleElapsedTime = (time: number) => {
        setElapsedTime(time);
    };

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
                {!gameStarted && !gamePlayed && (
                    <Button title="Začni igro" onPress={startGame} />
                )}
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
        </View>
    );
};

export default IzvajanjePoti;
