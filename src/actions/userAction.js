import {$http} from  '../service/http'
import actionTypes from './actionTypes'
import {
  localSavetoken,
  sessionSavetoken,
  localSaveuserInfo,
  sessionSaveuserInfo,
  sessionRemovetoken,
  sessionRemoveuserInfo,
  localRemovetoken,
  localRemoveuserInfo
} from '../utils/storage'
const loginStart = () => {
  return {
    type:actionTypes.START_LOGIN
  }
}
const loginSuccess = (payload) => {
  return {
    type:actionTypes.LOGIN_SUCCESS,
    payload
  }
}
const loginFailed = () => {
  sessionRemovetoken()
  sessionRemoveuserInfo()
  localRemovetoken()
  localRemoveuserInfo()
  return {
    type:actionTypes.LOGINZ_FAILED
  }
}
export const startLogin = (userInfo) => {
  const {username,password,remember} = userInfo
  return async dispatch => {
    dispatch(loginStart())
    console.log(111)
    try{
      await $http.post('/api/v1/user/login',{username,password}).then(res=>{
        const {code,token} = res
        console.log(token)
        if(code === 0) {
          if(remember){
            localSavetoken(token)
            localSaveuserInfo(res.data)
          }else{
            sessionSavetoken(token)
            sessionSaveuserInfo(res.data)
          }
          dispatch(loginSuccess(token))
        }
      })
    }catch{
      dispatch(loginFailed())
    }
  }
}
export const logOut = () => {
  // 待改善，还没定义好接口
  return dispatch => {
    dispatch(loginFailed())
    dispatch(registerFail())
  }
}
const registerFail = (payload) => {
  return {
      type: actionTypes.REGISTER_FAILED,
      payload
  }
}

const registerSuccess = (payload) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload
  }
}
export const userRegist = ({username,password,pwdConfirm}) => {
  console.log(username,password,pwdConfirm)
  return async dispatch => {
    if(!username || !password) {
      dispatch(registerFail('账号密码不能为空'))
      return
    }
    if(password !== pwdConfirm) {
        dispatch(registerFail('两次密码不一致'))
        return
    }
    await $http.post(`/api/v1/user/register`,{username,password}).then(res=>{
      const {code ,msg} = res
      console.log(code)
      if(code === 0){
        dispatch(registerSuccess(msg))
      }else{
        dispatch(registerFail(msg))
      }
    })
  }
}