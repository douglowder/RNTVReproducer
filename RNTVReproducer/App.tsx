import { Text, View, LogBox } from 'react-native';
import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Test Screens
import { HomeScreen } from './screens/HomeScreen'
import { ScreenOne } from './screens/ScreenOne'
import { ScreenTwo } from './screens/ScreenTwo'
import { GridScreen } from './screens/GridScreen'
import { GridScreenExperiment } from './screens/GridScreenExperiment';
// import { DetailScreen } from './screens/DetailScreen'


const Stack = createNativeStackNavigator()

export default function App() {

  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  LogBox.ignoreAllLogs()
  
  
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          {...({} as any)} // Added to stop missing 'id' error. 
          initialRouteName='HomeScreen'>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Home', animation: 'fade_from_bottom', headerShown: false }} />
          <Stack.Screen name='ScreenOne' component={ScreenOne} options={{ title: 'ScreenOne', animation: 'fade_from_bottom', headerShown: false }} />
          <Stack.Screen name='ScreenTwo' component={ScreenTwo} options={{ title: 'ScreenTwo', animation: 'fade_from_bottom', headerShown: false }} />

          <Stack.Screen name='GridScreen' component={GridScreen} options={{ title: 'GridScreen', animation: 'fade_from_bottom', headerShown: false }} />
          <Stack.Screen name='GridScreenExperiment' component={GridScreenExperiment} options={{ title: 'GridScreen', animation: 'fade_from_bottom', headerShown: false }} />

          {/* <Stack.Screen name='DetailScreen' component={DetailScreen} options={{ title: 'DetailScreen', animation: 'fade_from_bottom', headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
