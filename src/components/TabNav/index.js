import React from 'react'
import { Icon } from 'react-native-elements'
import { translate } from '../../helpers/localization'
import {
  Title,
  IconContainer
} from './styled'

export const TabIcons = (navigation, tintColor) => {
  const { routeName } = navigation.state
  const iconName = routeName === 'Orders' ? 'briefcase'
    : routeName === 'Pending' ? 'wrench'
      : routeName === 'Search' && 'search'
  return (
    <Icon
      type='font-awesome'
      name={iconName}
      color={tintColor}
      containerStyle={IconContainer}
    />
  )
}

export const TabTitle = (navigation, tintColor) => {
  const { routeName } = navigation.state
  const title = routeName === 'Orders' ? translate.orders
    : routeName === 'Pending' ? translate.pending
      : translate.search
  return (
    <Title
      color={tintColor}
      isPending={routeName === 'Pending' ? true : undefined}
    >
      {title}
    </Title>
  )
}
