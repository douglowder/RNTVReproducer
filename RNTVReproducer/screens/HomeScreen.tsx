import { View, Text, ImageBackground, ScrollView, TVEventControl, Modal, TVFocusGuideView, ImageSourcePropType, BackHandler, Platform } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import { scaleModifier, styles } from '../Styles';
import { MenuButton } from '../components/MenuButton';

export const HomeScreen = ({ route, navigation }) => {

    console.log('HomeScreen ...')

    const buttonsData: any = [
        {
            title: 'Screen One',
            action: 'nav:ScreenOne',
            hasPreferredFocus: true
        },
        {
            title: 'Screen Two',
            action: 'nav:ScreenTwo'
        },

    ]

    return (
        <View style={[styles.container, {}]}>
            <Text style={[styles.h1]}>ISSUE REPRODUCER : HomeScreen</Text>
            <TVFocusGuideView style={[{ marginTop: 40 * scaleModifier, display: 'flex', flexDirection:'row', gap: 20 * scaleModifier }]}>
                {
                    buttonsData.map((data: any) => {
                        return (
                            <MenuButton title={data.title} key={data.title} navigation={navigation} action={data.action} />
                        )
                    })
                }
            </TVFocusGuideView>
            <Text style={[styles.p]}>Click one of the options above, then click the back button to return.</Text>
            <Text style={[styles.p]}>On Android TV, the button does not receive focus again after navigating back.</Text>

        </View>
    )



}