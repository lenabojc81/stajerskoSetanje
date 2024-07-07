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
import {baseUrl} from "../../global";


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
  };
  

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
            };
            setMarkers([...markers, newMarker]);
            setSelectedLocation(null);
            console.log(markers);
            setMarkerName('');
            setModalVisible(false); 

            }}
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
                    <View key={index} style={styles.pathItem}>
                        <Text style={styles.pathName}>Ime: {marker.ime}</Text> 
                        <Text style={styles.pathName}>Latitude: {marker.coordinate["latitude"]}</Text>
                        <Text style={styles.pathName}>longitude: {marker.coordinate["longitude"]}</Text>
                        <Text style={styles.pathName}>Uganka: {marker.uganka}</Text>
                    </View>

                ))}
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
            value={markerName}
            onChangeText={setMarkerName}
          />
           <TextInput
            style={styles.input}
            placeholder="Napiši uganko"
            value={uganke}
            onChangeText={setUganke}
          />
          <Button title="Shrani" onPress={savePin} />
        </View>
      </Modal>
        </ScrollView>
    );
};

export default DodajanjePoti;