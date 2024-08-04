import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from "@env";

const TabHome = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 32.460949,
    longitude: -116.8273082,
  });

  useEffect(() => {
    (async () => {
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
    })();
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText}>📍</Text>
        </TouchableOpacity>
      </View>
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
          draggable
          onDragEnd={(e) => setOrigin(e.nativeEvent.coordinate)}
          coordinate={origin}
          title="Mi ubicación actual"
          description="Esta es mi ubicación actual"
        />
        <Marker
          draggable
          onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
          coordinate={destination}
          title="Destino"
          description="Este es el destino"
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="#000"
          strokeWidth={6}
        />
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Favoritos</Text>
        <View style={styles.favoriteItem}>
          <Text style={styles.favoriteText}>Casa</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Pulse para editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TabHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  locationButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  locationText: {
    fontSize: 20,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  favoriteText: {
    fontSize: 16,
  },
  editText: {
    fontSize: 14,
    color: '#007bff',
  },
});
