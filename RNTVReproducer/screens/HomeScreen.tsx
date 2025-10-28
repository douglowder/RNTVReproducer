import { View, Text, TVFocusGuideView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { scaleModifier, styles } from '../Styles';
import { MenuButton } from '../components/MenuButton';

import { useTVRemoteLongPress } from '../hooks/useTVLongPress';

export const HomeScreen = ({ route, navigation }) => {

    useTVRemoteLongPress((longPressed: boolean, type: string) => {
        console.log(`longPress: ${longPressed ? 'keydown' : 'keyup'} - type: ${type}`)
        // do things ...
    })

    const testCallback = (data: any) => {
        console.log(data)
    }

    // Test buttons for demos..
    const buttonsData: any = [
        // {
        //     title: 'One',
        //     action: 'nav:ScreenOne', // Navigate to 'ScreenOne'
        //     focusable: true,
        // },
        {
            title: 'VideoView focus issue',
            action: 'nav:ScreenTwo', // Navigate to 'ScreenTwo'
            focusable: true,
        },
        // {
        //     title: 'Normal Scrollable FlatList',
        //     action: 'nav:GridScreen', // Navigates to 'GridScreen'
        //     focusable: true,
        //     hasPreferredFocus: true
        // },
        // {
        //     title: 'FlatList Scroll Experiment',
        //     action: 'nav:GridScreenExperiment', // Navigates to 'GridScreenExperiment'
        //     focusable: true,
        //     hasPreferredFocus: true
        // },
        // {
        //     title: 'Callback',
        //     callback: testCallback, // Console log ..
        //     focusable: true
        // },
        {
            title: 'Disabled',
            focusable: false // Will set focusable to false
        }

    ]


    return (
        <View style={[styles.container, {}]}>
            <Text style={[styles.h1]}>ISSUE TESTER</Text>
            <TVFocusGuideView style={[{ marginTop: 40 * scaleModifier, display: 'flex', flexDirection: 'row', gap: 20 * scaleModifier }]}>
                {
                    buttonsData.map((data: any, i: number) => {
                        return (
                            <MenuButton title={data.title} key={i} focusable={data?.focusable} callback={data?.callback} action={data?.action} hasPreferredFocus={data?.hasPreferredFocus} navigation={navigation} />
                        )
                    })
                }
            </TVFocusGuideView>
        </View>
    )
}
