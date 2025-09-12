import { View, Text, ImageBackground, ScrollView, TVEventControl, Modal, TVFocusGuideView, ImageSourcePropType, BackHandler, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { styles } from '../Styles';

export const DetailsScreen = ({ route, navigation }) => {

return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.h1]}>GridScreen</Text>
    </View>
  )
}