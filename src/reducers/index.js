import { combineReducers } from 'redux'
import language from './language'
import search from './search'
import user from './user'
import settings from './settings'
import orders from './orders'

export default combineReducers({
  language,
  search,
  user,
  settings,
  orders
})
