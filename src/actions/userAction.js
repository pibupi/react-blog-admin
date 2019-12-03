import { $http } from '../service/http';
import actionTypes from './actionTypes';
import {
  localSavetoken,
  sessionSavetoken,
  localSaveuserInfo,
  sessionSaveuserInfo,
  sessionRemovetoken,
  sessionRemoveuserInfo,
  localRemovetoken,
  localRemoveuserInfo
} from '../utils/storage';
/**
 *@func loginStart - 用户开始登录的action
 */
const loginStartAction = () => {
  return {
    type: actionTypes.START_LOGIN
  };
};
/**
 *@func loginSuccess - 用户登录成功的action
 */
const loginSuccessAction = payload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload
  };
};
/**
 *@func loginFailed - 用户登录失败的action
 */
const loginFailedAction = () => {
  sessionRemovetoken();
  sessionRemoveuserInfo();
  localRemovetoken();
  localRemoveuserInfo();
  sessionStorage.removeItem('auth')
  localStorage.removeItem('auth')
  return {
    type: actionTypes.LOGINZ_FAILED
  };
};
/**
 * @description -{post} /api/v1/user/login
 * @func startLogin -用户登录
 */
export const startLoginAction = userInfo => {
  const { username, password, remember } = userInfo;
  return async dispatch => {
    dispatch(loginStartAction());
    try {
      await $http
        .post('/api/v1/admin/user/login', { username, password })
        .then(res => {
          const { code, token, displayName, username, auth } = res;
          if (code === 0) {
            if (remember) {
              localStorage.setItem('auth', auth);
              localSavetoken(token);
              localSaveuserInfo({ displayName, username });
            } else {
              sessionStorage.setItem('auth', auth);
              sessionSavetoken(token);
              sessionSaveuserInfo({ displayName, username });
            }
            dispatch(loginSuccessAction({ token, displayName, auth }));
          }
        });
    } catch {
      dispatch(loginFailedAction());
    }
  };
};
// 主页注册
/**
 *@func registerFail - 用户注册失败的action
 */
const registerFailAction = payload => {
  return {
    type: actionTypes.REGISTER_FAILED,
    payload
  };
};
/**
 *@func registerFail - 用户注册成功的action
 */
const registerSuccessAction = payload => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload
  };
};
/**
 * @func logOut - 用户退出
 */
export const logOutAction = () => {
  return dispatch => {
    dispatch(loginFailedAction());
    // dispatch(registerFailAction());
  };
};
/**
 * @description - {post} /api/v1/user/register
 * @func userRegist - 用户注册
 */
export const userRegistAction = ({
  username,
  displayName,
  password,
  pwdConfirm,
  email,
  phone
}) => {
  return async dispatch => {
    if (!username || !password) {
      dispatch(registerFailAction('账号密码不能为空'));
      return;
    }
    if (password !== pwdConfirm) {
      dispatch(registerFailAction('两次密码不一致'));
      return;
    }
    await $http
      .post(`/api/v1/admin/user/register`, {
        username,
        displayName,
        password,
        email,
        phone
      })
      .then(res => {
        const { code, msg } = res;
        if (code === 0) {
          dispatch(registerSuccessAction({ displayName, msg }));
        } else {
          dispatch(registerFailAction(msg));
        }
      });
  };
};
/**
 * @description - {get} /api/v1/admin/user/getuser
 * @func getUsers - 获取用户列表
 */
export const getUsers = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    return await $http.get(
      `/api/v1/admin/user/getuser?offset=${offset}&limited=${limited}&keywords=${keywords}`
    );
  };
};
/**
 * @description - {post} /api/v1/admin/user/delete
 * @func deleteUserAction - 删除用户
 */
export const deleteUserAction = id => {
  return async dispatch => {
    return await $http.post('/api/v1/admin/user/delete', { id });
  };
};
/**
 * @description - {post} /api/v1/admin/user/update
 * @func userUpdateAction - 更新用户
 */
export const userUpdateAction = data => {
  return async dispatch => {
    return await $http.post('/api/v1/admin/user/update', { data });
  };
};
