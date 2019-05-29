# Nuvote App

Nuvote App made with React Native to keep the orders flow for field work of vendor and other user types of NWOMS server.

## Install and Usage

Requirements: `node 8+`

- If you don't have nvm go to nvm repo an see the install guide: https://github.com/creationix/nvm

- If you have nvm already installed and a node version older than 8 follow these instructions:

1. `$ nvm install 8.11`
2. `$ nvm use 8`

To run the project in your local machine:

1. `$ npm install`
2. `$ npm start`
3. `$ ENVFILE=.env react-native run-ios` or `$ENVFILE=.env react-native run-android`

**Note for 3rd point**:

(Alternately, for ios, open xcworkspace from ios folder and run. Or android studio selecting android folder, then build the project and run).

The env files are used to avoid the unnecesary task to change url endpoints. You can change them when running the ENVFILE command: `$ ENVFILE=.env ...`, `$ENVFILE=.env.staging` etc

- .env = Nuvote production URL
- .env.staging = Nuvote testing URL
- .env.local = Local machine server URL(if properly configured with django)


# Components

## Collapsable

![Collapsable](./src/components/Collapsable/img/Collapsable.png)

[Collapsable](./src/components/Collapsable/docs.md)

## Header

![Header](./src/components/Header/img/Header.png)

[Header](./src/components/Header/docs.md)

## Drawer
![Drawer](./src/components/Drawer/img/Drawer.png)

[Drawer](./src/components/Drawer/docs.md)

## Loading

![Loading](./src/components/Loading/img/Loading.png)

[Loading](./src/components/Loading/docs.md)

## TabNav

![TabNav](./src/components/TabNav/img/TabNav.png)

[TabNav](./src/components/TabNav/docs.md)