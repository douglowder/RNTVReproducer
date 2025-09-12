import { Text, View } from 'react-native';
import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef, CommonActions, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { styles } from './Styles';

// Test Screens
import { HomeScreen } from './screens/HomeScreen'
import { ScreenOne } from './screens/ScreenOne'
import { ScreenTwo } from './screens/ScreenTwo'
import { GridScreen } from './screens/GridScreen'
import { DetailScreen } from './screens/DetailScreen'


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
          <Stack.Screen name='ScreenOne' component={ScreenOne} initialParams={{ path: '/', name: 'ScreenOne' }} options={{ title: 'ScreenOne', animation: 'fade_from_bottom', headerShown: false }} />
          <Stack.Screen name='ScreenTwo' component={ScreenTwo} initialParams={{ path: '/', name: 'ScreenTwo' }} options={{ title: 'ScreenTwo', animation: 'fade_from_bottom', headerShown: false }} />
          {/* TODO .. */}
          {/* <Stack.Screen name='GridScreen' component={GridScreen} initialParams={{ path: '/', name: 'GridScreen' }} options={{ title: 'GridScreen', animation: 'fade_from_bottom', headerShown: false }} /> */}
          {/* <Stack.Screen name='DetailScreen' component={DetailScreen} initialParams={{ path: '/', name: 'DetailScreen' }} options={{ title: 'DetailScreen', animation: 'fade_from_bottom', headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
