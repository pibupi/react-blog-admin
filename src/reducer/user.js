import actionTypes from '../actions/actionTypes'
import jwtDecode from 'jwt-decode'
const isLogin = Boolean(window.localStorage.getItem('token')) || Boolean(window.sessionStorage.getItem('token'))

let initState = {
  id:'',
  username:'',
  isLogin,
  isLoading:false,
  redirectTo: '', // 完成之后跳到哪里
  type: '', // 用户类型,还没做
  msg: '', // 错误消息
}
export default (preState=initState,action) =>{
  let newState = {...preState};
  switch(action.type){
    case actionTypes.START_LOGIN:
      newState.isLoading = true
      return newState
    case actionTypes.LOGIN_SUCCESS:
      const {username,id} = jwtDecode(action.payload)
      return {...newState,username,id,isLogin:true,isLoading:false}
    case actionTypes.LOGINZ_FAILED:
      newState = {
        id:'',
        displayName:'',
        avatar:'',
        role:'',
        isLogin:false,
        isLoading:false
      }
      return newState
    case actionTypes.REGISTER_SUCCESS:
        newState.msg = action.payload
        newState.redirectTo = '/login'
        return newState
    case actionTypes.REGISTER_FAILED:
      newState.msg = action.payload
      newState.redirectTo = ''
      return newState
    default:
      return preState
  }
}