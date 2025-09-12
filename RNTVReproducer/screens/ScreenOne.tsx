import { View, Text } from 'react-native';
import { styles } from '../Styles';

export const ScreenOne = ({ route, navigation }) => {

return (
    <View style={[styles.container, styles.centered]}>
      <Text style={[styles.h1]}>Screen One</Text>
      <Text style={[styles.h2]}>Go back. See if the button is focused.</Text>
    </View>
  )
}
