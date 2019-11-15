import actionTypes from '../actions/actionTypes';
let initState = {
  menulist: [],
  openKeys: [],
  menuName:'首页'
};
export default (preState = initState, action) => {
  let newState = {
    ...preState
  };
  switch (action.type) {
    case actionTypes.GET_MENU_LIST:
      newState.menulist = action.payload;
      return newState;
    case actionTypes.CHANGE_OPENKEYS:
      newState.openKeys = action.payload;
      return newState;
    case actionTypes.SWITCH_MENU:
      newState.menuName = action.payload;
      return newState;
    default:
      return preState;
  }
};
