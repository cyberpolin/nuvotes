import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {
  Container,
  DrawerItem,
  DrawerBottom,
  DrawerTop,
  ItemText
} from './styled'

export default class Drawer extends Component {
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <DrawerTop>
          <DrawerItem noFlex>
            <Icon
              type='font-awesome'
              name='user-circle'
              size={45}
            />
            <ItemText>Profile</ItemText>
          </DrawerItem>
        </DrawerTop>
        <DrawerBottom>
          <DrawerItem>
            <Icon
              type='font-awesome'
              name='language'
              size={45}
            />
            <ItemText>Change Language</ItemText>
          </DrawerItem>
          <DrawerItem onPress={() => navigation.navigate('Login')}>
            <Icon
              type='font-awesome'
              name='sign-out'
              size={45}
            />
            <ItemText>Sign Out</ItemText>
          </DrawerItem>
        </DrawerBottom>
      </Container>
    )
  }
}
