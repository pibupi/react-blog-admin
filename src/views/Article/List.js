import React, { Component } from 'react';
import {Button} from 'antd'
import {$http} from  '../../service/http'
class ArticleList extends Component {
  getArticleList = () => {
    $http.get('/api/v1/article/list').then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  } 
  render() {
    return (
      <div>
        <Button onClick={this.getArticleList}>获取文章列表</Button>
      </div>
    );
  }
}

export default ArticleList;