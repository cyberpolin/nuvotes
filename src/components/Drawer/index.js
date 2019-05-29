import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  StackActions,
  NavigationActions
} from 'react-navigation'
import { Icon } from 'react-native-elements'
import { changeLanguage } from '../../actions/language'
import {
  translate,
  setLanguage
} from '../../helpers/localization'
import { logout } from '../../actions/user'
import { emptyOrders } from '../../actions/orders'
import {
  Container,
  DrawerItem,
  DrawerBottom,
  DrawerTop,
  ItemText
} from './styled'
import responsiveFont from '../../utils/responsiveFont'
import { gray } from '../../colorPalette'

class Drawer extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.languageAlert = this.languageAlert.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.resetNavigation = this.resetNavigation.bind(this)
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
              size={responsiveFont(7)}
              color={gray}
            />
            <ItemText>{translate.profile}</ItemText>
          </DrawerItem>
          <DrawerItem noFlex onPress={() => navigation.navigate('WebPage')}>
            <Icon
              type='font-awesome'
              name='user-circle'
              size={responsiveFont(7)}
              color={gray}
            />
            <ItemText>{translate.profile}</ItemText>
          </DrawerItem>
        </DrawerTop>
        <DrawerBottom>
          <DrawerItem onPress={this.languageAlert}>
            <Icon
              type='font-awesome'
              name='language'
              size={responsiveFont(7)}
              color={gray}
            />
            <ItemText>{translate.changeLanguage}</ItemText>
          </DrawerItem>
          <DrawerItem onPress={this.handleLogout}>
            <Icon
              type='font-awesome'
              name='sign-out'
              size={responsiveFont(7)}
              color={gray}
            />
            <ItemText>{translate.signOut}</ItemText>
          </DrawerItem>
        </DrawerBottom>
      </Container>
    )
  }

  resetNavigation () {
    const { navigation } = this.props
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'DrawerScreen' })]
    })
    navigation.dispatch(resetAction)
  }

  handleLogout () {
    const { navigation, logout, emptyOrders } = this.props
    logout()
    emptyOrders()
    navigation.navigate('Login')
  }

  handleLanguageChange () {
    const { changeLanguage } = this.props
    const languageToChange = setLanguage()
    changeLanguage(languageToChange)
    this.resetNavigation()
  }

  languageAlert () {
    Alert.alert(
      translate.languageAlertTitle,
      translate.languageAlertDescription,
      [
        {text: 'No'},
        {text: translate.yes, onPress: this.handleLanguageChange}
      ],
      {cancelable: false}
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: language => {
    dispatch(changeLanguage(language))
  },
  logout: () => {
    dispatch(logout())
  },
  emptyOrders: () => {
    dispatch(emptyOrders())
  }
})

export default connect(null, mapDispatchToProps)(Drawer)
