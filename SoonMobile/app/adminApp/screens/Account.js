import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
  const user = useSelector(state => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState(user ? user.password : '');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAccountUpdate = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(`https://soon-api.azurewebsites.net/api/User/${user.id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }),
        body: new URLSearchParams({
          email: email,
          password: password,
          userType: user.userType,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la cuenta');
      }

      Alert.alert('Éxito', 'Cuenta actualizada correctamente');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.title}>Detalles de la Cuenta</Text>
          <Text style={styles.label}>Correo:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Introduce nuevo correo"
          />
          <Text style={styles.label}>Contraseña Actual:</Text>
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
          <Text style={styles.label}>Nueva Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Introduce nueva contraseña"
          />
          <Text style={styles.label}>Confirmar Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirma tu nueva contraseña"
          />
          <TouchableOpacity style={styles.button} onPress={handleAccountUpdate}>
            <Text style={styles.buttonText}>Actualizar Cuenta</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>No se ha iniciado sesión.</Text>
      )}
    </View>
  );
};

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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Account;