import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { styles, isTVOS } from '../Styles';

interface Props {
    callback?: any;
    navigation?: any;
    action: string;
    title: string;
    hasPreferredFocus?: boolean;
    focusable?: boolean;
}


export const MenuButton = (props: Props) => {

    const action = (action: string) => {
        if (action?.startsWith('nav:')) {
            props.navigation.navigate(action.split('nav:')[1])
            return
        }
    }

    return (
        <Pressable
            disabled={props?.focusable ? false : true} // Only disables onPress. 
            isTVSelectable={props?.focusable ? true : false} // AppleTV only?!  
            tvParallaxProperties={{ tiltAngle: 0, magnification: 1.0, pressMagnification: 0.95 }}
            hasTVPreferredFocus={props?.hasPreferredFocus ? true : false}
            onPress={() => {
                if (props.callback) {
                    props.callback('HELLO CALLBACK!')
                    return
                }
                action(props.action)
            }}>
            {
                ({ focused }) => {
                    return (
                        <View style={[styles.button, !props.focusable && { opacity: 0.5 }, focused && styles.buttonFocus, focused && !isTVOS && styles.buttonFocusAndroid]}>
                            <Text style={[styles.buttonText]}>{props.title}</Text>
                        </View>
                    )
                }
            }
        </Pressable>
    )
}