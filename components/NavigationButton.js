import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationButton = ({ title, destination }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(destination);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent', // Fondo transparente para que se comporte como un enlace
    padding: 10,
  },
  buttonText: {
    color: 'blue', // Color del texto del enlace
    textDecorationLine: 'underline', // Subrayado del texto del enlace
  },
});

export default NavigationButton;
