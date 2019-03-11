import { isIphoneX } from 'react-native-iphone-x-helper'
import {
  Platform,
  StatusBar
} from 'react-native'
import { DEVICE_HEIGHT } from './constants'

export default function responsiveFont (percent) {
  const deviceHeight = isIphoneX()
    ? DEVICE_HEIGHT - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === 'android'
      ? DEVICE_HEIGHT - StatusBar.currentHeight
      : DEVICE_HEIGHT
  const heightPercent = (percent * deviceHeight) / 100
  return Math.round(heightPercent)
}
