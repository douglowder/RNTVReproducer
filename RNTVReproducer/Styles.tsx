import { StyleSheet, Dimensions } from 'react-native'

const DEFAULT_SCREEN_WIDTH = 1920 // Design for this. Used by tvOS. Android TV will be scaled.
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
export const scaleModifier = windowWidth / DEFAULT_SCREEN_WIDTH
export const scaleSize = (size: number): number => {
    return size * scaleModifier;
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        padding: 40 * scaleModifier
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        color: 'white',
        fontSize: 60 * scaleModifier,
        fontWeight: 'bold'
    },
    h2: {
        color: 'white',
        fontSize: 40 * scaleModifier,
        fontWeight: 'bold'
    },
    button: {
        borderRadius: 99,
        marginRight: 20 * scaleModifier,
        marginBottom: 20 * scaleModifier,
        paddingTop: 40 * scaleModifier,
        paddingBottom: 40 * scaleModifier,
        paddingLeft: 60 * scaleModifier,
        paddingRight: 60 * scaleModifier,
        backgroundColor: '#333333',

        borderWidth: 4 * scaleModifier,
        borderColor: 'white'
    },
    buttonFocus: {
        backgroundColor: '#888888',
        borderColor: 'yellow'
    },
    buttonText: {
        color: 'white',
        fontSize: 40 * scaleModifier,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})