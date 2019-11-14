import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
const getArticleListSucccess = payload => {
  return {
    type: actionTypes.GET_ARTICLE_LIST,
    payload
  };
};
export const getArticleList = userInfo => {
  return async dispatch => {
    try {
      const { code, data, msg } = await $http.get('/api/v1/article/list');
      if (code === 0) {
        dispatch(getArticleListSucccess({ data, msg }));
        message.success(msg);
      } else {
        message.warning(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const addArticleList = article => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post(
        '/api/v1/article/addArticle',
        article
      );
      if (code === 0) {
        message.success(msg)
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateArticle = article => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/article/update', article);
      if(code === 0){
        message.success(msg)
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteArticle = id => {
  return async dispatch => {
    try{
      const {code,msg} = await $http.post('/api/v1/article/delete',{id})
      if(code === 0){
        message.success(msg)
        dispatch(getArticleList())
      }
    }catch(err){
      console.log(err)
    }
  }
}