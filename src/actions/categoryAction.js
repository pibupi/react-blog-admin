import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
/**
 * @func addCategorySucccess -获取分类成功的action
 * @FuncGroup category
 */
const getCategoryListSucccess = payload => {
  return {
    type: actionTypes.ADD_CATEGORY_CUSSESS,
    payload
  };
};
/**
 * @description - {get} /api/v1/category/list?
 * @func getCategoryList -获取分类列表
 */
export const getCategoryList = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    try {
      const {
        code,
        data: { categoryList, count },
        msg
      } = await $http.get(
        `/api/v1/category/list?offset=${offset}&limited=${limited}&keywords=${keywords}`
      );
      if (code === 0) {
        dispatch(getCategoryListSucccess({ categoryList, msg, count }));
        message.success(msg);
      } else {
        message.warning(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description - {post} /api/v1/category/create
 * @func addCategory 添加分类
 */
export const addCategory = values => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/category/add', values);
      if (code === 0) {
        message.success(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description - {post} /api/v1/category/update
 * @func updateCategory 更新分类
 */
export const updateCategory = params => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/category/update', params);
      if (code === 0) {
        message.success(msg);
        dispatch(getCategoryList(1, 5));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description - {post} /api/v1/category/delete
 * @func deleteCategory 更新分类
 */
export const deleteCategory = categoryId => {
  return async dispatch => {
    try {
      const { code, msg } = await $http.post('/api/v1/category/delete', {
        categoryId
      });
      if (code === 0) {
        message.success(msg);
        dispatch(getCategoryList(1, 5));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
