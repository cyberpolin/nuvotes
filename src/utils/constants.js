import {
  Dimensions,
  StatusBar,
  Platform
} from 'react-native'

// height of the device
export const DEVICE_HEIGHT = Dimensions.get('window').height
// width of the device
export const WIDTH = Dimensions.get('window').width
// header + statusBar height according with the offical dimensios
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 64 : 56
// height of the status bar ONLY for android
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight
// heigth of the containers minues the app bar height
export const SCREEN_HEIGHT = (Platform.OS === 'ios') ? (DEVICE_HEIGHT - APPBAR_HEIGHT) : DEVICE_HEIGHT - (STATUS_BAR_HEIGHT + APPBAR_HEIGHT)
// heigth for android
const ANDROID_HEIGHT = (DEVICE_HEIGHT - STATUS_BAR_HEIGHT)
// full screen height for some cases likes modals, etc... (instance of the height of the device)
export const FULL_SCREEN_HEIGHT = (Platform.OS === 'ios') ? DEVICE_HEIGHT : ANDROID_HEIGHT
