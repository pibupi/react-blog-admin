import actionTypes from '../actions/actionTypes';
let initState = {
  articleList: [],
  msg: '',
  total: ''
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST:
      newState.articleList = action.payload.rows;
      newState.msg = action.payload.msg;
      newState.total = action.payload.count;
      return newState;
    default:
      return preState;
  }
};
