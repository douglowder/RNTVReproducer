# React Native TV : Demo / Reproducer App

### FlatList as grid, scroll & focus experiments.

See: https://github.com/react-native-tvos/react-native-tvos/issues/848#issuecomment-3325060435

This FlatList (with scrollEnabled:false) will now scroll and focus on AndroidTV in the same way that tvOS does with a normal scrollable FlatList.

When the focused item rect breaks out of the boundary of the list container, it will use .scrollToOffset to keep
the iten in view, also providing an item height's space until the top and bottom rows, as tvOS does.

See `screens/GridScreenExperiment.tsx`

