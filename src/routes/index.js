import {
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation'
import {
  Orders,
  Overdue,
  InProgress
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

export default createAppContainer(TabAppNavigator)
