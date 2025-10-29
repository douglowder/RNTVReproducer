import { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const ScreenTwo = ({ route, navigation }) => {
  // Testing expo-video focusable issue ...
  // https://github.com/react-native-tvos/react-native-tvos/issues/1010#issuecomment-3454147933
  const textInputRef = useRef<TextInput>(null);
  const [textInputValue, setTextInputValue] = useState('');

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
          textInputRef.current?.focus();
        }}
      >
        <View>
          <TextInput
            ref={textInputRef}
            showSoftInputOnFocus={true}
            onFocus={() => console.log('TextInput is focused')}
            onBlur={() => console.log('TextInput is not focused')}
            placeholder="Enter a value"
            value={textInputValue}
            style={{ color: 'red', height: 50 }}
            placeholderTextColor="#0000ff"
            onChange={(value: any) => {
              setTextInputValue(value.nativeEvent.text);
            }}
            onSubmitEditing={(value: any) => {
              setTextInputValue(value.nativeEvent.text);
              console.log(value.nativeEvent.text);
            }}
          />
        </View>
      </TouchableOpacity>
      <Text>Unwrapped input</Text>
      <TextInput
        showSoftInputOnFocus={true}
        placeholder="Enter a value"
        value={textInputValue}
        style={{ color: 'red', height: 50 }}
        placeholderTextColor="#0000ff"
        onChange={(value: any) => {
          setTextInputValue(value.nativeEvent.text);
        }}
        onSubmitEditing={(value: any) => {
          setTextInputValue(value.nativeEvent.text);
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
