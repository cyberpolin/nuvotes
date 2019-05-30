[Return](../../../README.md)

# Routing

## Screens

The app navigation consists in various screens that are distributed in Switch, Stack, Drawer and Tab navigators.

List of screens in order of appearance.

### **Login**

The first screen to appear when the app has started, you need to use your NWOMS credentials to login into the app and see your work orders.

For iOS version, there's a drawer that shows an icon to redirect you to the website and make your vendor register in case you don't have any user and want to join to Nuvote.

### **Orders**

The order screen is divided by 3 tabs, orders, pending, and search.
- Orders shows all active order that are asigned to the current user.
- Pending shows orders with status 'Pending Completion'.
- Search shows all current orders.

### **WorkOrder**

Shows the information of a selected order, also, you can choose to upload photos, check the current photos and files, and complete the order if it's status is in progress.

### **Gallery**

Gallery of photos of a selected order, it can be of 4 types depending of the order type:

- Before Photos
- In Progress Photos
- After Photos
- Property Photos

## **Documents**

Shows a lists of files to download of a current order. In Android, the downloaded files are saved in the internal storage. In iOS once downloaded a file a fileviewer is opened.

## **Profile**

Shows the information of the user.

## **EditProfile**

A form to modify the user information.

## **WebPage**

Renders a webview of Nuvote website.

## Usage

Refer to React Navigation docs for better understanding: [ReactNavigation](https://reactnavigation.org/docs/en/getting-started.html)