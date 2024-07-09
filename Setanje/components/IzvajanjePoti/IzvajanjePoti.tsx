import React from "react";
import Zemljevid from "./Zemljevid/Zemljevid";
import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import styles from "./styles";
import PremikDoZacetneLokacije from "./PremikDoZacetneLokacije/PremikDoZacetneLokacije";

const IzvajanjePoti = () => {
    const testEndLocation = {
        coords: {
            latitude: 44.87567,
            longitude: 13.84981,
        }
    };

    return (
        <>
        <Text>Izvajanje poti</Text>
        <SafeAreaView style={styles.container}>
            <Zemljevid endLocation={testEndLocation}/>
        </SafeAreaView>
        </>
    );
};

export default IzvajanjePoti;