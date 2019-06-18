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
  EditButton,
  BackButton
} from '../components'
import {
  primary,
  gray
} from '../colorPalette'

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
  Upload: {
    screen: UploadPhotos,
    navigationOptions: ({ navigation }) => ({
      title: 'Upload Photos',
      headerLeft: <BackButton navigation={navigation} />
    })
  }
}, {
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTintColor: gray
  }
})

// Declare an empty SwitchNavigator
// Home Screen is a Stack Navigator that will contains all screen with backwards functionality
const SwitchNavigator = createSwitchNavigator({
  Login: Login,
  Home: StackNavigator
}, {
  initialRouteName: 'Login'
})

export default createAppContainer(SwitchNavigator)
