import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = ({ color = '#000', thickness = 1 }) => {
  return <View style={[styles.horizontalLine, { borderColor: color, borderBottomWidth: thickness }]} />;
};

const styles = StyleSheet.create({
  horizontalLine: {
    padding: 2,
    width: "70%",
    opacity: 0.5,
    marginVertical: 30,
  },
});

export default HorizontalLine;
