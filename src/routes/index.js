import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import {
  Orders,
  Overdue,
  InProgress
} from '../containers'
import { TabNav } from '../components'

const TabAppNavigator = createBottomTabNavigator({
  Orders: {
    screen: Orders
  },
  InProgress: {
    screen: InProgress
  },
  Overdue: {
    screen: Overdue
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

const StackNavigator = createStackNavigator({
  Screen: TabAppNavigator
}, {
  defaultNavigationOptions: {
    title: 'Username'
  }
})

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

const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
