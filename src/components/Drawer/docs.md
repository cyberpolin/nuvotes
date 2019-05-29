[Return](../../../README.md)

# Drawer

Drawer component for navigation, it is only used in the routes.js file.

## Usage

This drawer component is used as a component for react navigation, and it is used like this:

```javascript
const LoginDrawer = createDrawerNavigator({
  LoginScreen: Login
}, {
  contentComponent: Drawer
})
```

In this way, a drawer is rendered in this screen. There are two drawers, on in the Login screen, and Home screen. The first one is only used for iOS to show a link to nuvote web site.

### Drawer Login Screen

![Login](./img/DrawerHome.png)


### Drawer Home Screen

![Home](./img/Drawer.png)