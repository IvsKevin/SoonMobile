import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

const Stations = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Realiza la llamada a la API
    fetch('https://soon-api.azurewebsites.net/api/user')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 0) {
          setUsers(data.users);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stations</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.code.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>Email: {item.email}</Text>
            <Text>Password: {item.password}</Text>
            <Text>User Type: {item.userType}</Text>
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
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});

export default Stations;
