import { View, Text, FlatList, Pressable } from 'react-native';
import { scaleModifier, styles } from '../Styles';

export const GridScreen = ({ route, navigation }) => {

  // Build a test FlatList grid to test/demonstrate scroll-to-focus issue on Android at top/bottom edges of screen/view.
  // See: https://github.com/react-native-tvos/react-native-tvos/issues/848#issuecomment-3325060435

  const ITEM_COUNT = 102
  const testData = dummyData(ITEM_COUNT)

  return (
    <View style={[styles.container]}>

      <FlatList
        style={styles.grid}
        numColumns={6}
        removeClippedSubviews={true}
        scrollEnabled
        data={testData}
        renderItem={({ item }) => {
          return (<GridItem props={item} />)
        }}
        getItemLayout={(data, index) => ( // GridItem is height: 180
          { length: 180 * scaleModifier, offset: 180 * scaleModifier * index, index }
        )}
        columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
      >
      </FlatList>

    </View>
  )
}


const GridItem = ({ props }) => {
  return (
    <Pressable
      style={({ pressed, focused }) =>
        focused ? (pressed ? [styles.gridItem, styles.gridItemPress] : [styles.gridItem, styles.gridItemFocus]) : styles.gridItem
      }>
      <Text style={styles.gridItemText}>{props.title}</Text>
    </Pressable>
  )
}

const dummyData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    id: i + 1,
    title: `item ${i + 1}`
  }));
}