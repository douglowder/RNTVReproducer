import { View, Text, ImageBackground, ScrollView, TVFocusGuideView, ImageSourcePropType, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { styles } from '../Styles';

export const GridScreen = ({ route, navigation }) => {

return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.h1]}>GridScreen</Text>
    </View>
  )
}