import actionTypes from './actionTypes';
export const getmenulist = payload => {
  return {
    type: actionTypes.GET_MENU_LIST,
    payload
  };
};
export const changeopenkeys = payload => {
  return {
    type: actionTypes.CHANGE_OPENKEYS,
    payload
  };
};
