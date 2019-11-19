/**
 * @description 文章的reducer
 */
import actionTypes from '../actions/actionTypes';
let initState = {
  articleList: [],
  count: ''
};
export default (preState = initState, action) => {
  let newState = { ...preState };
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST:
      newState = { ...action.payload };
      return newState;
    default:
      return preState;
  }
};
