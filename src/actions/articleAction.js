import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
const getArticleListSucccess = payload => {
  return {
    type: actionTypes.GET_ARTICLE_LIST,
    payload
  };
};
export const getArticleList = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    try {
      const {
        code,
        data: { rows, count },
        msg
      } = await $http.get(
        `/api/v1/article/list?offset=${offset}&limited=${limited}&keywords=${keywords}`
      );
      if (code === 0) {
        dispatch(getArticleListSucccess({ rows, msg, count }));
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
        message.success(msg);
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
      if (code === 0) {
        message.success(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteArticle = id => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/article/delete', { id });
      if (code === 0) {
        message.success(msg);
        dispatch(getArticleList());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
