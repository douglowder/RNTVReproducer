import { Text, View } from 'react-native';
import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef, CommonActions, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { styles } from './Styles';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { GridScreen } from './screens/GridScreen';

const Stack = createNativeStackNavigator()

export default function App() {

  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          {...({} as any)} // Added to stop missing 'id' error. 
          initialRouteName='HomeScreen'>
          <Stack.Screen name='HomeScreen' component={HomeScreen} initialParams={{ path: '/', name: 'HomeScreen' }} options={{ title: 'Home', animation: 'fade_from_bottom', headerShown: false }} />
          <Stack.Screen name='GridScreen' component={GridScreen} initialParams={{ path: '/', name: 'GridScreen' }} options={{ title: 'GridScreen', animation: 'fade_from_bottom', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
