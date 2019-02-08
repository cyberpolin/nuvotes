import React from 'react'
import { Icon } from 'react-native-elements'
import {
  DrawerIconButton
} from './styled'

export const DrawerIcon = (navigation) => {
  const { toggleDrawer } = navigation.navigation
  return (
    <DrawerIconButton onPress={() => toggleDrawer()}>
      <Icon
        type='font-awesome'
        name='bars'
      />
    </DrawerIconButton>
  )
}
