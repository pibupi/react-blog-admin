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
const loginStart = () => {
  return {
    type: actionTypes.START_LOGIN
  };
};
/**
 *@func loginSuccess - 用户登录成功的action
 */
const loginSuccess = payload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload
  };
};
/**
 *@func loginFailed - 用户登录失败的action
 */
const loginFailed = () => {
  sessionRemovetoken();
  sessionRemoveuserInfo();
  localRemovetoken();
  localRemoveuserInfo();
  return {
    type: actionTypes.LOGINZ_FAILED
  };
};
/**
 *@func registerFail - 用户注册失败的action
 */
const registerFail = payload => {
  return {
    type: actionTypes.REGISTER_FAILED,
    payload
  };
};
/**
 *@func registerFail - 用户注册成功的action
 */
const registerSuccess = payload => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload
  };
};
/**
 * @description -{post} /api/v1/user/login
 * @func startLogin -用户登录
 */
export const startLogin = userInfo => {
  const { username, password, remember } = userInfo;
  return async dispatch => {
    dispatch(loginStart());
    try {
      await $http
        .post('/api/v1/user/login', { username, password })
        .then(res => {
          const { code, token, displayName, username } = res;
          if (code === 0) {
            if (remember) {
              localSavetoken(token);
              localSaveuserInfo({ displayName, username });
            } else {
              sessionSavetoken(token);
              sessionSaveuserInfo({ displayName, username });
            }
            dispatch(loginSuccess({ token, displayName }));
          }
        });
    } catch {
      dispatch(loginFailed());
    }
  };
};
/**
 * @func logOut - 用户退出
 */
export const logOut = () => {
  return dispatch => {
    dispatch(loginFailed());
    dispatch(registerFail());
  };
};
/**
 * @description - {post} /api/v1/user/register
 * @func userRegist - 用户注册
 */
export const userRegist = ({ username, displayName, password, pwdConfirm }) => {
  return async dispatch => {
    if (!username || !password) {
      dispatch(registerFail('账号密码不能为空'));
      return;
    }
    if (password !== pwdConfirm) {
      dispatch(registerFail('两次密码不一致'));
      return;
    }
    await $http
      .post(`/api/v1/user/register`, { username, displayName, password })
      .then(res => {
        const { code, msg } = res;
        if (code === 0) {
          dispatch(registerSuccess({ displayName, msg }));
        } else {
          dispatch(registerFail(msg));
        }
      });
  };
};
