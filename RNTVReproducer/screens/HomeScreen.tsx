import { View, Text, ImageBackground, ScrollView, TVEventControl, Modal, TVFocusGuideView, ImageSourcePropType, BackHandler, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { scaleModifier, styles } from '../Styles';
import { MenuButton } from '../components/MenuButton';

export const HomeScreen = ({ route, navigation }) => {

    console.log('HomeScreen ...')

    const testCallback = (data:any) => {
        console.log(data)
    }
    
    const buttonsData: any = [
        {
            title: 'Screen One',
            action: 'nav:ScreenOne', // Navigate to 'ScreenOne'
            focusable: true,
            hasPreferredFocus: true
            
        },
        {
            title: 'Screen Two',
            action: 'nav:ScreenTwo', // Navigate to 'ScreenTwo'
            focusable: true
        },
        {
            title: 'Callback test',
            callback: testCallback, // Console log ..
            focusable: true
        },
        {
            title: 'Disabled',
            focusable: false // Will set isTVSelectable to false
        }

    ]


    return (
        <View style={[styles.container, {}]}>
            <Text style={[styles.h1]}>ISSUE REPRODUCER</Text>
            <TVFocusGuideView style={[{ marginTop: 40 * scaleModifier, display: 'flex', flexDirection:'row', gap: 20 * scaleModifier }]}>
                {
                    buttonsData.map((data: any, i: number) => {
                        return (
                            <MenuButton title={data.title} key={i} focusable={data?.focusable} callback={data?.callback} action={data?.action} hasPreferredFocus={data?.hasPreferredFocus} navigation={navigation} />
                        )
                    })
                }
            </TVFocusGuideView>
            <Text style={[styles.p]}>Testing to see if isTVSelectable=false is respected on Android/Fire. Works OK on tvOS.</Text>

        </View>
    )



}