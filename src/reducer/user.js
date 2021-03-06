/**
 * @description 用户的reducer
 */
import jwtDecode from 'jwt-decode';
import actionTypes from '../actions/actionTypes';
const isLogin =
  Boolean(window.localStorage.getItem('token')) ||
  Boolean(window.sessionStorage.getItem('token'));
const displayName = window.localStorage.getItem('userInfo')
  ? JSON.parse(window.localStorage.getItem('userInfo')).displayName
  : '';
let initState = {
  id: '',
  username: '',
  displayName,
  isLogin,
  isLoading: false,
  // redirectTo: '', // 完成之后跳到哪里
  type: '', // 用户类型,待开发
  msg: '', // 错误消息
  auth: localStorage.getItem('auth')
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.START_LOGIN:
      newState.isLoading = true;
      return newState;
    case actionTypes.LOGIN_SUCCESS:
      const { username, id } = jwtDecode(action.payload.token);
      return {
        ...newState,
        username,
        id,
        isLogin: true,
        isLoading: false,
        displayName: action.payload.displayName,
        auth: action.payload.auth + ''
      };
    case actionTypes.LOGINZ_FAILED:
      newState = {
        id: '',
        displayName: '',
        avatar: '',
        role: '',
        isLogin: false,
        isLoading: false
      };
      return newState;
    case actionTypes.REGISTER_SUCCESS:
      newState.msg = action.payload.msg;
      newState.displayName = action.payload.displayName;
      // newState.redirectTo = '/login';
      return newState;
    case actionTypes.REGISTER_FAILED:
      newState.msg = action.payload;
      // newState.redirectTo = '';
      return newState;
    default:
      return preState;
  }
};
