import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://soon-api.azurewebsites.net/api/Station');
        const data = await response.json();
        if (data.status === 0) {
          setStations(data.stations);
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estaciones</Text>
      <FlatList
        data={stations}
        keyExtractor={(item) => item.code.toString()}
        renderItem={({ item }) => (
          <View style={styles.stationItem}>
            <Text style={styles.stationName}>{item.name}</Text>
            <Text style={styles.stationLocation}>{item.location}</Text>
            <Text style={styles.stationStatus}>
              {item.status ? 'Activo' : 'Inactivo'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E0E6E9', // Azul grisáceo claro
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333F50', // Azul grisáceo oscuro
  },
  stationItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stationName: {
    fontSize: 20,
    color: '#333F50', // Azul grisáceo oscuro
  },
  stationLocation: {
    fontSize: 16,
    color: '#666', // Gris
    marginVertical: 5,
  },
  stationStatus: {
    fontSize: 16,
    color: '#3B5C76', // Azul grisáceo
  },
});

export default StationList;
