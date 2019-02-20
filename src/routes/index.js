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
  Login,
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
      headerRight: EditButton(navigation)
    })
  },
  EditProfile: {
    screen: EditUser
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
