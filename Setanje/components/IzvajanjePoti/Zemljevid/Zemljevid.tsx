import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Circle, Region, Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';
import CustomButton from '../../GumbPoMeri/GumbPoMeri';
import { haversineDistance } from '../MerjenjeDistance/RazdaljaMedDvemaTockama';
import MerjenjeDistance from '../MerjenjeDistance/MerjenjeDistance';

interface LocationType {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const Zemljevid: React.FC<{ endLocation: LocationType }> = ({ endLocation }) => {
  const [initialLocation, setInitialLocation] = useState<LocationType | null>(null);
  const [changedLocation, setChangedLocation] = useState<LocationType | null>(null);
  const [lastKnownLocation, setLastKnownLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [path, setPath] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Vklopite lokacijske storitve za uporabo aplikacije.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialLocation(location);
      setChangedLocation(location);
      setLastKnownLocation(location);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setPath([{ latitude: location.coords.latitude, longitude: location.coords.longitude }]);

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setChangedLocation(newLocation);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setPath((prevPath) => [...prevPath, { latitude: newLocation.coords.latitude, longitude: newLocation.coords.longitude }]);
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (changedLocation && lastKnownLocation) {
      setDistanceTraveled((prevDistance) => prevDistance + haversineDistance(lastKnownLocation.coords, changedLocation.coords));
      setLastKnownLocation(changedLocation);
    }
  }, [changedLocation])

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
      latitude: endLocation.coords.latitude,
      longitude: endLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  const goToNow = () => {
    setRegion({
      latitude: changedLocation?.coords.latitude || 0,
      longitude: changedLocation?.coords.longitude || 0,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  return (
    <>
    <View style={styles.container}>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {initialLocation && (
          <Circle
            center={{
              latitude: initialLocation.coords.latitude,
              longitude: initialLocation.coords.longitude,
            }}
            radius={15}
            strokeColor="rgba(0, 0, 255, 0.5)"
            fillColor="rgba(0, 0, 255, 0.2)"
          />
        )}
        <Polyline
          coordinates={path}
          strokeColor="blue"
          strokeWidth={5}
        />
        {endLocation && (
          <Marker
            coordinate={{
              latitude: endLocation.coords.latitude,
              longitude: endLocation.coords.longitude,
            }}
            title="Cilj"
            description="Slikaj okolico in se prepričaj, da si na pravi lokaciji"
          />
        )}
      </MapView>
      <View style={[styles.buttonContainer, styles.firstButton]}>
        <CustomButton title="+" onPress={decreaseDelta} styleName='button_map' />
      </View>
      <View style={[styles.buttonContainer, styles.secondButton]}>
        <CustomButton title="-" onPress={increaseDelta} styleName='button_map' />
      </View>
    </View>
    <View style={styles.goToButtons}>
      <CustomButton title="Skok na cilj" onPress={goToEnd} styleName='button_go_to' />
      <CustomButton title="Skok na trenutno lokacijo" onPress={goToNow} styleName='button_go_to' />
    </View>
    <View>
        <MerjenjeDistance distance={distanceTraveled} />
    </View>
    </>
  );
};

export default Zemljevid;
