import { View, Text } from 'react-native';
import { styles } from '../Styles';

export const ScreenTwo = ({ route, navigation }) => {

return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.h1]}>Screen Two</Text>
      <Text style={[styles.h2]}>Go back.</Text>
    </View>
  )
}
