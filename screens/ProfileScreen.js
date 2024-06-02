// screens/ProfileScreen.js

import * as React from 'react';
import { Text, View } from 'react-native';

const ProfileScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
};

export default ProfileScreen;
