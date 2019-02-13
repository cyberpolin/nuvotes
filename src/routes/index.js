import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import {
  WorkOrder,
  Gallery
} from '../containers'
import {
  OrderCard
} from '../components'

class Home extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{backgroundColor: 'olive', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <OrderCard
          order={{id: '#1234', endDate: '12/12/12', name: 'Repairs'}}
          onPress={() => navigate('WorkOrder', {id: '1234'})}
        />
      </View>
    )
  }
}

const StackNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  WorkOrder: {
    screen: WorkOrder
  },
  Gallery: {
    screen: Gallery
  }
})

StackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return { tabBarVisible }
}

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: StackNavigator
  }
})

export default createAppContainer(TabNavigator)
