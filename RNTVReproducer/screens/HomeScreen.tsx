import { View, Text, ImageBackground, ScrollView, TVEventControl, Modal, TVFocusGuideView, ImageSourcePropType, BackHandler, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { scaleModifier, styles } from '../Styles';
import { MenuButton } from '../components/MenuButton';

export const HomeScreen = ({ route, navigation }) => {

    console.log('HomeScreen ...')

    const buttonsData: any = [
        {
            title: 'Grid screen',
            action: 'nav:GridScreen',
            hasPreferredFocus: true
        },
        {
            title: 'Detail screen',
            action: 'nav:DetailScreen'
        },

    ]

    return (
        <View style={[styles.container, {}]}>
            <Text style={[styles.h1]}>ISSUE REPRODUCER : HomeScreen</Text>
            <TVFocusGuideView style={[{ marginTop: 20 * scaleModifier, display: 'flex', flexDirection:'row' }]}>
                {
                    buttonsData.map((data: any) => {
                        return (
                            <MenuButton title={data.title} key={data.title} navigation={navigation} action={data.action} />
                        )
                    })
                }
            </TVFocusGuideView>

        </View>
    )



}