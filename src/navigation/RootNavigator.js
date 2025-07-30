import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ExploreDetailScreen from '../screens/ExploreDetail';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="ExploreDetail" component={ExploreDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;