import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { baseUrl } from "../../global";
//`${baseUrl}/pridobiPoti`

const Poti = () => {
    const [poti, setPoti] = useState([{
        "id": "1",
        "dolzina": "20km",
        "ime": "Lojzetova pot",
        "opis": "pot je dolga 5km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
        "tezavnost": "lahka",
        "Tocke":"100",
        "vmesne_tocke": [{ "ime": "pin", "lokacija": [{"lat": "46.657398789705226", "lng":"16.023557070370984"}], "uganka": "uganka" }]
    },
    {
        "id": "2",
        "dolzina": "10km",
        "ime": "Štefkina pot",
        "opis": "Pot je dolga 10km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
        "tezavnost": "srednje",
        "Tocke":"100",
        "vmesne_tocke": [{ "ime": "pin", "lokacija": [{"lat": "46.657398789705226", "lng":"16.023557070370984"}], "uganka": "uganka" }]
    },
    {
        "id": "3",
        "dolzina": "ggffff",
        "ime": "Kekčeva pot",
        "opis": "Pot je dolga 20km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
        "tezavnost": "težka",
        "Tocke":"200",
        "vmesne_tocke": [{ "ime": "pin", "lokacija": [{"lat": "46.657398789705226", "lng":"16.023557070370984"}], "uganka": "uganka" }]
    }]);
    const [errorMsg, setErrorMsg] = useState(null);

    /* const fetchPoti = async () => {
         try {
             const response = await fetch(`${baseUrl}/pridobiPoti`);
             const data = await response.json();
             setPoti(data);
         } catch (error) {
             console.error(error);
             setErrorMsg('Napaka pri pridobivanju podatkov');
         }
     };
 
     useEffect(() => {
         fetchPoti();
     }, []);
 */
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Prikaz Poti</Text>
            {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
            {poti.map((pot, index) => (
                <View key={index} style={styles.pathItem}>
                    <Text style={styles.pathName}>Ime poti: {pot.ime}</Text>
                    <Text>Težavnost: {pot.tezavnost}</Text>
                    <Text>Dolžina poti: {pot.dolzina}</Text>
                    <Text>Opis: {pot.opis}</Text>
                    <Text>Število točk: {pot.Tocke}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    pathItem: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    pathName: {
        fontSize: 16,
    },
    markerItem: {
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});


export default Poti;