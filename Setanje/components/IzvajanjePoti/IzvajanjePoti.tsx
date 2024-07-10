import React, { useState } from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { Button, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import PremikDoZacetneLokacije from "./PremikDoZacetneLokacije/PremikDoZacetneLokacije";
import Stoparica from "./Stoparica/Stoparica";

const IzvajanjePoti = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    
    const startLocationOfPath = {
        coords: {
            latitude: 44.87567,
            longitude: 13.84981,
        }
    };

    const startGame = () => {
        setStartTime(new Date());
        setGameStarted(true);
    };

    const endGame = () => {
        setGameStarted(false);
    };

    return (
        <View style={styles.container}>
        <Text>Izvajanje poti</Text>
        <SafeAreaView style={styles.container}>
            <Zemljevid endLocation={startLocationOfPath}/>
        </SafeAreaView>
        <View>
                    {!gameStarted ? (
                        <Button title="Začni igro" onPress={startGame} />
                    ) : (
                        <Stoparica 
                            startTime={startTime!} // zagotovimo, da startTime ni null
                        />
                    )}
                    {gameStarted && (
                        <Button title="Končaj igro" onPress={endGame} />
                    )}
                </View>
        </View>
    );
};

export default IzvajanjePoti;