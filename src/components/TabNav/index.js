import React from 'react'
import { Icon } from 'react-native-elements'
import { translate } from '../../helpers/localization'
import { Title } from './styled'

export const TabIcons = (navigation, tintColor) => {
  const { routeName } = navigation.state
  const iconName = routeName === 'Orders' ? 'briefcase'
    : routeName === 'InProgress' ? 'wrench'
      : routeName === 'Overdue' && 'clock-o'
  return (
    <Icon
      type='font-awesome'
      name={iconName}
      color={tintColor}
    />
  )
}

export const TabTitle = (navigation, tintColor) => {
  const { routeName } = navigation.state
  const title = routeName === 'Orders' ? translate.orders
    : routeName === 'InProgress' ? translate.inProgress
      : translate.overdue
  return (
    <Title color={tintColor}>{title}</Title>
  )
}
