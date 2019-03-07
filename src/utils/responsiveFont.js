import { isIphoneX } from 'react-native-iphone-x-helper'
import {
  Platform,
  StatusBar
} from 'react-native'
import { HEIGHT } from './constants'

export default function responsiveFont (percent) {
  const deviceHeight = isIphoneX()
    ? HEIGHT - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === 'android'
      ? HEIGHT - StatusBar.currentHeight
      : HEIGHT

  const heightPercent = (percent * deviceHeight) / 100
  return Math.round(heightPercent)
}
