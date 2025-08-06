import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import ExploreDetailScreen from '../screens/ExploreDetail';
import ConvenienceInfoScreen from '../screens/Living/ConvenienceInfoScreen';
import EmergencyInfoScreen from '../screens/Living/EmergencyInfoScreen';
import CommunityScreen from '../screens/Living/CommunityScreen';
import ComingSoonScreen from '../screens/Living/ComingSoonScreen';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { authState } = useContext(AuthContext);
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoadingInitialRoute, setIsLoadingInitialRoute] = useState(true);

  useEffect(() => {
    const loadInitialRoute = async () => {
      try {
        const storedRoute = await AsyncStorage.getItem('initialRoute');
        if (storedRoute) {
          setInitialRoute(storedRoute);
        } else {
          setInitialRoute('Explore'); // Default to Explore if not set
        }
      } catch (e) {
        console.error('Failed to load initial route from AsyncStorage', e);
        setInitialRoute('Explore'); // Fallback
      } finally {
        setIsLoadingInitialRoute(false);
      }
    };

    loadInitialRoute();
  }, []);

  if (authState.isLoading || isLoadingInitialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState.isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} initialParams={{ screen: initialRoute }} />
            <Stack.Screen name="ExploreDetail" component={ExploreDetailScreen} />
            <Stack.Screen name="ConvenienceInfo" component={ConvenienceInfoScreen} />
            <Stack.Screen name="EmergencyInfo" component={EmergencyInfoScreen} />
            <Stack.Screen name="Community" component={CommunityScreen} />
            <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
