import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Modal,
} from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import { baseUrl } from "../../global";


type FormData = {
    Ime_poti: string;
    Tezavnost: string;
    Dolzina_poti: string;
    Opis: string;
    Tocke: number;
};

type MarkerType = {
    ime: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    uganka: string;
    dodatna_vprasanja: {
        vprasanje: string;
        odgovori: {
            odgovor: string;
            true: boolean;
        }

    };
}[];



const DodajanjePoti = () => {
    const { control, handleSubmit, reset } = useForm();
    const [paths, setPaths] = useState([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<String>("");
    const [markers, setMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerName, setMarkerName] = useState('');
    const [uganke, setUganke] = useState([]);
    const [tocke, setTocke] = useState([]);
    const [dodatnaVprasanja, setDodatnaVprasanja] = useState<{
        vprasanje: string;
        odgovori: {
            odgovor: string;
            pravilen: boolean;
        }[];
    }[]>([{ vprasanje: "", odgovori: [{ odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }] }]);


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let region = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    if (location) {
        region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
    }

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
        setModalVisible(true);
        console.log(coordinate);
    };

    const savePin = () => {
        if (selectedLocation) {
            if (markerName.trim() !== '') {
                const newMarker = {
                    ime: markerName,
                    coordinate: selectedLocation,
                    uganka: uganke,
                    dodatna_vprasanja: dodatnaVprasanja,

                };
                setMarkers([...markers, newMarker]);
                setSelectedLocation(null);
                console.log(markers);
                setMarkerName('');
                setModalVisible(false);
                setUganke('');
                setDodatnaVprasanja([{ vprasanje: "", odgovori: [{ odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }] }]);

            }
        }
    };
    const handleVprasanjeChange = (text: string, index: number) => {
        const newDodatnaVprasanja = [...dodatnaVprasanja];
        newDodatnaVprasanja[index].vprasanje = text;
        setDodatnaVprasanja(newDodatnaVprasanja);
    };

    const handleOdgovorChange = (
        text: string,
        vprasanjeIndex: number,
        odgovorIndex: number,
    ) => {
        const newDodatnaVprasanja = [...dodatnaVprasanja];
        console.log(newDodatnaVprasanja);


        newDodatnaVprasanja[vprasanjeIndex].odgovori[odgovorIndex]["odgovor"] = text;
        console.log(newDodatnaVprasanja);

        setDodatnaVprasanja(newDodatnaVprasanja);
        console.log("to so dodatna vprasanja", dodatnaVprasanja[0]["odgovori"][0]["odgovor"]);
    };

    const handlePravilenChange = (vprasanjeIndex: number, odgovorIndex: number) => {
        const newDodatnaVprasanja = [...dodatnaVprasanja];
        newDodatnaVprasanja[vprasanjeIndex].odgovori.forEach((odgovor, index) => {
            odgovor.pravilen = index === odgovorIndex;
        });
        setDodatnaVprasanja(newDodatnaVprasanja);
    };

    const onSubmit = async (data) => {

        data = { ...data, markers };
        console.log(data);
        const bodyData = {
            ime: data.Ime_poti,
            tezavnost: data.Tezavnost,
            dolzina: data.Dolzina_poti,
            opis: data.Opis,
            tocke: data.Tocke,
            vmesne_tocke: data.markers.map((marker) => ({
                ime: marker.ime,
                lokacija: {
                    lat: marker.coordinate["latitude"],
                    lng: marker.coordinate["longitude"],
                },
                uganka: marker.uganka,
                dodatna_vprasanja: marker.dodatna_vprasanja,
            })),
        }
        console.log(bodyData);
        try {
            const response = await fetch(`${baseUrl}/dodajPot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Napaka pri pošiljanju podatkov na strežnik');
            }

            const responseData = await response.json();
            console.log('Podatki uspešno poslani:', responseData);
            reset();
            setMarkers([]);
        } catch (error) {
            console.error('Napaka pri pošiljanju podatkov:', error);
        }
    };



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dodajanje poti</Text>

            <Controller
                control={control}
                name="Ime_poti"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Ime poti"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name="Tezavnost"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Tezavnost"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Controller
                control={control}
                name="Dolzina_poti"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Dolzina poti"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name="Opis"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Opis"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <Controller
                control={control}
                name="Tocke"
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder="Točke"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            <MapView style={styles.map} region={region} onPress={handleMapPress}>
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                    />
                ))}
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        pinColor="red"
                    />
                )}
            </MapView>
            <View style={styles.pathList}>
                {paths.length > 0 && <Text style={styles.listTitle}>Seznam Poti:</Text>}
                {paths.map((path, index) => (
                    <View key={index} style={styles.pathItem}>
                        <Text style={styles.pathName}>Ime poti: {path.Ime_poti}</Text>
                        <Text>Težavnost: {path.Tezavnost}</Text>
                        <Text>Dolžina poti: {path.Dolzina_poti}</Text>
                        <Text>Opis: {path.Opis}</Text>
                        <Text>Točke: {path.Tocke}</Text>
                    </View>
                ))}
            </View>

            <View>
                {paths.length > 0 && <Text style={styles.listPins}>Seznam Pinov:</Text>}
                {markers.map((marker, index) => (
                    console.log(marker),
                    console.log(marker.dodatna_vprasanja[0]["odgovori"]),
                    <View key={index} style={styles.pathItem}>
                        <Text style={styles.pathName}>Ime: {marker.ime}</Text>
                        <Text style={styles.pathName}>Latitude: {marker.coordinate["latitude"]}</Text>
                        <Text style={styles.pathName}>longitude: {marker.coordinate["longitude"]}</Text>
                        <Text style={styles.pathName}>Uganka: {marker.uganka}</Text>
                        <Text style={styles.pathName}>Dodatno vprašanje: {marker.dodatna_vprasanja[0]["vprasanje"]}</Text>
                        {marker.dodatna_vprasanja[0]["odgovori"].map((odgovor) => (
                            <Text style={styles.pathName}>Odgovor: {odgovor["odgovor"]}, pravilen: {odgovor["pravilen"] ? ("true") : ("false")}</Text>
                        ))}

                    </View>

                ))}

            </View>
            <View style={styles.container}>
                <Button title="Dodaj" onPress={handleSubmit(onSubmit)} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ime markerja"
                        placeholderTextColor="#000000"
                        value={markerName}
                        onChangeText={setMarkerName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Napiši uganko"
                        placeholderTextColor="#000000"
                        value={uganke}
                        onChangeText={setUganke}
                    />

                   
                    {dodatnaVprasanja.map((vprasanje, vprasanjeIndex) => (
                        <View key={vprasanjeIndex}>
                            <TextInput
                                style={styles.input}
                                placeholder={`Dodatno vprašanje ${vprasanjeIndex + 1}`}
                                placeholderTextColor="#000000"
                                value={vprasanje.vprasanje}
                                onChangeText={(text) => handleVprasanjeChange(text, vprasanjeIndex)}
                            />
                            {vprasanje.odgovori.map((odgovor, odgovorIndex) => (
                                <View key={odgovorIndex} style={styles.answerContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Odgovor ${odgovorIndex + 1}`}
                                        value={odgovor.odgovor}
                                        onChangeText={(text) => handleOdgovorChange(text, vprasanjeIndex, odgovorIndex)}
                                    />
                                    <Button
                                        title={odgovor.pravilen ? "Pravilen" : "Nastavi kot pravilen"}
                                        onPress={() => handlePravilenChange(vprasanjeIndex, odgovorIndex)}
                                        color={odgovor.pravilen ? "green" : "blue"}
                                    />
                                </View>
                            ))}
                        </View>
                    ))}

                    <Button title="Shrani" onPress={savePin} />
                </View>
            </Modal>
        </ScrollView>
    );
};

export default DodajanjePoti;