import { Text, View } from 'react-native';
import { styles } from './Styles';

export default function App() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.h1]}>ISSUE REPRODUCER</Text>
    </View>
  );
}
