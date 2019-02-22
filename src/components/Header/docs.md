[Return](../../../README.md)

# Header

![Header](./img/Header.png)

![SearchBar](./img/SearchBar.png)

## Usage

Header component is actually used on StackNavigator from react-native navigations, located in routes.js file

```javascript
import { Header } from '../components'

const StackNavigator = createStackNavigator({
  Screen: {
    screen: DrawerNavigator,
    navigationOptions: ({navigation}) => ({
      header: <Header navigation={navigation} />
    })
  },
  Profile: {
    screen: ViewUser
  }
})
```