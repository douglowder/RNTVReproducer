# React Native TV : Demo / Reproducer App

### expo-video VideoView not respecting focusable

See: https://github.com/react-native-tvos/react-native-tvos/issues/1010#issuecomment-3454147933

- Select the 'VideoView focus issue' option
- Remote up and down to see if the VideoView receives focus between the two Pressables.
- Go back to home screen.
- Return to 'VideoView focus issue' option
- Test remote up and down again. 

#### Result: 

- First visit to screen acts as expected since `autoFocus` was added. 
- Second visit shows VideoView receiving focus. 

#### Solution: 

- Add `destinations={[]}` to the TVFocusGuideView wrapper 
- Now works as expected on subsequent visits to the screen.

See `screens/ScreenTwo.tsx`

