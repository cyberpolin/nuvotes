import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'
import Routes from './src/routes'
import STORE from './src/store'
import { checkLanguage } from './src/helpers/localization'
const { store, persistor } = STORE

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={checkLanguage}
        >
          <Routes />
          <FlashMessage position='top' />
        </PersistGate>
      </Provider>
    )
  }
}
