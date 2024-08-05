import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../(redux)/authSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      'Confirmación de Cierre de Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: () => dispatch(logoutAction()),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {user ? (
          <>
            <Text style={styles.text}>Correo electrónico: {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No hay usuario conectado</Text>
        )}
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E6E9', // Azul grisáceo claro
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF', // Blanco
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333F50', // Azul grisáceo oscuro
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3B5C76', // Azul grisáceo
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Blanco
    fontSize: 18,
    textAlign: 'center',
  },
});