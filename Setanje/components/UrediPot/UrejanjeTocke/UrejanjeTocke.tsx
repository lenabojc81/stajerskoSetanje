import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import ILokacija from "../../../models/ILokacija";
import * as Location from "expo-location";
import MapView, { Callout, MapPressEvent, Marker, MarkerDragStartEndEvent  } from "react-native-maps";
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
  existingPoints: IVmesnaTocka[];
}

const UrejanjeTocke: React.FC<UrejanjeTockeProps> = ({
  midwayPoint, handleDeleteAllMidwayPoints, handleDeleteOneMidwayPoint, existingPoints,
}) => {
  const [location, setLocation] = useState<ILokacija>({ lat: 0, lng: 0 });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<IRegion | undefined>(undefined);
  const [startLocation, setStartLocation] =
    useState<IStartPoint>(initialStartLocation);
  const [currentMarker, setCurrentMarker] =
    useState<IVmesnaTocka>(initialMarker);
  const [visibleInput, setVisibleInput] = useState<boolean>(false);
  const [markers, setMarkers] = useState<IVmesnaTocka[]>(existingPoints);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editableMarker, setEditableMarker] = useState<IVmesnaTocka | null>(null);



  console.log("existingPoints", existingPoints);
  console.log("markers", markers);

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
    if (location.lat !== 0 && location.lng !== 0) {
      
    setRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }
  }, [location]);

  useEffect(() => {
    //console.log("currentMarker", currentMarker);
    if (currentMarker.lokacija.lat !== 0) {
        setVisibleInput(true);
        setRegion({
          latitude: currentMarker.lokacija.lat,
          longitude: currentMarker.lokacija.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    }, [currentMarker.lokacija]);


    /////////????????
   /* useEffect(() => {
      setMarkers(existingPoints);
    }, [existingPoints]);*/



  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    if (startLocation.lokacija.lat === 0 && startLocation.lokacija.lng === 0) {
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
    const updatedMarkers = markers.map(marker => 
      marker.lokacija.lat === data.lokacija.lat && marker.lokacija.lng === data.lokacija.lng
        ? data
        : marker
    );
    if (!markers.some(marker => marker.lokacija.lat === data.lokacija.lat && marker.lokacija.lng === data.lokacija.lng)) {
      updatedMarkers.push(data);
    }
  
    setMarkers(updatedMarkers);
    midwayPoint(updatedMarkers, {
      lat: startLocation.lokacija.lat,
      lng: startLocation.lokacija.lng,
    });
    handleCloseModal();
    setCurrentMarker(initialMarker);
  };




  const handleCloseModal = () => {
    //setVisibleInput(false);
    setIsModalVisible(false);
    setCurrentMarker(initialMarker);
    
  };


  const handleEditMarker = (marker: IVmesnaTocka) => {
    setEditableMarker(marker); 
    setIsModalVisible(true);

  };

 


  const handleMarkerDragEnd = (event: MarkerDragStartEndEvent, index: number) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const updatedMarkers = markers.map((marker, i) =>
      i === index ? { ...marker, lokacija: { lat: latitude, lng: longitude } } : marker
    );
    setMarkers(updatedMarkers);
    midwayPoint(updatedMarkers, {
      lat: startLocation.lokacija.lat,
      lng: startLocation.lokacija.lng,
    });
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
console.log("trenutni marker!!!!!!!!!!!!!!!!", currentMarker);
  return (
    <ScrollView>
      <SafeAreaView>
      <MapView region={region} style={styles.map} onPress={handleMapPress}>
          {startLocation && startLocation.lokacija.lat !== 0 && (
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
              draggable
              onDragEnd={(event) => handleMarkerDragEnd(event, index)}
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
          <View key={index} style={styles.calloutView}>
            <Text style={styles.calloutText} >{marker.ime}</Text>
            <Text style={styles.calloutText}>{marker.uganka}</Text>
            <TouchableOpacity onPress={() => {removeMarker(index)}} style={styles.removeButton} >
              <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
          
            <Button
              title="Edit"
              onPress={() => handleEditMarker(marker)}
              
            />	
          </View>
        ))
      )}

      <UrejanjeInformacijTocke
        midwayPoint={editableMarker || initialMarker}
        onEnteredMidwayPoint={handleMidwayPointData}
        onClose={handleCloseModal}
       // visability={visibleInput}
        visability={isModalVisible}
      />
    </ScrollView>
  
  );
};

export default UrejanjeTocke;
