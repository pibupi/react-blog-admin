import actionTypes from './actionTypes';
/**
 * @func getMenuList -获取菜单列表
 */
export const getMenuListAction = payload => {
  return {
    type: actionTypes.GET_MENU_LIST,
    payload
  };
};
/**
 * @func changeOpenKeys -更改菜单默认展开项
 */
export const changeOpenKeysAction = payload => {
  return {
    type: actionTypes.CHANGE_OPENKEYS,
    payload
  };
};
/**
 * @func switchMenu -面包屑相关，待开发....
 */
export const switchMenuAction = payload => {
  return {
    type: actionTypes.SWITCH_MENU,
    payload
  };
};
