import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import MapView, { Circle, Region, Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import styles from "./styles";
import CustomButton from "../../GumbPoMeri/GumbPoMeri";
import { haversineDistance } from "./MerjenjeDistance/RazdaljaMedDvemaTockama";
import MerjenjeDistance from "./MerjenjeDistance/MerjenjeDistance";
import ILokacija from "../../../models/ILokacija";

interface ZemljevidProps {
  endLocation: ILokacija;
  onLocationUpdate?: (location: ILokacija) => void;
  onDistanceUpdate?: (distance: number) => void;
}

const Zemljevid: React.FC<ZemljevidProps> = ({ endLocation, onLocationUpdate, onDistanceUpdate }) => {
  const [initialLocation, setInitialLocation] = useState<ILokacija | null>(null);
  const [changedLocation, setChangedLocation] = useState<ILokacija | null>(null);
  const [lastKnownLocation, setLastKnownLocation] = useState<ILokacija | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [path, setPath] = useState<ILokacija[]>([]);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Vklopite lokacijske storitve za uporabo aplikacije.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let convertedLocation: ILokacija = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }
      setInitialLocation(convertedLocation);
      setChangedLocation(convertedLocation);
      setLastKnownLocation(convertedLocation);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setPath([
        {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      ]);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation) => {
          let newLocationConversion: ILokacija = {lat: newLocation.coords.latitude, lng: newLocation.coords.longitude}; 
          setChangedLocation(newLocationConversion);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setPath((prevPath) => [
            ...prevPath,
            {
              lat: newLocation.coords.latitude,
              lng: newLocation.coords.longitude,
            },
          ]);
          if (onLocationUpdate) {
            onLocationUpdate(newLocationConversion);
          }
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (changedLocation && lastKnownLocation) {
      const distanceToEnd = haversineDistance(changedLocation, endLocation);
      setDistanceTraveled(
        (prevDistance) =>
          prevDistance +
          haversineDistance(lastKnownLocation, changedLocation)
      );
      setLastKnownLocation(changedLocation);
    }
  }, [changedLocation]);

  useEffect(() => {
    if (onDistanceUpdate) {
      onDistanceUpdate(distanceTraveled);
    };
  }, [distanceTraveled]);

  const increaseDelta = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  const decreaseDelta = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const goToEnd = () => {
    setRegion({
      latitude: endLocation.lat,
      longitude: endLocation.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const goToNow = () => {
    setRegion({
      latitude: changedLocation?.lat || 0,
      longitude: changedLocation?.lng || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  return (
    <>
      <View style={styles.container}>
        {errorMsg ? <Text>{errorMsg}</Text> : null}
        <MapView style={styles.map} region={region} showsUserLocation={true}>
          {initialLocation && (
            <Circle
              center={{
                latitude: initialLocation.lat,
                longitude: initialLocation.lng,
              }}
              radius={15}
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.2)"
            />
          )}
          <Polyline coordinates={path.map((loc) => ({latitude: loc.lat, longitude: loc.lng}))} strokeColor="blue" strokeWidth={5} />
          {endLocation && (
            <Marker
              coordinate={{
                latitude: endLocation.lat,
                longitude: endLocation.lng,
              }}
              title="Cilj"
              description="Slikaj okolico in se prepričaj, da si na pravi lokaciji"
            />
          )}
        </MapView>
        <View style={[styles.buttonContainer, styles.firstButton]}>
          <CustomButton
            title="+"
            onPress={decreaseDelta}
            styleName="button_map"
          />
        </View>
        <View style={[styles.buttonContainer, styles.secondButton]}>
          <CustomButton
            title="-"
            onPress={increaseDelta}
            styleName="button_map"
          />
        </View>
      </View>
      <View style={styles.goToButtons}>
        <CustomButton
          title="Skok na cilj"
          onPress={goToEnd}
          styleName="button_go_to"
        />
        <CustomButton
          title="Skok na trenutno lokacijo"
          onPress={goToNow}
          styleName="button_go_to"
        />
      </View>
      <View>
        <MerjenjeDistance distance={distanceTraveled} />
      </View>
    </>
  );
};

export default Zemljevid;
