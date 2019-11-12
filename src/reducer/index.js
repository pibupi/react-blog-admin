import { combineReducers } from 'redux';
import menus from './menus';
import user from './user';
import article from './article';
export default combineReducers({
  menus,
  user,
  article
});
