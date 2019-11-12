import actionTypes from '../actions/actionTypes';
let initState = {
  articleList: [],
  msg: ''
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST:
      newState.articleList = action.payload.data;
      newState.msg = action.payload.msg;
      return newState;
    default:
      return preState;
  }
};
