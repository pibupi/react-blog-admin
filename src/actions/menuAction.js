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
export const getmenulist = (payload) => {
  return {
    type:actionTypes.GET_MENU_LIST,
    payload
  }
}
export const changeopenkeys = (payload) => {
  return {
    type:actionTypes.CHANGE_OPENKEYS,
    payload
  }
}
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
  return async dispatch => {
    dispatch(loginStart())
    try{
      await $http.post('/api/v1/login',userInfo).then(res=>{
        const {code,data:{authToken}} = res
        if(code === 200) {
          if(userInfo.remember){
            localSavetoken(authToken)
            localSaveuserInfo(res.data)
          }else{
            sessionSavetoken(authToken)
            sessionSaveuserInfo(res.data)
          }
          dispatch(loginSuccess(res.data))
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
  }
}