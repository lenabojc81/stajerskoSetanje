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
            pravilen: boolean;
        }[];
    }[];
};

const UrediPot = ({ route, navigation }) => {
    const { control, handleSubmit, reset, setValue } = useForm();
    const [path, setPath] = useState(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<String>("");
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerName, setMarkerName] = useState('');
    const [uganke, setUganke] = useState('');

    //Tukaj so podatki za urejanje
    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [markerEdit, setEditMarker] = useState<MarkerType[]>([]);
    const [editMarkerName, setEditMarkerName] = useState('');
    const [ugankeEdit, setUgankeEdit] = useState("");
    const [dodatnaVprasanjaEdit, setDodatnaVprasanjaEdit] = useState([])
    const [editMarkerIndex, setEditMarkerIndex] = useState(0);
    ///////////////////////////////////////////////////////////


    const [dodatnaVprasanja, setDodatnaVprasanja] = useState<{
        vprasanje: string;
        odgovori: {
            odgovor: string;
            pravilen: boolean;
        }[];
    }[]>([{ vprasanje: "", odgovori: [{ odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }] }]);

    const { potId } = route.params;

    let testnaPot = {
        id: "1",
    dolzina: "20km",
    ime: "Lojzetova pot",
    opis: "pot je dolga 5km in je primerna za vse starosti. Pot je primerna za družine z otroki, saj je pot zelo enostavna in nezahtevna. Na poti se nahaja tudi igrišče za otroke. Pot je primerna za vse starosti.",
    tezavnost: "lahka",
    Tocke: "100",
    vmesne_tocke: [
      {
        ime: "pin 1",
        lokacija: [{ lat: "46.657398789705226", lng: "16.023557070370984" }],
        uganka: "uganka 1",
        dodatna_vprasanja: ([{ vprasanje: "vprasanje1", odgovori: [{ odgovor: "blabla", pravilen: true }, { odgovor: "hhhhh", pravilen: false }, { odgovor: "jjjjj", pravilen: false }, { odgovor: "kkkk", pravilen: false }] }])
      },
      {
        ime: "pin 2",
        lokacija: [{ lat: "46.657398789705226", lng: "16.023557070370984" }],
        uganka: "uganka 2",
        dodatna_vprasanja: ([{ vprasanje: "vprasanje1", odgovori: [{ odgovor: "aaaa", pravilen: true }, { odgovor: "bbbb", pravilen: false }, { odgovor: "cccc", pravilen: false }, { odgovor: "dddd", pravilen: false }] }])
      },
    ],
  }
//console.log(testnaPot.vmesne_tocke[0].dodatna_vprasanja[0].odgovori[0].pravilen);



  /*  useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

        // Fetch existing path data
        const fetchPathData = async () => {
            try {
                const response = await fetch(`${baseUrl}/PridobiPoti/${potId}`);
                const data = await response.json();
                setPath(data);
                setValue('Ime_poti', data.ime);
                setValue('Tezavnost', data.tezavnost);
                setValue('Dolzina_poti', data.dolzina);
                setValue('Opis', data.opis);
                setValue('Tocke', data.tocke);
                setMarkers(data.vmesne_tocke.map(tocka => ({
                    ime: tocka.ime,
                    coordinate: {
                        latitude: tocka.lokacija.lat,
                        longitude: tocka.lokacija.lng,
                    },
                    uganka: tocka.uganka,
                    dodatna_vprasanja: tocka.dodatna_vprasanja,
                })));
            } catch (error) {
                console.error('Napaka pri pridobivanju podatkov poti:', error);
            }
        };

        fetchPathData();
    }, []); */

    useEffect(() => {
        
        const data = testnaPot;
    
        setPath(data);
        setValue('Ime_poti', data.ime);
        setValue('Tezavnost', data.tezavnost);
        setValue('Dolzina_poti', data.dolzina);
        setValue('Opis', data.opis);
        setValue('Tocke', data.Tocke);
        setMarkers(data.vmesne_tocke.map(tocka => (
            {
            ime: tocka.ime,
            coordinate: {
                latitude: parseFloat(tocka.lokacija[0].lat),
                longitude: parseFloat(tocka.lokacija[0].lng),
            },
            uganka: tocka.uganka,
            dodatna_vprasanja: tocka.dodatna_vprasanja,
        })));

        setLocation(location);
        setModalVisible(false);
    
    
        setDodatnaVprasanja([{ vprasanje: "", odgovori: [{ odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }] }]);
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
                setMarkerName('');
                setUganke('');
                setDodatnaVprasanja([{ vprasanje: "", odgovori: [{ odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }, { odgovor: "", pravilen: false }] }]);
                setModalVisible(false);
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
        newDodatnaVprasanja[vprasanjeIndex].odgovori[odgovorIndex].odgovor = text;
        setDodatnaVprasanja(newDodatnaVprasanja);
    };

    const handlePravilenChange = (vprasanjeIndex: number, odgovorIndex: number) => {
        const newDodatnaVprasanja = [...dodatnaVprasanja];
        newDodatnaVprasanja[vprasanjeIndex].odgovori.forEach((odgovor, index) => {
            odgovor.pravilen = index === odgovorIndex;
        });
        setDodatnaVprasanja(newDodatnaVprasanja);
    };

    const editPin = (marker:any, index:any) => () => {
        console.log("To je param marker: ", marker);
        console.log("To je param index: ", index);
        setPinModalVisible(true);
        console.log("To je marker.ime: ",marker.ime)
        setMarkerName(marker.ime.toString());
        console.log("To je markerName: ", markerName)
        console.log("To je novi marker name: ", editMarkerName);
        setDodatnaVprasanja(marker.dodatna_vprasanja)    
        setSelectedLocation(marker.coordinate)
        console.log("To je selected location: ",selectedLocation);
        console.log("To je marker.uganka: ", marker.uganka);
        setUganke(marker.uganka);
        console.log("To je uganka: ", uganke);
        setEditMarkerIndex(index);
    };

    const saveEditedPin = () => {
        console.log("save edit pin selected location; ",selectedLocation);
        console.log("markerName: " , markerName);
        console.log("Marker uganka: " , uganke)
        if (selectedLocation) {
                const newMarker = {
                    ime: markerName,
                    coordinate: selectedLocation,
                    uganka: uganke,
                    dodatna_vprasanja: dodatnaVprasanja,
                };
                updateMarkerAtIndex(editMarkerIndex, newMarker);
                setPinModalVisible(false);
        }
    };
    const updateMarkerAtIndex = (indexToUpdate:number, newMarker:any) => {
        setMarkers((prevMarkers) => 
          prevMarkers.map((marker, index) =>
            index === indexToUpdate ? newMarker : marker
          )
        );
      };
      

    const onSubmit = async (data: any) => {
        data = { ...data, markers };
        const bodyData = {
            ime: data.Ime_poti,
            tezavnost: data.Tezavnost,
            dolzina: data.Dolzina_poti,
            opis: data.Opis,
            tocke: data.Tocke,
            vmesne_tocke: data.markers.map((marker) => ({
                ime: marker.ime,
                lokacija: {
                    lat: marker.coordinate.latitude,
                    lng: marker.coordinate.longitude,
                },
                uganka: marker.uganka,
                dodatna_vprasanja: marker.dodatna_vprasanja,
            })),
        };
        /*
        try {
            const response = await fetch(`${baseUrl}/urediPot/${potId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                throw new Error('Napaka pri posodabljanju podatkov na strežniku');
            }

            const responseData = await response.json();
            console.log('Podatki uspešno posodobljeni:', responseData);
            reset();
            setMarkers([]);
            navigation.goBack();
        } catch (error) {
            console.error('Napaka pri posodabljanju podatkov:', error);
        }
            */
           console.log("Podatki uspešno posodobljeni:", bodyData);
        
    };

    const closeModal = () => {
        setPinModalVisible(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Urejanje poti</Text>

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
                {markers.length > 0 && <Text style={styles.listTitle}>Seznam Pinov:</Text>}
                {markers.map((marker, index) => (
                    <View key={index} style={styles.pathItem}>
                        <Text style={styles.pathName}>Ime: {marker.ime}</Text>
                        <Text>Latitude: {marker.coordinate.latitude}</Text>
                        <Text>Longitude: {marker.coordinate.longitude}</Text>
                        <Text>Uganka: {marker.uganka}</Text>
                        <Text>Dodatno vprašanje: {marker.dodatna_vprasanja[0].vprasanje}</Text>
                        {marker.dodatna_vprasanja[0].odgovori.map((odgovor, idx) => (
                            <Text key={idx}>Odgovor: {odgovor.odgovor}, pravilen: {odgovor.pravilen ? "true" : "false"}</Text>
                        ))}
                        <Button title="Uredi" onPress={editPin(marker, index)} />
                    </View>
                ))}
            </View>

            <Button title="Posodobi" onPress={handleSubmit(onSubmit)} />

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

{/* ------------------------------------------------------------------------------------ */}
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={pinModalVisible}
                onRequestClose={() => {
                    setPinModalVisible(!pinModalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ime pina"
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

                    <Button title="Shrani" onPress={saveEditedPin} />
                    <Button title="Cancel" onPress={closeModal} />
                </View>
            </Modal>
            {/* ------------------------------------------------------------------------------------ */}
        </ScrollView>
    );
};

export default UrediPot;
