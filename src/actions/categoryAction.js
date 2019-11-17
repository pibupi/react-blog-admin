import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
const addCategorySucccess = payload => {
  return {
    type: actionTypes.ADD_CATEGORY_CUSSESS,
    payload
  };
};
export const addCategory = values => {
  return async dispatch => {
    try {
      const {code,msg} = await $http.post('/api/v1/category/create',values)
      if(code === 0){
        // dispatch(addCategorySucccess(data))
        message.success(msg)
      }
    }catch(err){
      console.log(err)
    }
  }
}
export const getCategoryList = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    try {
      const {
        code,
        data: { rows, count },
        msg
      } = await $http.get(
        `/api/v1/category/get?offset=${offset}&limited=${limited}&keywords=${keywords}`
      );
      if (code === 0) {
        dispatch(addCategorySucccess({ rows, msg, count }));
        message.success(msg);
      } else {
        message.warning(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteCategory = categoryId => {
  console.log(categoryId)
  return async dispatch => {
    try {
      const { code, msg } = await $http.post(
        '/api/v1/category/delete',
        {categoryId},
      );
      if (code === 0) {
        message.success(msg);
        dispatch(getCategoryList(1,5))
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateCategory = params => {
  console.log(params)
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/category/update', params);
      if (code === 0) {
        message.success(msg);
        dispatch(getCategoryList(1,5))
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const deleteArticle = id => {
  // return async dispatch => {
  //   try {
  //     const { code, msg } = await $http.post('/api/v1/article/delete', { id });
  //     if (code === 0) {
  //       message.success(msg);
  //       dispatch(getArticleList( 1,5));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
};
