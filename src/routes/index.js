import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {
  Drawer,
  DrawerIcon
} from '../components'

class Login extends Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>
          Login
        </Text>
        <Button
          title='TO HOME'
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}

class Screen1 extends Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SCREEN 1</Text>
      </View>
    )
  }
}

class Screen2 extends Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>SCREEN 2</Text>
      </View>
    )
  }
}

const TabNav = (navigation, tintColor) => {
  const { routeName } = navigation.state
  return (
    <View>
      <Text>{routeName}</Text>
    </View>
  )
}

const TabAppNavigator = createBottomTabNavigator({
  Screen1: {
    screen: Screen1
  },
  Screen2: {
    screen: Screen2
  }
}, {
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: '#5E5E5E'
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => TabNav(navigation, tintColor)
  })
})

const DrawerNavigator = createDrawerNavigator({
  MainScreen: TabAppNavigator
}, {
  contentComponent: Drawer
})

const StackNavigator = createStackNavigator({
  Screen: {
    screen: DrawerNavigator,
    navigationOptions: (navigation) => ({
      headerLeft: DrawerIcon(navigation)
    })
  }
}, {
  defaultNavigationOptions: {
    title: 'Username'
  }
})

const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
