import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
// const carImage = require("../../assets/CarritoUber.jpg");

const TabHome = () => {
  const [origin, setOrigin] = React.useState({
    latitude: 32.4581466,
    longitude: -116.8697775,
  });

  const [destination, setDestination] = React.useState({
    latitude: 32.460949,
    longitude: -116.8273082,
  });

  // Podriamos usar un useEffect que ejecute este codigo cada cierto tiempo.
  React.useEffect(() => {
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync({
      permissions: [{ name: "location" }],
    });
    if (status !== "granted") {
      alert("Permisos de ubicación rechazados.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
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
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
          coordinate={origin}
          // image={carImage}
          title="Mi ubicación actual"
          description="Esta es mi ubicación actual"
        />
        <Marker
          draggable
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
          coordinate={destination}
          title="Mi ubicación actual"
          description="Esta es mi ubicación actual"
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="#000"
          strokeWidth={6}
        />
        {/* <Polyline
          coordinates={[origin, destination]}
          strokeColor="#000"
          strokeWidth={10}
        /> */}
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
    padding: 5,
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
