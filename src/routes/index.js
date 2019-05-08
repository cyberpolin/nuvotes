import React from 'react'
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
  UploadPhotos
} from '../containers'
import {
  Drawer,
  Header,
  TabIcons,
  TabTitle,
  EditButton
} from '../components'
import { black, primary, gray } from '../colorPalette'

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
  Upload: {
    screen: UploadPhotos,
    navigationOptions: {
      title: 'Upload Photos'
    }
  }
}, {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTintColor: gray
  }
})

const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
