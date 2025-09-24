import { View, Text, Pressable } from 'react-native';
import { useRef, useEffect } from 'react';
import { styles, isTVOS } from '../Styles';

interface Props {
    callback?: any;
    navigation?: any;
    action: string;
    title: string;
    hasPreferredFocus?: boolean;
    focusable?: boolean;
    disabled?: boolean;
}


export const MenuButton = (props: Props) => {

    // console.log('Menu button props:', props)

    const action = (action: string) => {
        if (action?.startsWith('nav:')) {
            props.navigation.navigate(action.split('nav:')[1])
            return
        }
    }

    // Since hasTVPreferredFocus is marked as deprecated, testing this method. (Works on AppleTV and Android as expected)
    const buttonRef = useRef(null)
    // useEffect(() => {
    //     if(props.hasPreferredFocus){
    //         buttonRef?.current?.requestTVFocus()
    //     }
    // }, [props])

    // https://github.com/react-native-tvos/react-native-tvos/blob/main/packages/react-native/Libraries/Components/Pressable/Pressable.js#L389

    return (
        <Pressable
            ref={buttonRef}
            // disabled={props?.focusable ? false : true}   // Only disables onPress. 
            isTVSelectable={props?.focusable}               // AppleTV only. Disables ability to focus as expected.
            focusable={props?.focusable}                    // No effect on AppleTV or Android/Fire
            
            tvParallaxProperties={{ tiltAngle: 0, magnification: 1.0, pressMagnification: 0.95 }} // AppleTV only
            key={props.title}
        
            // hasTVPreferredFocus={props?.hasPreferredFocus ? true : false} 
            // Marked as Deprecated. Tips say to use `focusable` which does not make sense, since this has a different meaning.
            // Maybe workaround with buttonRef.current.requestTVFocus() in useEffect
            
            onPress={() => {
                if (props.callback) {
                    props.callback('HELLO FROM THE CALLBACK')
                    return
                }
                action(props.action)
            }}>
            {
                ({ focused }) => {
                    return (
                        <View style={[styles.button, !props.focusable && { opacity: 0.5 }, focused && styles.buttonFocus, focused && !isTVOS && styles.buttonFocusAndroid]}>
                            <Text style={[styles.buttonText]}>{props.title}</Text>
                            {/* <Text style={[styles.buttonTextSmall]}>focusable: {props?.focusable ? 'true':'false'}</Text> */}
                        </View>
                    )
                }
            }
        </Pressable>
    )
}