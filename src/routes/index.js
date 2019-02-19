import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
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
import {
  Drawer,
  DrawerIcon,
  TabNav
} from '../components'

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
  },
  Profile: {
    screen: ViewUser
  },
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
