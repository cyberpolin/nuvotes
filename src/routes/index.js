import React from 'react'
import { Platform } from 'react-native'
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
  EditUser,
  NuvoteWeb
} from '../containers'
import {
  Drawer,
  Header,
  TabIcons,
  TabTitle,
  EditButton
} from '../components'
import {
  primary,
  gray
} from '../colorPalette'

const isIOS = Platform.OS === 'ios'

// Tab Navigator
const TabAppNavigator = createBottomTabNavigator({
  Orders: {
    screen: Orders
  },
  Pending: {
    screen: Orders
  }
  // Search: {
  //   screen: Orders
  // }
}, {
  tabBarOptions: {
    activeTintColor: primary,
    inactiveTintColor: gray
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => TabIcons(navigation, tintColor),
    tabBarLabel: ({ tintColor }) => TabTitle(navigation, tintColor)
  })
})

// The DrawerNavigator contains a Tab Navigator to show screens as a icon in the bottom.
const DrawerNavigator = createDrawerNavigator({
  MainScreen: TabAppNavigator
}, {
  contentComponent: Drawer
})

// A stack navigator that contains all screens.
// DrawerScreen renders a drawer and a custom Header.
const StackNavigator = createStackNavigator({
  DrawerScreen: {
    screen: DrawerNavigator,
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} />
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
  },
  WebPage: {
    screen: NuvoteWeb
  }
}, {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTintColor: gray
  }
})

// A drawer that shows a link with a webview.
const LoginDrawer = createDrawerNavigator({
  LoginScreen: Login
}, {
  contentComponent: Drawer
})

// Declare an empty SwitchNavigator
var SwitchNavigator
// Condition to create a switch navigator if is iOS it will have a drawer.
// Home Screen is a Stack Navigator that will contains all screen with backwards functionality
if (isIOS) {
  SwitchNavigator = createSwitchNavigator({
    Login: LoginDrawer,
    Home: StackNavigator
  }, {
    initialRouteName: 'Login'
  })
} else {
  SwitchNavigator = createSwitchNavigator({
    Login: Login,
    Home: StackNavigator
  }, {
    initialRouteName: 'Login'
  })
}

export default createAppContainer(SwitchNavigator)
