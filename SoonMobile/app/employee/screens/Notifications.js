import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You Are in Notifications Screen!</Text>
    </View>
  );
};

export default Notifications;

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
