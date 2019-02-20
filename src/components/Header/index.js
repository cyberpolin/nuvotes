import React from 'react'
import { Icon } from 'react-native-elements'
import {
  DrawerIconButton,
  ButtonContainer,
  EditTitle
} from './styled'
import { translate } from '../../helpers/localization'

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

export const EditButton = (navigation) => {
  return (
    <ButtonContainer onPress={() => navigation.navigate('EditProfile')}>
      <EditTitle>{translate.edit}</EditTitle>
    </ButtonContainer>
  )
}
