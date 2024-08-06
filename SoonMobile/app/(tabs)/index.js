// Importa las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from "@env";
import { database } from '../../firebaseConfig'; // Importa tu configuración de Firebase
import { ref, onValue, off } from 'firebase/database';

const TabHome = () => {
  const [origin, setOrigin] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const userId = 'chofer123'; // ID del chofer que quieres rastrear

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    const locationRef = ref(database, `locations/${userId}`);

    const handleLocationUpdate = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDriverLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    };

    onValue(locationRef, handleLocationUpdate);

    return () => {
      off(locationRef, handleLocationUpdate);
    };
  }, [userId]);

  if (!origin) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {origin && (
          <Marker
            coordinate={origin}
            title="Mi ubicación actual"
            description="Esta es mi ubicación actual"
          />
        )}
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Ubicación del chofer"
            description="Esta es la ubicación actual del chofer"
          />
        )}
        {origin && driverLocation && (
          <MapViewDirections
            origin={origin}
            destination={driverLocation}
            apikey={GOOGLE_MAPS_KEY}
            strokeColor="#000"
            strokeWidth={6}
          />
        )}
      </MapView>
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
