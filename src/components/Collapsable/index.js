import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'
import {
  Button,
  Label,
  Container
} from './styled'

const Collapsable = ({label, isCollapsed, children, ...props}) => {
  return (
    <Container>
      <Button {...props}>
        <Label>{label}</Label>
        {isCollapsed
          ? <Icon type='font-awesome' name='caret-down' />
          : <Icon type='font-awesome' name='caret-right' />}
      </Button>
      <Collapsible collapsed={isCollapsed}>
        {children}
      </Collapsible>
    </Container>
  )
}

Collapsable.propTypes = {
  label: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export default Collapsable
