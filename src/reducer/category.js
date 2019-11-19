/**
 * @description 分类的reducer
 */
import actionTypes from '../actions/actionTypes';
let initState = {
  categoryList: [],
  count: ''
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.ADD_CATEGORY_CUSSESS:
      newState = { ...action.payload}
      return newState;
    default:
      return preState;
  }
};
