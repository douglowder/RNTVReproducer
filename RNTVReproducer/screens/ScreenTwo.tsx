import { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  TVFocusGuideView,
} from 'react-native';

export const ScreenTwo = ({ route, navigation }) => {
  // Testing expo-video focusable issue ...
  // https://github.com/react-native-tvos/react-native-tvos/issues/1010#issuecomment-3454147933
  const textInputRef1 = useRef<TextInput>(null);
  const textInputRef2 = useRef<TextInput>(null);
  const [textInputValue1, setTextInputValue1] = useState('');
  const [textInputValue2, setTextInputValue2] = useState('');

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

      <Text>Wrapped input</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#cccccc',
          height: 100,
        }}
        onPress={() => {
          textInputRef1.current?.focus();
        }}
      >
        <View>
          <TextInput
            ref={textInputRef1}
            onFocus={() => console.log('TextInput is focused')}
            onBlur={() => console.log('TextInput is not focused')}
            placeholder="Enter a value"
            value={textInputValue1}
            style={{ color: 'red', height: 50 }}
            placeholderTextColor="#0000ff"
            onChange={(value: any) => {
              setTextInputValue1(value.nativeEvent.text);
            }}
            onSubmitEditing={(value: any) => {
              setTextInputValue1(value.nativeEvent.text);
              console.log(value.nativeEvent.text);
            }}
          />
        </View>
      </TouchableOpacity>
      <Text>Unwrapped input</Text>
      <TextInput
        ref={textInputRef2}
        showSoftInputOnFocus={true}
        placeholder="Enter a value"
        value={textInputValue2}
        style={{ color: 'green', height: 50 }}
        placeholderTextColor="#0000ff"
        onChange={(value: any) => {
          setTextInputValue2(value.nativeEvent.text);
        }}
        onSubmitEditing={(value: any) => {
          setTextInputValue2(value.nativeEvent.text);
          console.log(value.nativeEvent.text);
        }}
      />

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
