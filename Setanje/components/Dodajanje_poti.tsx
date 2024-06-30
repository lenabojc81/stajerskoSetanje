import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, ScrollView , Modal} from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Dodajanje_poti = () => {
    const { control, handleSubmit, reset } = useForm();
    const [paths, setPaths] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [markerName, setMarkerName] = useState('');



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
            };
            setMarkers([...markers, newMarker]);
            setSelectedLocation(null);
            console.log(markers);
            setMarkerName('');
            setModalVisible(false); 

            }}
    };

    const onSubmit = data => {
        
        data = { ...data, markers };
        console.log(data);
        console.log(data.markers[0]);
        
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
          <Button title="Shrani" onPress={savePin} />
        </View>
      </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    container1: {

        height: '40%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: 300,
        width: '100%',

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});

export default Dodajanje_poti;
