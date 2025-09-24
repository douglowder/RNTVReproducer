import { View, Text, FlatList, Pressable, Platform } from 'react-native';
import { useRef } from 'react';
import { scaleModifier, styles } from '../Styles';
import { useToast, ToastProvider } from 'react-native-toast-notifications';

export const GridScreen = ({ route, navigation }) => {

  const NUM_COLUMNS = 5
  // Build a test FlatList grid to test/demonstrate scroll-to-focus issue on Android at top/bottom edges of screen/view.
  const ITEM_COUNT = 198
  const testData = dummyData(ITEM_COUNT)
  const listRef = useRef(null)

  return (
    <ToastProvider>
      <View style={[styles.container]}>

        <FlatList
          ref={listRef}
          style={styles.grid}
          numColumns={NUM_COLUMNS}
          removeClippedSubviews={true}
          scrollEnabled={true}
          horizontal={false}
          initialNumToRender={36}
          data={testData}
          renderItem={({ item }) => {
            return (<GridItem listRef={listRef} props={item} />)
          }}
          getItemLayout={(data, index) => ( // GridItem is height: 180
            { length: 180 * scaleModifier, offset: 180 * scaleModifier * index, index }
          )}
          columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
        >
        </FlatList>
      </View>
    </ToastProvider>
  )
}


const GridItem = ({ props, listRef }) => {
  // For debugging AndroidTV focus count for physical device (no console)
  const toast = useToast()
  const focusCount = useRef(0)
  const timeoutRef = useRef(null)

  return (
    <Pressable
      onFocus={() => {
        const flatlistColumns = listRef.current.props.numColumns

        // AndroidTV (on the emulator, at least) is firing onFocus twice. 
        console.log(Platform.isTVOS ? 'AppleTV' : 'AndroidTV', 'focus: index:', props.index, 'col:', props?.index % flatlistColumns, 'row:', Math.floor(props.index / flatlistColumns))

        // To visibly show AndroidTV is firing onFocus twice ...
        focusCount.current = focusCount.current + 1
        if (!timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            // check focus count
            console.log('focus fired x ', focusCount.current)
            toast.hideAll()
            toast.show(`focus fired x ${focusCount.current}`, {
              type: 'success',
              placement: 'bottom',
              duration: 2000,
              successColor: '#222',
              textStyle: { borderWidth: 4 * scaleModifier, borderColor: 'yellow', padding: 15 * scaleModifier, paddingLeft: 25 * scaleModifier, paddingRight: 25 * scaleModifier, color: 'white', fontSize: 50 * scaleModifier },
              animationType: 'zoom-in',
            })
            focusCount.current = 0
            timeoutRef.current = null
          }, 500)
        }

        // if (ref.current) {
        //   console.log('got a list ref')
        //   ref?.current?.scrollToIndex({
        //     index: props.index,
        //     animated: true,
        //     viewPosition: 0.5
        //   })
        // }
      }}
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
    index: i,
    title: `index ${i}`
  }));
}