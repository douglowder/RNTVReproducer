import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { styles } from '../Styles';
// import { useFocusEffect } from '@react-navigation/native';

interface Props {
    callback:any;
    navigation: any;
    action: string;
    title: string;
    hasPreferredFocus?: boolean;
}


export const Button = (props: Props) => {

    const [focused, setFocused] = useState(false)

    const focus = () => {
        setFocused(true)
    }
    const blur = () => {
        setFocused(false)
    }

    const action = (action:string) => {
        if( action.startsWith('nav:') ) {
            props.navigation.navigate( action.split('nav:')[1] )
            return
        }
    }

    return (
        <Pressable 
            isTVSelectable={true}
            tvParallaxProperties={{ tiltAngle:0, magnification: 1.0, pressMagnification: 0.95 }}
            onFocus={() => focus()}
            focusable={props?.hasPreferredFocus ? true: false}
            onBlur={() => blur()}
            onPress={() => action(props.action) }>
        <View style={[styles.button]}>
            <Text style={[styles.buttonText]}>{props.title}</Text>
        </View>
        </Pressable>
    )

}