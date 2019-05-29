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

const TabAppNavigator = createBottomTabNavigator({
  Orders: {
    screen: Orders
  },
  Pending: {
    screen: Orders
  },
  Search: {
    screen: Orders
  }
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

const DrawerNavigator = createDrawerNavigator({
  MainScreen: TabAppNavigator
}, {
  contentComponent: Drawer
})

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

const LoginDrawer = createDrawerNavigator({
  LoginScreen: Login
}, {
  contentComponent: Drawer
})

var SwitchNavigator

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
