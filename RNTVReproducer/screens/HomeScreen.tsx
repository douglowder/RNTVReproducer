import { View, Text, TVFocusGuideView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { scaleModifier, styles } from '../Styles';
import { MenuButton } from '../components/MenuButton';

export const HomeScreen = ({ route, navigation }) => {

    const testCallback = (data: any) => {
        console.log(data)
    }
    const buttonsData: any = [
        {
            title: 'One',
            action: 'nav:ScreenOne', // Navigate to 'ScreenOne'
            focusable: true,
        },
        {
            title: 'Two',
            action: 'nav:ScreenTwo', // Navigate to 'ScreenTwo'
            focusable: true,
            hasPreferredFocus: true
        },
        {
            title: 'Grid',
            action: 'nav:GridScreen', // Navigate to 'GridScreen' TODO: Test scroll/focus position on Android FlatList at top/bottom screen edges.
            focusable: true
        },
        {
            title: 'Callback',
            callback: testCallback, // Console log ..
            focusable: true
        },
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
            {/* <Text style={[styles.p]}>Testing to see if isTVSelectable=false is respected on Android/Fire. Works OK on tvOS.</Text> */}
        </View>
    )
}
