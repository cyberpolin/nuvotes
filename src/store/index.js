import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from '../reducers'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default (() => {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk, logger)))
  const persistor = persistStore(store)
  return { persistor, store }
})()
