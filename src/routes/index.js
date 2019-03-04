import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {
  Orders,
  WorkOrder,
  Gallery,
  Login,
  Documents,
  ViewUser,
  EditUser
} from '../containers'
import {
  Drawer,
  DrawerIcon,
  TabIcons,
  TabTitle,
  EditButton
} from '../components'
import palette from '../colorPalette'

const TabAppNavigator = createBottomTabNavigator({
  Orders: {
    screen: Orders
  },
  InProgress: {
    screen: Orders
  },
  Overdue: {
    screen: Orders
  }
}, {
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: '#5E5E5E'
  },
  defaultNavigationOptions: ({ navigation }) => ({
    title: navigation.state.routeName === 'InProgress' && 'In Progress',
    tabBarIcon: ({ tintColor }) => TabIcons(navigation, tintColor),
    tabBarLabel: ({ tintColor }) => TabTitle(navigation, tintColor)
  })
})

const DrawerNavigator = createDrawerNavigator({
  MainScreen: TabAppNavigator
}, {
  contentComponent: Drawer
})

const StackNavigator = createStackNavigator({
  DrawerScreen: {
    screen: DrawerNavigator,
    navigationOptions: (navigation) => ({
      headerLeft: DrawerIcon(navigation)
    })
  },
  Profile: {
    screen: ViewUser,
    navigationOptions: ({ navigation }) => ({
      headerRight: EditButton(navigation, 'EditProfile')
    })
  },
  EditProfile: {
    screen: EditUser
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
}, {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTintColor: palette.black
  }
})

const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
