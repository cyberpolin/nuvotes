import React from 'react'
import { Icon } from 'react-native-elements'

const TabNav = (navigation, tintColor) => {
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

export default TabNav
