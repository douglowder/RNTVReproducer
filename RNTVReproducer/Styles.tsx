import { StyleSheet, Dimensions, Platform } from 'react-native'

const DEFAULT_SCREEN_WIDTH = 1920 // Design for this. Used by tvOS. Android TV will be scaled.
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
export const scaleModifier = windowWidth / DEFAULT_SCREEN_WIDTH
export const scaleSize = (size: number): number => {
    return size * scaleModifier;
}

export const isTVOS = Platform.isTVOS

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
        color: 'orange',
        fontSize: 40 * scaleModifier,
        fontWeight: 'bold'
    },
    p: {
        color: '#ddd',
        fontSize: 40 * scaleModifier,
        marginTop: 30 * scaleModifier,
        marginBottom: 10 * scaleModifier
    },
    button: {
        borderRadius: 99,
        marginRight: 20 * scaleModifier,
        marginBottom: 20 * scaleModifier,
        paddingTop: 30 * scaleModifier,
        paddingBottom: 30 * scaleModifier,
        paddingLeft: 50 * scaleModifier,
        paddingRight: 50 * scaleModifier,
        backgroundColor: '#333333',
        borderWidth: 4 * scaleModifier,
        borderColor: 'white'
    },
    buttonFocus: {
        backgroundColor: '#888888',
        borderColor: 'yellow',
    },
    buttonFocusAndroid: {
        transform: [{ scale: 1.1 }]
    },
    buttonText: {
        color: 'white',
        fontSize: 40 * scaleModifier,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    buttonTextSmall: {
        color: 'yellow',
        fontSize: 30 * scaleModifier
    },
    gridItem: {
        width: 300 * scaleModifier,
        height: 180 * scaleModifier,
        borderWidth: 4 * scaleModifier,
        borderColor: '#999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItemText: {
        color: 'white',
        fontSize: 40 * scaleModifier,
        fontWeight: 'bold',
    },
    gridItemFocus: {
        borderColor: 'yellow'
    },
    gridItemPress: {
        borderColor: 'lime',
        backgroundColor: 'green'
    },
    grid: {
        borderWidth: 2 * scaleModifier,
        borderColor: 'red'
    }
})