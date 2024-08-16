import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, View, Text, ScrollView, TouchableOpacity } from "react-native";
import ILokacija from "../../../models/ILokacija";
import * as Location from "expo-location";
import MapView, { Callout, MapPressEvent, Marker } from "react-native-maps";
import styles from "./styles";
import IVmesnaTocka from "../../../models/IVmesnaTocka";
import UrejanjeInformacijTocke from "./UrejanjeInformacijTocke/UrejanjeInformacijTocke";
import UrejanjePotiII from "../UrejanjePoti";

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IStartPoint {
  lokacija: ILokacija;
  naziv: string;
}

const initialStartLocation: IStartPoint = {
  lokacija: { lat: 0, lng: 0 },
  naziv: "Začetna točka",
};

const initialMarker: IVmesnaTocka = {
  ime: "",
  lokacija: {
    lat: 0,
    lng: 0,
  },
  uganka: "",
  odgovor: {
    odgovor: "",
    tip_odgovor: "",
  },
  dodatna_vprasanja: [],
};

interface UrejanjeTockeProps {
  midwayPoint: (value: IVmesnaTocka[], data: ILokacija) => void;
  handleDeleteAllMidwayPoints: () => void;
  handleDeleteOneMidwayPoint: (index: number) => void;
}

const UrejanjeTocke: React.FC<UrejanjeTockeProps> = ({
  midwayPoint, handleDeleteAllMidwayPoints, handleDeleteOneMidwayPoint
}) => {
  const [location, setLocation] = useState<ILokacija>({ lat: 0, lng: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<IRegion | undefined>(undefined);
  const [startLocation, setStartLocation] =
    useState<IStartPoint>(initialStartLocation);
  const [currentMarker, setCurrentMarker] =
    useState<IVmesnaTocka>(initialMarker);
  const [visibleInput, setVisibleInput] = useState<boolean>(false);
  const [markers, setMarkers] = useState<IVmesnaTocka[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();

    setRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, []);

  useEffect(() => {
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [location]);

  useEffect(() => {
    //console.log("currentMarker", currentMarker);
    if (currentMarker.lokacija.lat !== 0) {
        setVisibleInput(true);
    }
  }, [currentMarker.lokacija.lat]);

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    if (startLocation === initialStartLocation) {
      setStartLocation({
        lokacija: { lat: coordinate.latitude, lng: coordinate.longitude },
        naziv: "Začetna lokacija",
      });
    } else {
      setCurrentMarker({
        ...currentMarker,
        lokacija: { lat: coordinate.latitude, lng: coordinate.longitude },
      });
    }
  };

  const handleMidwayPointData = (data: IVmesnaTocka) => {
    data.lokacija = currentMarker.lokacija;
    setMarkers((prevMarkers) => {
        const newMarkers = [...prevMarkers, data];
        return newMarkers;
    });
    midwayPoint([...markers, data], {
      lat: startLocation.lokacija.lat,
      lng: startLocation.lokacija.lng,
    });
    setVisibleInput(false);
    setCurrentMarker(initialMarker);
  };

  const handleCloseModal = () => {
    setVisibleInput(false);
    setCurrentMarker(initialMarker);
  };

  const removeAllMarks = () => {
    setMarkers([]);
    setStartLocation(initialStartLocation);
    setCurrentMarker(initialMarker);
    handleDeleteAllMidwayPoints();
  };

  const removeMarker = (index: number) => {
    setMarkers(markers.filter((_, i) => i !== index));
    handleDeleteOneMidwayPoint(index);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <MapView region={region} style={styles.map} onPress={handleMapPress}>
          {startLocation && (
            <Marker
              coordinate={{
                latitude: startLocation.lokacija.lat,
                longitude: startLocation.lokacija.lng,
              }}
              pinColor="blue"
            >
              <Callout>
                <View>
                  <Text>{startLocation.naziv}</Text>
                </View>
              </Callout>
            </Marker>
          )}
          {currentMarker.lokacija.lat !== 0 && (
            <Marker
              coordinate={{
                latitude: currentMarker.lokacija.lat,
                longitude: currentMarker.lokacija.lng,
              }}
              pinColor="red"
            />
          )}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.lokacija.lat,
                longitude: marker.lokacija.lng,
              }}
              pinColor="red"
            >
              <Callout>
                <View>
                  <Text>{marker.ime}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </SafeAreaView>
      <Button
        title="remove all markers"
        disabled={startLocation.lokacija.lat === 0}
        onPress={() => {removeAllMarks()}}
      />
      {markers.length > 0 && (
        markers.map((marker, index) => (
          <View key={index} style={styles.container}>
            <Text>{marker.ime}</Text>
            <Text>{marker.uganka}</Text>
            <TouchableOpacity onPress={() => {removeMarker(index)}} style={styles.removeButton} >
              <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <UrejanjeInformacijTocke
        midwayPoint={currentMarker}
        onEnteredMidwayPoint={handleMidwayPointData}
        onClose={handleCloseModal}
        visability={visibleInput}
      />
    </ScrollView>
  );
};

export default UrejanjeTocke;
