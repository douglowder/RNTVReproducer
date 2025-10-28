import { View, Text, Pressable, TVFocusGuideView } from 'react-native';
import { styles } from '../Styles';
import { useVideoPlayer, VideoView } from 'expo-video';

export const ScreenTwo = ({ route, navigation }) => {

  // Testing expo-video focusable issue ...
  // https://github.com/react-native-tvos/react-native-tvos/issues/1010#issuecomment-3454147933
  
  const player = useVideoPlayer({})

  return (
        <View style={{ display: 'flex', padding: 20 }}>
            <Pressable>
                {({ focused }) => (
                    <View style={{ backgroundColor: focused ? 'blue' : 'gray', padding: 10, marginTop: 20 }}>
                        <Text style={{ color: focused ? 'white' : 'black' }}>{focused ? 'Focused' : 'Not Focused'}</Text>
                    </View>
                )}
            </Pressable>
            
            <TVFocusGuideView focusable={false}>
                <VideoView style={{ marginTop: 20, height: 300, width: 500, backgroundColor: '#333333' }} player={player} focusable={false} nativeControls={false} />
            </TVFocusGuideView>

            <Pressable>
                {({ focused }) => (
                    <View style={{ backgroundColor: focused ? 'blue' : 'gray', padding: 10, marginTop: 20 }}>
                        <Text style={{ color: focused ? 'white' : 'black' }}>{focused ? 'Focused' : 'Not Focused'}</Text>
                    </View>
                )}
            </Pressable>
        </View>
    )

  // return (
  //   <View style={[styles.container, styles.centered]}>
  //     <Text style={[styles.h1]}>Screen Two</Text>
  //     <Text style={[styles.h2]}>Go back.</Text>
  //   </View>
  // )
}
