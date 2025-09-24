import { View, Text, FlatList, Pressable, Platform, findNodeHandle } from 'react-native';
import { useRef } from 'react';
import { ITEM_HEIGHT, scaleModifier, styles, windowHeight } from '../Styles';

interface Measurements {
  x: number
  y: number
  width: number
  height: number  
}

export const GridScreenExperiment = ({ route, navigation }) => {

  const NUM_COLUMNS = 6
  // Build a test FlatList grid to test/demonstrate scroll-to-focus issue on Android at top/bottom edges of screen/view.
  // See: https://github.com/react-native-tvos/react-native-tvos/issues/848#issuecomment-3325060435

  const ITEM_COUNT = 66
  const testData = dummyData(ITEM_COUNT)

  const listRef = useRef(null)
  const containerRef = useRef(null)
  const containerMeasurementsRef = useRef<Measurements | null>(null)

  const onContainerLayout = (event: any) => {
    console.log('Container layout', event.nativeEvent.layout)
    containerMeasurementsRef.current = event.nativeEvent.layout
  }

  return (
      <View style={styles.screen}>
        <View onLayout={onContainerLayout} ref={containerRef} style={[{ margin: 40 * scaleModifier, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'red', height: windowHeight - (80 * scaleModifier), width: 300 * scaleModifier * NUM_COLUMNS }]}>

          <FlatList
            ref={listRef}
            style={styles.grid}
            numColumns={NUM_COLUMNS}
            removeClippedSubviews={true}
            scrollEnabled={false} // Testing usage of onFocus to set a better scroll position.
            horizontal={false}
            initialNumToRender={36}
            data={testData}
            renderItem={({ item }) => {
              return (<GridItem containerMeasurements={containerMeasurementsRef} listRef={listRef} props={item} />)
            }}
            getItemLayout={(data, index) => ( 
              { length: ITEM_HEIGHT * scaleModifier, offset: ITEM_HEIGHT * scaleModifier * index, index }
            )}
            // scrollEventThrottle={100}
            columnWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} //, gap: 40 * scaleModifier 
          >
          </FlatList>
        </View>
      </View>
  )
}


const GridItem = ({ props, listRef, containerMeasurements }) => {

  const focusCount = useRef(0)
  const timeoutRef = useRef(null)
  const itemRef = useRef(null)

  const measureRelativeToFlatList = () => {
    if (itemRef.current && listRef.current) {

      // itemRef.current.measure((x: number, y: number, width: number, height: number) => {
      //   // ***  y is always return ing zero, even on lower rows... 
      //   console.log(`Position in FlatList: x=${x}, y=${y}, width=${width}, height=${height}`);
      // })

      // Works for position in the entire Window.
      // itemRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
      //   console.log(`Position in Window: x=${x}, y=${y}, width=${width}, height=${height}`);
      // })

      // ** Argh....
      // console.log( listRef.current.getScrollableNode() )
      // const scrollableNode = listRef.current.getScrollableNode() 
      // const scrollViewNode = listRef.current._listRef?.getScrollableNode?.()
      // const listNodeHandle = findNodeHandle(contRef.current)
      // if (listNodeHandle) {
      
      // ** Throws a warning about needing to use a native ref...?
      //   itemRef.current.measureLayout(
      //     listNodeHandle,
      //     (x: number, y: number, width: number, height: number) => {
      //       console.log(`Relative position in FlatList: x=${x}, y=${y}, width=${width}, height=${height}`);
      //     },
      //     (error: any) => {
      //       console.log('measureLayout failed:', error);
      //     }
      //   )
      // }

    }
  }

  const handleLayout = (event: any) => {

    // event.nativeEvent.layout *always* returns a `y` value of 0, regardless of which 'row' the item is on.

    // tried this too.. 
    // requestAnimationFrame(() => {
    //   measureRelativeToFlatList();
    // });
  };

  return (
    <Pressable onLayout={handleLayout}
      ref={itemRef}
      onFocus={() => {
        const flatlistColumns = listRef.current.props.numColumns

        // AndroidTV is firing onFocus twice!?
        // console.log(Platform.isTVOS ? 'AppleTV' : 'AndroidTV', 'focus: index:', props.index, 'col:', props?.index % flatlistColumns, 'row:', Math.floor(props.index / flatlistColumns))

        // Make sure to only catch this once, since AndroidTV is firing onFocus twice.
        focusCount.current = focusCount.current + 1
        if (focusCount.current === 1) {

          const row = Math.floor(props.index / flatlistColumns)
          const column = props?.index % flatlistColumns
          console.log(Platform.isTVOS ? 'AppleTV' : 'AndroidTV', 'focus: index:', props.index, 'column:', column, 'row:', row)

          const currentOffset = listRef?.current?._listRef?._scrollMetrics.offset

          itemRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
            // console.log(`Position in Window: x=${x}, y=${y}, width=${width}, height=${height}`)
            const total = listRef.current?.props.data.length
            const rowCount =  Math.round(total / flatlistColumns)
            // console.log('rowCount', rowCount)
            // equates to the property count of listRef.current._listRef._cellRefs
            // eg: { "1:2:3:4:5:6": [], "7:8:9:10:11:12": [], "13:14:15:16:17:18": [] } is 3 rows.
            // also listRef.current._listRef._indicesToKeys Map size
            // console.log('_indicesToKeys.size ', listRef.current._listRef._indicesToKeys.size)

            // Check bottom edge is in bounds
            if((y + height + 2) > (containerMeasurements.current.height + containerMeasurements.current.y) && row <= (rowCount - 1) ) { //  ensure we ignore the bottom row once in position
              console.log('ITEM IS (partially) OUT OF BOTTOM BOUNDS - SCROLL UP')
              const __diffY =  (y + height) - (containerMeasurements.current.y + containerMeasurements.current.height)              
              listRef?.current?.scrollToOffset({
                offset: currentOffset + ( height + __diffY )
              })
            } 
            
            if( (y - 2 < containerMeasurements.current.y) && currentOffset > 0) { // ensuring we ignore the top row
              console.log('ITEM IS (partially) OUT OF TOP BOUNDS - SCROLL DOWN')
              const _diffY = containerMeasurements.current.y - y + 1
              listRef?.current?.scrollToOffset({
                offset: currentOffset - (height + _diffY)
              })
            }
          })

          // AndroidTV double-focus issue? Reset focusCount after 200ms.
          let startTime: number
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            if (elapsed >= 100) {
              // Reset focusCount 
              // console.log('onFocus trigger count:', focusCount.current)
              focusCount.current = 0
              timeoutRef.current = null
            } else {
              timeoutRef.current = requestAnimationFrame(animate);
            }
          }
          timeoutRef.current = requestAnimationFrame(animate)
        }

        
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
