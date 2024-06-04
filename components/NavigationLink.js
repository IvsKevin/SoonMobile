import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationLink = ({ title, destination }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(destination);
  };

  return (
    <Pressable style={styles.link} onPress={handlePress}>
      <Text style={styles.linkText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    backgroundColor: 'transparent', // Fondo transparente para que se comporte como un enlace
    padding: 10,
  },
  linkText: {
    color: 'blue', // Color del texto del enlace
    textDecorationLine: 'underline', // Subrayado del texto del enlace
  },
});

export default NavigationLink;
