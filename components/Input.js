import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, value, onChange }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder} 
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    width: '80%'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'rgba(0, 0, 0, 0.4)'
  },
});

export default Input;
