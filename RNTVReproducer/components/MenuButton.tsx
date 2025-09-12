import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { styles, isTVOS } from '../Styles';

interface Props {
    callback?: any;
    navigation: any;
    action: string;
    title: string;
    hasPreferredFocus?: boolean;
}


export const MenuButton = (props: Props) => {

    const [focused, setFocused] = useState(false)

    const focus = () => {
        // console.log('MenuButton: focus:', props.title)
        setFocused(true)
    }
    const blur = () => {
        setFocused(false)
    }

    const action = (action: string) => {
        if (action.startsWith('nav:')) {
            props.navigation.navigate(action.split('nav:')[1])
            return
        }
    }

    return (
        <Pressable
            isTVSelectable={true}
            tvParallaxProperties={{ tiltAngle: 0, magnification: 1.0, pressMagnification: 0.95 }}
            onFocus={() => focus()}
            hasTVPreferredFocus={props?.hasPreferredFocus ? true : false}
            onBlur={() => blur()}
            onPress={() => action(props.action)}>
            <View style={[styles.button, focused && styles.buttonFocus, focused && !isTVOS && styles.buttonFocusAndroid]}>
                <Text style={[styles.buttonText]}>{props.title}</Text>
            </View>
        </Pressable>
    )

}