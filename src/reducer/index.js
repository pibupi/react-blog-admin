import {combineReducers} from 'redux'
import menus from './menus'
import user from './user'
export default combineReducers({
  menus,
  user,
})