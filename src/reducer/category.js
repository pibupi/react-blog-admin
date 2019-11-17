import actionTypes from '../actions/actionTypes';
let initState = {
  categoryList: [],
  total: ''
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.ADD_CATEGORY_CUSSESS:
      newState.categoryList = action.payload.rows;
      newState.msg = action.payload.msg;
      newState.total = action.payload.count;
      return newState;
    default:
      return preState;
  }
};
