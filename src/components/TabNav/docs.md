[Return](../../../README.md)

# TabNav

TabNav component consists of two components, TabIcons and TabTitle.

TabIcons renders an icon for each screen in the Tab Navigator used for react navigator.

TabTitle renders the title of each screen in the Tab Navigator.

## Usage

```javascript
import { createBottomTabNavigator } from 'react-navigation'
import { TabIcons, TabTitle } from 'components'

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
```

![TabNav](./img/TabNav.png)