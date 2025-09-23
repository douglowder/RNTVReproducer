import { View, Text, FlatList, Pressable } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { scaleModifier, styles } from '../Styles';

export const GridScreen = ({ route, navigation }) => {

  // TODO : Build a test FlatList grid to test/demonstrate scroll-to-focus issue on Android at top/bottom edges of screen/view.
  const ITEM_COUNT = 500
  const testData = dummyData(ITEM_COUNT)


  return (
    <View style={[styles.container]}>
      {/* <Text style={[styles.h1]}>GridScreen</Text> */}

      <FlatList
        style={styles.grid}
        numColumns={6}
        removeClippedSubviews
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
      }
    >
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