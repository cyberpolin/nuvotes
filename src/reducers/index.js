import { combineReducers } from 'redux'
import language from './language'
import search from './search'

export default combineReducers({
  language,
  search
})
