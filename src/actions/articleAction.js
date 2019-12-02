import { $http } from '../service/http';
import actionTypes from './actionTypes';
import { message } from 'antd';
/**
 * @func getArticleListSucccess -获取文章列表成功的action
 */
const getArticleListSucccessAction = payload => {
  return {
    type: actionTypes.GET_ARTICLE_LIST,
    payload
  };
};
/**
 * @description -{get} /api/v1/admin/article/list
 * @func getArticleList -获取文章列表
 */
export const getArticleListAction = (offset, limited, keywords) => {
  keywords = keywords ? keywords : '';
  return async dispatch => {
    try {
      const {
        code,
        data: { articleList, count },
        msg
      } = await $http.get(
        `/api/v1/admin/article/list?offset=${offset}&limited=${limited}&keywords=${keywords}`
      );
      if (code === 0) {
        dispatch(getArticleListSucccessAction({ articleList, msg, count }));
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
 * @description -{post} /api/v1/admin/article/add
 * @func addArticleList - 添加文章
 */
export const addArticleAction = article => {
  return async dispatch => {
    try {
      /**
       * @description - {post} /api/v1/upload 文章展示图片上传
       * 先上传图片获取后端返回的url地址，再组合到文章信息参数中，调用添加文章的api添加文章
       */
      if(article.articlePic){
        const { url } = await $http.post('/api/v1/upload', article.articlePic);
        let params = {
          title: article.title,
          content: article.content,
          desc: article.desc,
          url,
          category_name: article.category_name,
          category_id: article.category_id,
          author: article.author
        };
        const { code, msg } = await $http.post(
          '/api/v1/admin/article/add',
          params
        );
        if (code === 0) {
          message.success(msg);
        }
      }else{
        let params = {
          title: article.title,
          content: article.content,
          desc: article.desc,
          url:'',
          category_name: article.category_name,
          category_id: article.category_id,
          author: article.author
        };
        const { code, msg } = await $http.post(
          '/api/v1/admin/article/add',
          params
        );
        if (code === 0) {
          message.success(msg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description -{post} /api/v1/admin/article/update
 * @func updateArticle -更新文章
 */
export const updateArticleAction = article => {
  return async dispatch => {
    try {
      const { url } = await $http.post('/api/v1/upload', article.articlePic);
      let params = {
        id: article.id,
        title: article.title,
        content: article.content,
        desc: article.desc,
        url,
        category_name: article.category_name,
        category_id: article.category_id
      };
      const { code, msg } = await $http.post(
        '/api/v1/admin/article/update',
        params
      );
      if (code === 0) {
        message.success(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};
/**
 * @description -{post} /api/v1/admin/article/delete
 * @func deleteArticle -删除文章
 */
export const deleteArticleAction = id => {
  return async dispatch => {
    try {
      const res = await $http.post('/api/v1/admin/article/delete', {
        id
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };
};
