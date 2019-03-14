import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Overlay } from 'react-native-elements'
import { primary } from '../../colorPalette'

const overlayStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

const Loading = () => (
  <Overlay
    isVisible
    windowBackgroundColor='rgba(0, 0, 0, .4)'
    overlayBackgroundColor='transparent'
    overlayStyle={overlayStyle}
  >
    <ActivityIndicator
      size='large'
      color={primary}
    />
  </Overlay>
)

export default Loading
