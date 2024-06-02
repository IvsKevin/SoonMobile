// Depedencies
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Components
import Input from './components/Input';
import Button from './components/Button';
import HorizontalLine from './components/HorizontalLine';
import NavigationButton from './components/NavigationButton'; 

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Soon!</Text>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Inicia sesión o registrate</Text>
          <Text style={styles.text}>Ingresa tu correo electrónico y contraseña</Text>
        </View>
        <Input placeholder="Ingresa tu email" value={email} onChange={setEmail} />
        <Input placeholder="Ingresa tu contraseña" value={password} onChange={setPassword} />
        <Button text="Iniciar sesión" onPress={() => console.log("Botón presionado")} backgroundColor="black"
          color="#fff"
        />
        <HorizontalLine color="black" thickness={2} />

        <Text style={styles.text}>¿No tienes una cuenta? <NavigationButton title="Registrate" destination="RegisterScreen"/></Text>
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'semi-bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  }
});
