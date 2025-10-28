import { View, Text, Pressable, TVFocusGuideView } from 'react-native';
import VideoTest from '../components/VideoTest';

export const ScreenTwo = ({ route, navigation }) => {
  // Testing expo-video focusable issue ...
  // https://github.com/react-native-tvos/react-native-tvos/issues/1010#issuecomment-3454147933

  return (
    <View style={{ display: 'flex', padding: 20 }}>
      <Pressable>
        {({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? 'blue' : 'gray',
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ color: focused ? 'white' : 'black' }}>
              {focused ? 'Focused' : 'Not Focused'}
            </Text>
          </View>
        )}
      </Pressable>

      <TVFocusGuideView focusable={false}>
        <VideoTest />
      </TVFocusGuideView>

      <Pressable>
        {({ focused }) => (
          <View
            style={{
              backgroundColor: focused ? 'blue' : 'gray',
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ color: focused ? 'white' : 'black' }}>
              {focused ? 'Focused' : 'Not Focused'}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );

  // return (
  //   <View style={[styles.container, styles.centered]}>
  //     <Text style={[styles.h1]}>Screen Two</Text>
  //     <Text style={[styles.h2]}>Go back.</Text>
  //   </View>
  // )
};
