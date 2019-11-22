import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
/**
 * @func addCategorySucccess -获取分类成功的action
 * @FuncGroup category
 */
const getCategoryListSucccessAction = payload => {
  return {
    type: actionTypes.ADD_CATEGORY_CUSSESS,
    payload
  };
};
/**
 * @description - {get} /api/v1/admin/category/list
 * @func getCategoryList -获取分类列表
 */
export const getCategoryListAction = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    try {
      const {
        code,
        data: { categoryList, count },
        msg
      } = await $http.get(
        `/api/v1/admin/category/list?offset=${offset}&limited=${limited}&keywords=${keywords}`
      );
      if (code === 0) {
        dispatch(getCategoryListSucccessAction({ categoryList, msg, count }));
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
 * @description - {post} /api/v1/admin/category/add
 * @func addCategory 添加分类
 */
export const addCategoryAction = values => {
  return async dispatch => {
    try {
      const res = await $http.post('/api/v1/admin/category/add', values);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description - {post} /api/v1/admin/category/update
 * @func updateCategory 更新分类
 */
export const updateCategoryAction = params => {
  return async dispatch => {
    try {
      const res = await $http.post('/api/v1/admin/category/update', params);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description - {post} /api/v1/admin/category/delete
 * @func deleteCategory 删除分类
 */
export const deleteCategoryAction = categoryId => {
  return async dispatch => {
    try {
      const res = await $http.post('/api/v1/admin/category/delete', {
        categoryId
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};
