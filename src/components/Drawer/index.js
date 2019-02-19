import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import {
  Container,
  DrawerItem,
  DrawerBottom,
  DrawerTop,
  ItemText
} from './styled'

export default class Drawer extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <DrawerTop>
          <DrawerItem noFlex onPress={() => navigation.navigate('Profile')}>
            <Icon
              type='font-awesome'
              name='user-circle'
              size={45}
            />
            <ItemText>Profile</ItemText>
          </DrawerItem>
        </DrawerTop>
        <DrawerBottom>
          <DrawerItem onPress={this.changeLanguage}>
            <Icon
              type='font-awesome'
              name='language'
              size={45}
            />
            <ItemText>Change Language</ItemText>
          </DrawerItem>
          <DrawerItem onPress={this.handleLogout}>
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

  handleLogout () {
    const { navigation } = this.props
    navigation.navigate('Login')
  }

  changeLanguage () {
    Alert.alert(
      'Change Language',
      'Do you want to change the language to spanish?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false}
    )
  }
}
