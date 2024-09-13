// Importa las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { database } from '../../../firebaseConfig'; // Importar la configuración de Firebase
import { ref, set } from 'firebase/database';

// Importa la imagen del bus
import busIcon from '../../../assets/carrito2.jpg'; // Asegúrate de ajustar la ruta a donde tengas la imagen

const TabHome = () => {
  const [origin, setOrigin] = useState(null);
  const userId = 'chofer123'; // ID del chofer

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

      // Actualiza la ubicación del chofer en Firebase
      const locationRef = ref(database, `locations/${userId}`);
      set(locationRef, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
    const interval = setInterval(getLocation, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, []);

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
        <Marker
          coordinate={origin}
          title="Mi ubicación actual"
          description="Esta es mi ubicación actual"
          image={busIcon} // Usa la imagen personalizada
        />
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
