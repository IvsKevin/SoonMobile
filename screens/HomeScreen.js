// screens/HomeScreen.js

import * as React from 'react';
import { Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('ProfileScreen', { name: 'Jane' })}
      />
    </View>
  );
};

export default HomeScreen;
