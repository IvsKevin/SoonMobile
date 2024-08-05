import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
  const user = useSelector(state => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.title}>Detalles de la Cuenta</Text>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.label}>Contraseña:</Text>
          <View style={styles.passwordContainer}>
            <Text style={styles.text}>
              {showPassword ? user.password : '********'}
            </Text>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#333"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No se ha iniciado sesión.</Text>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EFF1',
    padding: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d6382',
  },
  label: {
    fontSize: 18,
    color: '#6a6a6a',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
});