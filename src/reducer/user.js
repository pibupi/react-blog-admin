import actionTypes from '../actions/actionTypes'
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))
let initState = {
  userInfo,
  isLogin,
  isLoading:false
}
export default (preState=initState,action) =>{
  let newState = {...preState};
  switch(action.type){
    case actionTypes.START_LOGIN:
      newState.isLoading = true
      return newState
    case actionTypes.LOGIN_SUCCESS:
      newState.userInfo = action.payload
      newState.isLogin = true
      newState.isLoading = false
      return newState
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
    default:
      return preState
  }
}