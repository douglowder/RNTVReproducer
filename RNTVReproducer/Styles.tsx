import { StyleSheet, Dimensions } from 'react-native'
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height
//export const windowScale = Dimensions.get('window').scale
//export const fontScale = Dimensions.get('window').fontScale
export const scaleModifier = windowWidth / 1920
export const scaleSize = (size: number): number => {
    // const defaultScreenWidth = 1920;
    // const screenWidth = Dimensions.get('window').width;
    // const modifier = screenWidth / defaultScreenWidth;
    return size * scaleModifier;
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})