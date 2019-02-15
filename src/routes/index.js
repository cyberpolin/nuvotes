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
  DocumentsScreen
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
  Screen: TabAppNavigator,
  WorkOrder: {
    screen: WorkOrder,
    navigationOptions: ({ navigation }) => {
      return { title: navigation.getParam('title', 'Work Order') }
    }
  },
  Gallery: {
    screen: Gallery
  },
  Documents: {
    screen: DocumentsScreen,
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
