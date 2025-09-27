import { View, Text, FlatList, Pressable } from 'react-native';
import { useRef, memo } from 'react';
import { ITEM_HEIGHT, ITEM_WIDTH, scaleModifier, styles, windowHeight } from '../Styles';

interface Measurements {
  x: number
  y: number
  width: number
  height: number
}

// See: https://github.com/react-native-tvos/react-native-tvos/issues/848#issuecomment-3325060435
/*

  This FlatList (with scrollEnabled:false) will now scroll and focus on AndroidTV in the same way that tvOS does with a normal scrollable FlatList.

  When the focused item rect breaks out of the boundary of the list container, it will use .scrollToOffset to keep
  the iten in view, also providing an item height's space until the top and bottom rows, as tvOS does.

  If the up or down remote buttons are being longPressed, the scroll animation is disabled to stop bad things happening.

  */

import { useEffect } from 'react';
import { TVEventHandler } from 'react-native';


type ShelfItemProp = {
    item: any
    navigation?: any
    containerMeasurements?: any
    longPressRef?: any
    listRef?: any
    focusedItemRef?: any
}

// longPress up or down hook. emits boolean
const useTVRemoteLongPress = (onLongPressed: any) => {
  const subscriptionRef = useRef(null)
  useEffect(() => {
    const handleTVEvent = (event: any) => {
      const { eventType, eventKeyAction } = event;
      if (eventType === 'longUp' || eventType === 'longDown') {
        if (eventKeyAction === 0) {
          onLongPressed(true)
        } else if (eventKeyAction === 1) {
          onLongPressed(false)
        }
      }
    };
    // Subscribe to TV events
    subscriptionRef.current = TVEventHandler.addListener(handleTVEvent)
    return () => {
      // Unsubscribe from TV events
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    }
  }, [onLongPressed])
}

export const GridScreenExperiment = ({ route, navigation }) => {

  const NUM_COLUMNS = 6
  const ITEM_COUNT = 2000
  const testData = dummyData(ITEM_COUNT)

  const PER_SCREEN = 36 // At the set size, how many items for one 'page'/screen.
  const WINDOW_SIZE = (Math.ceil(ITEM_COUNT / PER_SCREEN) * 2) + 1 // Without enough 'windows' for all the data, things go awry. (Default: 21)

  const listRef = useRef(null)
  const containerRef = useRef(null)
  const containerMeasurementsRef = useRef<Measurements | null>(null)

  const longPressRef = useRef<boolean>(false)

  const onContainerLayout = (event: any) => {
    // console.log('Container layout', event.nativeEvent.layout)
    containerMeasurementsRef.current = event.nativeEvent.layout
  }

  useTVRemoteLongPress((longPressed: boolean) => {
    // console.log(`Long press ${longPressed ? 'keydown' : 'keyup'}`);
    longPressRef.current = longPressed
  })

  return (
    <View style={styles.screen}>
      <View onLayout={onContainerLayout} ref={containerRef} style={[{ margin: 40 * scaleModifier, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#212121', height: windowHeight - (80 * scaleModifier), width: ITEM_WIDTH * NUM_COLUMNS }]}>
        <FlatList
          ref={listRef}
          style={styles.grid}
          numColumns={NUM_COLUMNS}
          removeClippedSubviews={false}
          scrollEnabled={false} // Testing usage of onFocus to set a better scroll position.
          horizontal={false}
          initialNumToRender={PER_SCREEN}
          maxToRenderPerBatch={NUM_COLUMNS * 2}
          windowSize={WINDOW_SIZE}
          data={testData}
          renderItem={({ item }) => {
            return (<GridItem longPressRef={longPressRef} containerMeasurements={containerMeasurementsRef} listRef={listRef} item={item} />)
          }}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT * scaleModifier, offset: ITEM_HEIGHT * scaleModifier * index, index }
          )}
          columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
        >
        </FlatList>
      </View>
    </View>
  )
}


export const GridItem = memo(({ item, listRef, containerMeasurements, longPressRef }: ShelfItemProp) => {

  const focusCount = useRef(0)
  const timeoutRef = useRef(null)
  const itemRef = useRef(null)

  return (
    <Pressable 
      ref={itemRef}
      onFocus={() => {
        const flatlistColumns = listRef.current.props.numColumns

        // AndroidTV appears to be firing onFocus twice?
        // console.log(Platform.isTVOS ? 'AppleTV' : 'AndroidTV', 'focus: index:', props.index, 'col:', props?.index % flatlistColumns, 'row:', Math.floor(props.index / flatlistColumns))

        // Make sure we only catch this once
        focusCount.current = focusCount.current + 1
        if (focusCount.current === 1) {
          // AndroidTV double-focus issue? Reset focusCount after 200ms.
          let startTime: number
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            if (elapsed >= 100) {
              // Reset focusCount (AndroidTV x 2 ?) 
              // console.log('onFocus trigger count:', focusCount.current)
              focusCount.current = 0
              timeoutRef.current = null
            } else {
              timeoutRef.current = requestAnimationFrame(animate);
            }
          }
          timeoutRef.current = requestAnimationFrame(animate)

          // Position in grid
          const row = Math.floor(item.index / flatlistColumns)
          const column = item?.index % flatlistColumns
           console.log('focus: index:', item.index, 'column:', column, 'row:', row)

          const currentOffset = listRef?.current?._listRef?._scrollMetrics.offset

          itemRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
            // console.log(`Position in Window: x=${x}, y=${y}, width=${width}, height=${height}`)
            const total = listRef.current?.props.data.length
            const rowCount = Math.round(total / flatlistColumns)
            // also listRef.current._listRef._indicesToKeys Map size
            // console.log('_indicesToKeys.size ', listRef.current._listRef._indicesToKeys.size)

            // Check bottom edge is in bounds (plus a bit)
            if ((y + height + 2) > (containerMeasurements.current.height + containerMeasurements.current.y) && (row < rowCount)) { //  ensure we deal with the bottom row once in position
              // console.log('ITEM IS (partially) OUT OF BOTTOM BOUNDS - SCROLL UP')
              const __diffY = (y + height) - (containerMeasurements.current.y + containerMeasurements.current.height)
              listRef?.current?.scrollToOffset({
                animated: !longPressRef.current, // don't animate if longpPressing down
                offset: currentOffset + (height + __diffY)
              })
            }
            // Check top edge (minus a bit)
            if ((y - 2 < containerMeasurements.current.y) && currentOffset > 0) { // ensuring we deal with the top row
              // console.log('ITEM IS (partially) OUT OF TOP BOUNDS - SCROLL DOWN')
              const _diffY = containerMeasurements.current.y - y + 1
              listRef?.current?.scrollToOffset({
                animated: !longPressRef.current, // don't animate if longpPressing up
                offset: currentOffset - (height + _diffY)
              })
            }
          })
        }
      }}
      style={({ pressed, focused }) =>
        focused ? (pressed ? [styles.gridItem, styles.gridItemPress] : [styles.gridItem, styles.gridItemFocus]) : [styles.gridItem, item.index % 36 === 0 && { backgroundColor: 'green'}]
      }
    >
      <Text style={styles.gridItemText}>{item.title}</Text>
      {
        item.index % 36 === 0 && <Text style={[styles.gridItemText, {fontSize: 26 * scaleModifier}]}>{ `page: ${Math.round(item.index / 36)}` }</Text>
      }
    </Pressable>
  )
})

const dummyData = (length: number) => {
  return Array.from({ length }, (_, i) => ({
    id: i + 1,
    index: i,
    title: `index ${i}`
  }));
}
