import { Platform, Pressable, StyleSheet, Text } from 'react-native';

const scale = (s: number) => (Platform.OS === 'android' ? s : s * 2);

export const DemoButton = (props: { title: string; onPress: () => void }) => {
  const styles = useVideoStyles();
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={({ pressed, focused }) => [
        styles.button,
        pressed || focused ? { backgroundColor: 'blue' } : {},
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

export const useVideoStyles = () => {
  return StyleSheet.create({
    button: {
      backgroundColor: 'darkblue',
      margin: scale(5),
      borderRadius: scale(2),
      padding: scale(5),
    },
    buttonText: {
      color: 'white',
      fontSize: scale(8),
    },
  });
};
