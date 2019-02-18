import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import {
  Orders,
  Overdue,
  InProgress,
  WorkOrder,
  Gallery,
  Login,
  Documents,
  ViewUser
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
    tabBarIcon: ({ tintColor }) => TabNav(navigation, tintColor),
    title: navigation.state.routeName === 'InProgress' && 'In Progress'
  })
})

const StackNavigator = createStackNavigator({
  Screen: TabAppNavigator,
  Profile: ViewUser,
  WorkOrder: {
    screen: WorkOrder,
    navigationOptions: ({ navigation }) => {
      return { title: navigation.getParam('title', 'Work Order') }
    }
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      title: 'Photos'
    }
  },
  Documents: {
    screen: Documents,
    navigationOptions: {
      title: 'Documents'
    }
  }
})

const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
