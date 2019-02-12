import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'
import {
  Button,
  Label
} from './styled'

const Collapsable = ({label, isCollapsed, children, ...props}) => {
  return (
    <View>
      <Button {...props}>
        <Label>{label}</Label>
        {isCollapsed
          ? <Icon type='font-awesome' name='caret-down' />
          : <Icon type='font-awesome' name='caret-right' />}
      </Button>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </View>
  )
}

Collapsable.propTypes = {
  label: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export default Collapsable
