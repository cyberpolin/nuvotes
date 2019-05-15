import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from 'react-native-flash-message'
import Routes from './src/routes'
import STORE from './src/store'
import { checkLanguage } from './src/helpers/localization'
const { store, persistor } = STORE

if (Text.defaultProps == null) Text.defaultProps = {}
Text.defaultProps.allowFontScaling = false

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
