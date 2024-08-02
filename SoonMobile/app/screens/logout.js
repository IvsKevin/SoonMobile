import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have been logged out!</Text>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EFF1',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});
