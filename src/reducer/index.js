import { combineReducers } from 'redux';
import menus from './menus';
import user from './user';
import article from './article';
import category from './category';
export default combineReducers({
  menus,
  user,
  article,
  category
});
